"use client";

import { useEffect, useState } from "react";
import type { UserPreferences } from "@/types";

export const defaultPreferences: UserPreferences = {
  accent: "#ff4da6",
  accentRgb: "255 77 166",
  glow: "normal",
  wallpaper: true,
  wallpaperBlur: 8,
  overlayDarkness: 64,
  panelTransparency: 84,
  name: "Jae",
  programme: "Mechanical Engineering",
  semester: "Semester 1 (2026/27)",
  sessionLength: 60,
  weeklyGoal: 12,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const saved = window.localStorage.getItem("axiom-preferences");
    if (!saved) return;
    const frame = window.requestAnimationFrame(() => {
      setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("axiom-preferences", JSON.stringify(preferences));
    const root = document.documentElement;
    root.style.setProperty("--accent", preferences.accent);
    root.style.setProperty("--accent-rgb", preferences.accentRgb);
    root.style.setProperty("--accent-soft", `rgb(${preferences.accentRgb} / 14%)`);
    const glowAlpha = { off: 0, subtle: 0.18, normal: 0.34, strong: 0.56 }[preferences.glow];
    root.style.setProperty("--accent-glow", `0 0 28px rgb(${preferences.accentRgb} / ${glowAlpha})`);
  }, [preferences]);

  return { preferences, setPreferences };
}
