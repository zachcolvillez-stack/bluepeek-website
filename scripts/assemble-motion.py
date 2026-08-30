"""Assemble the animated brand assets.

Timing is taken frame-by-frame from the reference (BLUE-TEES_Esign.gif):
  900ms empty  ->  480ms diagonal reveal  ->  5100ms hold  =  6480ms loop.
Consecutive identical frames are merged and their durations summed, so the
reveal still lasts exactly 480ms even where the wipe settles sub-pixel.
"""
from PIL import Image
import glob, os, shutil

EMPTY_MS, REVEAL_MS, HOLD_MS = 900, 480, 5100
M = 'public/brand/motion'

def load(pat, size=None, alpha=False):
    out = []
    for f in sorted(glob.glob(pat)):
        im = Image.open(f).convert('RGBA' if alpha else 'RGB')
        if size:
            im = im.resize(size if isinstance(size, tuple) else (size, size), Image.LANCZOS)
        out.append(im)
    return out

def dedupe(frames):
    """Merge consecutive identical frames, splitting REVEAL_MS across them."""
    per = REVEAL_MS / len(frames)
    kept, durs = [], []
    for f in frames:
        if kept and f.tobytes() == kept[-1].tobytes():
            durs[-1] += per
        else:
            kept.append(f); durs.append(per)
    return kept, [int(round(d)) for d in durs]

def build(frames, out, empty_fill=None, colors=96, webp=False):
    kept, durs = dedupe(frames)
    empty = (Image.new('RGBA', kept[0].size, (0,0,0,0)) if webp
             else Image.new('RGB', kept[0].size, empty_fill))
    # The hold gets its own frame (a repeat of the last), so every reveal
    # duration survives and the reveal totals exactly REVEAL_MS.
    seq = [empty] + kept + [kept[-1]]
    d = [EMPTY_MS] + durs + [HOLD_MS]
    if webp:
        seq[0].save(out, save_all=True, append_images=seq[1:], duration=d, loop=0, quality=84, method=6)
    else:
        q = [f.quantize(colors=colors, method=Image.MEDIANCUT,
                        dither=Image.FLOYDSTEINBERG if colors > 64 else Image.NONE) for f in seq]
        q[0].save(out, save_all=True, append_images=q[1:], duration=d, loop=0, disposal=2, optimize=False)
    return os.path.getsize(out) // 1024, len(seq)

solid = load('public/email/frames-solid/*.png', 110)
print('logo email gif  ', *build(solid, 'public/email/logo-animated.gif', (255,255,255), 64))
alpha = load('public/email/frames-alpha/*.png', 320, alpha=True)
print('logo alpha webp ', *build(alpha, f'{M}/logo-alpha.webp', webp=True))
a2 = [f.resize((240,240), Image.LANCZOS) for f in alpha]
kept, durs = dedupe(a2)
seq = [Image.new('RGBA',(240,240),(0,0,0,0))] + kept + [kept[-1]]
seq[0].save(f'{M}/logo-alpha.png', save_all=True, append_images=seq[1:],
            duration=[EMPTY_MS]+durs+[HOLD_MS], loop=0)
print('logo alpha apng ', os.path.getsize(f'{M}/logo-alpha.png')//1024, len(seq))
print('logo green gif  ', *build(load('public/email/frames-green/*.png', 320), f'{M}/logo-greenscreen.gif', (0,255,0)))

for who in ('jac','zach'):
    f0 = Image.open(sorted(glob.glob(f'{M}/card-{who}-white/*.png'))[0])
    W = 640; H = round(f0.height * W / f0.width)
    print(f'{who} card gif    ', *build(load(f'{M}/card-{who}-white/*.png', (W,H)), f'{M}/card-{who}.gif', (255,255,255)))
    print(f'{who} card webp   ', *build(load(f'{M}/card-{who}-alpha/*.png', (W,H), alpha=True), f'{M}/card-{who}-alpha.webp', webp=True))
    print(f'{who} card green  ', *build(load(f'{M}/card-{who}-green/*.png', (W,H)), f'{M}/card-{who}-greenscreen.gif', (0,255,0)))

shutil.rmtree(f'{M}/frames', ignore_errors=True); os.makedirs(f'{M}/frames')
for i, f in enumerate(alpha): f.save(f'{M}/frames/logo-{i:02d}.png')
for d in ('solid','alpha','green'): shutil.rmtree(f'public/email/frames-{d}', ignore_errors=True)
for d in glob.glob(f'{M}/card-*-white') + glob.glob(f'{M}/card-*-alpha') + glob.glob(f'{M}/card-*-green'):
    shutil.rmtree(d)
