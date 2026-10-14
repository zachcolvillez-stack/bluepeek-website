#!/usr/bin/env node
/**
 * Encodes the homepage scroll film for ScrollFilm.
 *
 *   node scripts/build-film.mjs <film.mp4> --clips 116,221,318,438 [--screens 6]
 *
 * --clips: the frame where each clip after the first starts in the stitched
 * film (printed by ~/Developer/bluepeek/bluepeek-film/stitch_xfade.py).
 *
 * Writes public/film/{lg,sm}-{1..n}.mp4 (one per clip), {lg,sm}-lo.mp4
 * (whole-film previews), public/film/poster.webp and
 * lib/film.js. The source film lives outside the repo
 * (~/Developer/bluepeek/bluepeek-film); only the encodes are committed.
 *
 * The encode settings are the whole trick. ScrollFilm never plays the video,
 * it only seeks it, so:
 *   · no B-frames (-bf 0) and a fixed keyframe every 12 frames — any seek
 *     decodes at most 11 frames, cheap on a hardware decoder (every 6 cost
 *     ~20% more bytes for no visible gain);
 *   · the source frame rate is kept (24fps ≈ a new frame every 8px of
 *     scroll). An earlier 12fps image sequence visibly stepped.
 *   · lg is the full 1920×1080 frame; sm is a full-height 1000×1080 crop
 *     around the subject for portrait screens, because cover-fitting a 16:9
 *     frame to a phone otherwise stretches 1080px of height across ~1600
 *     device pixels.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith("--"));
const opt = (name, d) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : d;
};
if (!src) {
  console.error("usage: build-film.mjs <film.mp4> --clips 116,221,318,438 [--screens 6]");
  process.exit(1);
}

const SCREENS = opt("screens", 6);
const clipsArg = args[args.indexOf("--clips") + 1];
const CLIP_STARTS = args.includes("--clips") ? clipsArg.split(",").map(Number) : [];
const GOP = 12;
// The laptop stays centred in every shot (BluePeek Descent).
const SUBJECT_X = 0.5;
const SM_WIDTH = 1000;

const root = resolve(import.meta.dirname, "..");
const out = join(root, "public/film");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const probe = JSON.parse(
  execFileSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height,r_frame_rate:format=duration",
    "-of", "json", resolve(src),
  ]).toString(),
);
const { width: W, height: H, r_frame_rate } = probe.streams[0];
const [fn, fd] = r_frame_rate.split("/").map(Number);
const FPS = fn / fd;
const DURATION = Number(probe.format.duration);
const smLeft = Math.round(Math.min(W - SM_WIDTH, Math.max(0, W * SUBJECT_X - SM_WIDTH / 2)));

const encode = (name, vf, crf) => {
  execFileSync(
    "ffmpeg",
    [
      "-v", "error", "-y", "-i", resolve(src), "-an",
      ...(vf ? ["-vf", vf] : []),
      "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-preset", "slow",
      "-crf", String(crf), "-bf", "0", "-g", String(GOP), "-keyint_min", String(GOP),
      "-sc_threshold", "0", "-movflags", "+faststart",
      join(out, `${name}.mp4`),
    ],
    { stdio: "inherit" },
  );
  return statSync(join(out, `${name}.mp4`)).size;
};

/*
 * Full quality is split into one file per clip (= per chapter), so the
 * opening chapter is sharp after ~4 MB instead of after the whole film, and
 * each later chapter downloads while the visitor is still on the one before.
 * Each segment starts on a keyframe; ScrollFilm switches segment videos at
 * the boundary frame.
 *
 * The whole film also gets one low-res preview encode (~2.5 MB): a safety
 * net for any chapter whose full-quality file hasn't arrived yet.
 */
const smCrop = `crop=${SM_WIDTH}:${H}:${smLeft}:0`;
const mb = (n) => (n / 1048576).toFixed(1);
const TOTAL_FRAMES = Math.round(DURATION * FPS);
const bounds = [0, ...CLIP_STARTS, TOTAL_FRAMES];
const segments = [];
let lgBytes = 0;
let smBytes = 0;
for (let i = 0; i < bounds.length - 1; i++) {
  const trim = `trim=start_frame=${bounds[i]}:end_frame=${bounds[i + 1]},setpts=PTS-STARTPTS`;
  lgBytes += encode(`lg-${i + 1}`, trim, 22);
  smBytes += encode(`sm-${i + 1}`, `${trim},${smCrop}`, 24);
  segments.push({ start: bounds[i], frames: bounds[i + 1] - bounds[i] });
}
const loBytes = { lg: encode("lg-lo", "scale=960:-2", 30), sm: encode("sm-lo", `${smCrop},scale=560:-2`, 30) };
console.log(
  `${segments.length} segments · lg ${mb(lgBytes)} MB (first ${mb(statSync(join(out, "lg-1.mp4")).size)}) · ` +
    `sm ${mb(smBytes)} MB (first ${mb(statSync(join(out, "sm-1.mp4")).size)}) · ` +
    `previews ${mb(loBytes.lg)}/${mb(loBytes.sm)} MB · ${FPS}fps · ${DURATION.toFixed(2)}s`,
);

