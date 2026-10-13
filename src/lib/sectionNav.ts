import type { NavigateFunction } from "react-router-dom";
import { smoothScrollTo } from "./smoothScroll";

// Scroll to an on-page section if it exists; otherwise navigate to the home
// page with the matching hash so Home can scroll to it after mount.
export function goToSection(navigate: NavigateFunction, targetId: string) {
  const result = smoothScrollTo(targetId);
  if (!result.ok) {
    navigate("/#" + targetId);
  }
}
