import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "imech.announcement.dismissed";
const DEFAULT_MESSAGE =
  "iMECH Global \u2014 Integrated HR, Talent & Management Solutions for a Future-Ready Organization.";

interface AnnouncementBarProps {
  message?: string;
}

export function AnnouncementBar({ message = DEFAULT_MESSAGE }: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // sessionStorage unavailable; keep the bar visible.
    }
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors
    }
    setVisible(false);
    const header = document.getElementById("site-header");
    const focusable = header?.querySelector<HTMLElement>("a, button");
    focusable?.focus();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-navy-dark text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 text-xs sm:text-sm">
        <span className="flex-1 text-center">{message}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-white/10"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