/*
 * Scroll pacing. A linear scroll → time mapping makes any burst of fast
 * motion (the whoosh into the turbo at the end of clip 3) fly past in a
 * sliver of scroll. Measure how much each frame differs from the next,
 * compare it with the motion around it, and give local spikes up to 3× the
 * scroll distance, smoothed so the slowdown eases in and out. Overall pacing
 * between slow and fast clips is left alone.
 */
const PW = 160;
const PH = Math.round((PW * H) / W / 2) * 2;
const gray = execFileSync(
  "ffmpeg",
  ["-v", "error", "-i", resolve(src), "-vf", `scale=${PW}:${PH},format=gray`, "-f", "rawvideo", "-"],
  { maxBuffer: 1 << 30 },
);
const px = PW * PH;
const frames = gray.length / px;
const steps = [];
for (let k = 0; k < frames - 1; k++) {
  let sum = 0;
  for (let i = 0; i < px; i++) {
    const d = gray[k * px + i] - gray[(k + 1) * px + i];
    sum += d * d;
  }
  steps.push(sum / px);
}
const median = (a) => {
  const b = [...a].sort((x, y) => x - y);
  return b[b.length >> 1] || 1;
};
const raw = steps.map((v, k) => {
  const around = steps.slice(Math.max(0, k - 36), k + 37);
  return Math.min(3, Math.max(1, v / median(around))) ** 0.8;
});
const weights = raw.map((_, k) => {
  const win = raw.slice(Math.max(0, k - 4), k + 5);
  return win.reduce((a, b) => a + b, 0) / win.length;
});
const cum = [0];
for (const w of weights) cum.push(cum[cum.length - 1] + w);
const total = cum[cum.length - 1];
const timeMap = cum.map((c) => Math.round((c / total) * 1e4) / 1e4);
const slowed = weights.filter((w) => w > 1.25).length;
console.log(`pacing: ${frames} frames, ${slowed} slowed (max ×${Math.max(...weights).toFixed(2)})`);

/*
 * Fallback stills: two per clip (its first and middle frame), ~60–120 KB
 * each. On a slow connection the scroll never waits for video — ScrollFilm
 * shows the nearest still for the current position until a video covering
 * it has arrived, so the picture always matches the chapter.
 */
mkdirSync(join(out, "stills"), { recursive: true });
const stills = [];
for (const g of segments) {
  for (const f of [g.start, g.start + Math.floor(g.frames / 2)]) {
    const png = join(tmpdir(), `pa-film-still-${process.pid}-${f}.png`);
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", resolve(src), "-vf", `select=eq(n\\,${f})`, "-frames:v", "1", png]);
    const name = String(f).padStart(4, "0");
    await sharp(png).resize({ width: 1600 }).webp({ quality: 70 }).toFile(join(out, "stills", `lg-${name}.webp`));
    await sharp(png)
      .extract({ left: smLeft, top: 0, width: SM_WIDTH, height: H })
      .resize({ width: 720 })
      .webp({ quality: 68 })
      .toFile(join(out, "stills", `sm-${name}.webp`));
    rmSync(png, { force: true });
    stills.push(f);
  }
}

const tmp = join(tmpdir(), `pa-film-poster-${process.pid}.png`);
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", resolve(src), "-frames:v", "1", tmp]);
await sharp(tmp).webp({ quality: 78 }).toFile(join(out, "poster.webp"));
rmSync(tmp, { force: true });

// Cache-busting stamp for the one-year immutable cache on /film/*.
const version = createHash("sha1");
for (const f of readdirSync(out).filter((f) => f.endsWith(".mp4")).sort()) {
  version.update(readFileSync(join(out, f)));
}
const stamp = version.digest("hex").slice(0, 10);

writeFileSync(
  join(root, "lib/film.js"),
  `// Generated by scripts/build-film.mjs — do not edit by hand.

export const film = {
  fps: ${FPS},
  duration: ${DURATION.toFixed(4)},
  /** Section height, in viewport heights. */
  scrollScreens: ${SCREENS},
  /** Length of the "Play the build" tour at 1×. */
  tourMs: ${Math.round(DURATION * 1000 * 1.6)},
  version: "${stamp}",
  poster: "/film/poster.webp?v=${stamp}",
  /**
   * Scroll progress (0–1) at which each frame is reached — see "Scroll
   * pacing" in scripts/build-film.mjs. Monotonic, one entry per frame.
   */
  timeMap: [${timeMap.join(",")}],
  /** Scroll progress where each clip after the first begins. */
  clipStarts: [${CLIP_STARTS.map((f) => timeMap[f]).join(", ")}],
  /** One full-quality file per clip: first frame and frame count. */
  segments: [
${segments.map((g, i) => `    { start: ${g.start}, frames: ${g.frames}, lg: "/film/lg-${i + 1}.mp4?v=${stamp}", sm: "/film/sm-${i + 1}.mp4?v=${stamp}" },`).join("\n")}
  ],
  preview: { lg: "/film/lg-lo.mp4?v=${stamp}", sm: "/film/sm-lo.mp4?v=${stamp}" },
  /** Fallback stills (frame numbers); files at /film/stills/{lg,sm}-NNNN.webp. */
  stills: [${stills.join(", ")}],
  /** Horizontal position of the subject in the full frame (0–1); sm is pre-cropped. */
  focalX: { lg: ${SUBJECT_X}, sm: 0.5 },
};
`,
);
console.log("wrote lib/film.js");
