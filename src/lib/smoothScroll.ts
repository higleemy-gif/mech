export interface ScrollResult {
  ok: boolean;
}

// Centralized anchored scrolling with fixed-header offset and graceful
// missing-target handling. Returns { ok: false } without moving when the
// target element does not exist.
export function smoothScrollTo(targetId: string, headerOffset = 72): ScrollResult {
  const el = document.getElementById(targetId);
  if (!el) {
    return { ok: false };
  }
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  return { ok: true };
}
