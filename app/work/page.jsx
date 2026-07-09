// =============================================================================
// /work — short, textable portfolio URL (used in outreach SMS proof touches).
// The portfolio lives in the homepage's #work section; this route exists so
// "bluepeek.online/work" in an SMS never 404s.
// =============================================================================
import { redirect } from 'next/navigation';

export default function WorkIndex() {
  redirect('/#work');
}
