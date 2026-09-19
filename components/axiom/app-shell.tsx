"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calculator,
  CalendarDays,
  CheckSquare2,
  ChevronLeft,
  Command as CommandIcon,
  FileText,
  Folder,
  Gauge,
  GraduationCap,
  Search,
  Settings,
  Shapes,
  Sparkles,
} from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { usePreferences } from "@/hooks/use-preferences";

type PreferencesContextValue = ReturnType<typeof usePreferences>;
const PreferencesContext = createContext<PreferencesContextValue | null>(null);
export const useAxiomPreferences = () => {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("useAxiomPreferences must be used inside AppShell");
  return value;
};

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/", icon: Gauge },
      { label: "Courses", href: "/courses", icon: BookOpen },
      { label: "Tasks", href: "/tasks", icon: CheckSquare2 },
      { label: "Planner", href: "/planner", icon: CalendarDays },
      { label: "AI Tutor", href: "/ai-tutor", icon: BrainCircuit },
      { label: "Practice", href: "/practice", icon: Shapes },
    ],
  },
  {
    label: "Academics",
    items: [
      { label: "Grades", href: "/grades", icon: GraduationCap },
      { label: "Progress", href: "/progress", icon: BarChart3 },
      { label: "Drive", href: "/drive", icon: Folder },
      { label: "Formula Bank", href: "/formula-bank", icon: Calculator },
    ],
  },
];

const paletteActions = [
  { label: "Go to Dashboard", href: "/", icon: Gauge, keys: "G D" },
  { label: "Go to Planner", href: "/planner", icon: CalendarDays, keys: "G P" },
  { label: "Go to Courses", href: "/courses", icon: BookOpen, keys: "G C" },
  { label: "Go to AI Tutor", href: "/ai-tutor", icon: BrainCircuit, keys: "G A" },
  { label: "Add Task", href: "/tasks?new=1", icon: CheckSquare2 },
  { label: "Start Study Session", href: "/planner?session=next", icon: Sparkles },
  { label: "Search Courses", href: "/courses?search=1", icon: Search },
  { label: "Search Materials", href: "/drive?search=1", icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const preferenceState = usePreferences();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeLabel = useMemo(() => navGroups.flatMap((group) => group.items).find((item) => item.href === pathname)?.label ?? (pathname.startsWith("/courses/") ? "Courses" : ""), [pathname]);
  const isPlannerWallpaper = pathname === "/planner" && preferenceState.preferences.wallpaper;

  return (
    <PreferencesContext.Provider value={preferenceState}>
      <div
        className="axiom-app"
        data-wallpaper={isPlannerWallpaper || undefined}
        style={{
          "--wallpaper-blur": `${preferenceState.preferences.wallpaperBlur}px`,
          "--overlay-darkness": `${preferenceState.preferences.overlayDarkness}%`,
          "--panel-alpha": preferenceState.preferences.panelTransparency / 100,
        } as React.CSSProperties}
      >
        {isPlannerWallpaper && <div className="wallpaper-layer" aria-hidden="true" />}
        <aside className="axiom-sidebar" data-collapsed={collapsed}>
          <div className="brand-row">
            <Link href="/" className="brand-link" aria-label="AXIOM dashboard">
              <div className="brand-mark" aria-hidden="true"><span /></div>
              {!collapsed && <div><strong>AXIOM</strong><small>Plan · Study · Progress</small></div>}
            </Link>
            <button className="icon-button collapse-button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <ChevronLeft size={18} />
            </button>
          </div>

          <button className="search-trigger" onClick={() => setCommandOpen(true)} aria-label="Open command palette">
            <Search size={18} />
            {!collapsed && <><span>Search</span><kbd><CommandIcon size={12} />K</kbd></>}
          </button>

          <nav aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                {!collapsed && <p className="nav-label">{group.label}</p>}
                {group.items.map(({ label, href, icon: Icon }) => {
                  const active = pathname === href || (href === "/courses" && pathname.startsWith("/courses/"));
                  return (
                    <Link key={href} href={href} className="nav-item" data-active={active || undefined} title={collapsed ? label : undefined}>
                      <Icon size={19} />{!collapsed && <span>{label}</span>}
                      {active && <motion.i className="active-rail" layoutId="active-navigation" />}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <Link href="/settings" className="nav-item" data-active={pathname === "/settings" || undefined} title={collapsed ? "Settings" : undefined}><Settings size={19} />{!collapsed && <span>Settings</span>}</Link>
            <div className="profile-card">
              <div className="avatar">J</div>
              {!collapsed && <div><strong>{preferenceState.preferences.name}</strong><small>{preferenceState.preferences.programme}</small></div>}
            </div>
          </div>
        </aside>

        <div className="app-stage">
          <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
          <AnimatePresence mode="wait">
            <motion.div
              className="page-frame"
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} title="AXIOM command palette" description="Navigate or start an action">
          <CommandInput placeholder="Search AXIOM..." />
          <CommandList>
            <CommandEmpty>No command found.</CommandEmpty>
            <CommandGroup heading={activeLabel ? `From ${activeLabel}` : "Quick actions"}>
              {paletteActions.map(({ label, href, icon: Icon, keys }) => (
                <CommandItem key={label} onSelect={() => { router.push(href); setCommandOpen(false); }}>
                  <Icon /> <span>{label}</span>{keys && <CommandShortcut>{keys}</CommandShortcut>}
                </CommandItem>
              ))}
              <CommandItem disabled><Sparkles /><span>Ask Axiom…</span><CommandShortcut>Coming later</CommandShortcut></CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </PreferencesContext.Provider>
  );
}
