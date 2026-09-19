export type Course = {
  id: string;
  code: string;
  title: string;
  lecturer: string;
  progress: number;
  files: number;
  tasksDone: number;
  tasksTotal: number;
  nextClass: string;
  artwork: "fuzz" | "concrete" | "zebra" | "holo" | "cloud" | "glass";
};

export type Task = {
  id: string;
  title: string;
  course: string;
  due: string;
  category: "Assignment" | "Lab" | "Test" | "Quiz" | "Exam" | "Study Session";
  priority: "High" | "Medium" | "Normal";
  status: "Upcoming" | "Completed";
  weight?: number;
};

export type CalendarEvent = {
  id: string;
  title: string;
  course?: string;
  day: number;
  start: number;
  duration: number;
  type: "class" | "lab" | "study" | "deadline" | "personal";
  ai?: boolean;
};

export type StudySession = CalendarEvent & {
  type: "study";
  goal: string;
  steps: { duration: number; label: string }[];
  resources: string[];
};

export type Grade = {
  courseId: string;
  current: number;
  target: number;
  completedWeight: number;
  schemeId: string;
};

export type UserPreferences = {
  accent: string;
  accentRgb: string;
  glow: "off" | "subtle" | "normal" | "strong";
  wallpaper: boolean;
  wallpaperBlur: number;
  overlayDarkness: number;
  panelTransparency: number;
  name: string;
  programme: string;
  semester: string;
  sessionLength: number;
  weeklyGoal: number;
};
