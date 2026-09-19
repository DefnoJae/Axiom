import type { CalendarEvent, Course, Grade, Task } from "@/types";

export const courses: Course[] = [
  { id: "fluid-mechanics", code: "MEE3003", title: "Fluid Mechanics", lecturer: "Paul Campbell", progress: 68, files: 12, tasksDone: 3, tasksTotal: 5, nextClass: "Today, 1:00 PM", artwork: "fuzz" },
  { id: "thermal-fluid-science", code: "MEE2017", title: "Thermal Fluid Science", lecturer: "TBA", progress: 57, files: 18, tasksDone: 2, tasksTotal: 4, nextClass: "Tue, 1:00 PM", artwork: "concrete" },
  { id: "physics", code: "PHY3001", title: "Physics", lecturer: "Dr. A. Brown", progress: 74, files: 25, tasksDone: 4, tasksTotal: 6, nextClass: "Mon, 8:00 AM", artwork: "zebra" },
  { id: "critical-thinking", code: "COM2016", title: "Critical Thinking, Reading & Writing", lecturer: "TBA", progress: 46, files: 9, tasksDone: 2, tasksTotal: 4, nextClass: "Tue, 1:00 PM", artwork: "holo" },
  { id: "community-service", code: "CSP1001", title: "Community Service Project", lecturer: "TBA", progress: 28, files: 7, tasksDone: 1, tasksTotal: 3, nextClass: "Tue, 8:00 AM", artwork: "cloud" },
  { id: "engineering-seminar", code: "MEE3005", title: "Engineering Seminar", lecturer: "TBA", progress: 38, files: 6, tasksDone: 1, tasksTotal: 3, nextClass: "Mon, 5:00 PM", artwork: "glass" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Topic 3 practice set", course: "Physics", due: "Today · 6:00 PM", category: "Study Session", priority: "High", status: "Upcoming" },
  { id: "t2", title: "Tutorial review", course: "Fluid Mechanics", due: "Tomorrow · 9:00 PM", category: "Assignment", priority: "High", status: "Upcoming", weight: 8 },
  { id: "t3", title: "Lab report 2", course: "Thermal Fluid Science", due: "Sep 25", category: "Lab", priority: "Medium", status: "Upcoming", weight: 12 },
  { id: "t4", title: "Physics test 1", course: "Physics", due: "Sep 28", category: "Test", priority: "High", status: "Upcoming", weight: 20 },
  { id: "t5", title: "Community reflection", course: "Community Service", due: "Sep 30", category: "Assignment", priority: "Normal", status: "Upcoming", weight: 10 },
  { id: "t6", title: "Lecture 2 notes", course: "Fluid Mechanics", due: "Completed Sep 16", category: "Study Session", priority: "Normal", status: "Completed" },
];

export const grades: Grade[] = [
  { courseId: "fluid-mechanics", current: 72, target: 80, completedWeight: 35, schemeId: "utech-default" },
  { courseId: "thermal-fluid-science", current: 66, target: 75, completedWeight: 30, schemeId: "utech-default" },
  { courseId: "physics", current: 78, target: 82, completedWeight: 40, schemeId: "utech-default" },
  { courseId: "critical-thinking", current: 81, target: 80, completedWeight: 45, schemeId: "utech-default" },
];

export const initialEvents: CalendarEvent[] = [
  { id: "e1", title: "Physics Lecture", course: "PHY3001", day: 0, start: 8, duration: 2, type: "class" },
  { id: "e2", title: "Physics Practical Lab", course: "PHY3001", day: 0, start: 11, duration: 3, type: "lab" },
  { id: "e3", title: "Thermal Fluid Science", course: "MEE2017", day: 0, start: 14, duration: 1, type: "class" },
  { id: "e4", title: "Physics Tutorial", course: "PHY3001", day: 0, start: 15, duration: 1, type: "class" },
  { id: "e5", title: "Engineering Seminar", course: "MEE3005", day: 0, start: 17, duration: 1, type: "class" },
  { id: "e6", title: "Community Service Project", course: "CSP1001", day: 1, start: 8, duration: 1, type: "class" },
  { id: "e7", title: "Critical Thinking", course: "COM2016", day: 1, start: 13, duration: 1, type: "class" },
  { id: "e8", title: "Fluid Mechanics Lecture", course: "MEE3003", day: 2, start: 13, duration: 2, type: "class" },
  { id: "e9", title: "Critical Thinking", course: "COM2016", day: 2, start: 16, duration: 2, type: "class" },
  { id: "e10", title: "Thermal Fluid Science Lab", course: "MEE2017", day: 3, start: 12, duration: 3, type: "lab" },
  { id: "e11", title: "Fluid Mechanics", course: "MEE3003", day: 4, start: 16, duration: 1, type: "class" },
  { id: "ai1", title: "Physics Practice", course: "PHY3001", day: 1, start: 10, duration: 1.5, type: "study", ai: true },
  { id: "ai2", title: "Fluid Mechanics Review", course: "MEE3003", day: 3, start: 9, duration: 1.5, type: "study", ai: true },
  { id: "ai3", title: "Thermal Fluids Lab Prep", course: "MEE2017", day: 3, start: 16, duration: 1, type: "study", ai: true },
  { id: "e12", title: "Physics Test 1", course: "PHY3001", day: 4, start: 11, duration: 1, type: "deadline" },
  { id: "e13", title: "Gym", day: 5, start: 17, duration: 1.5, type: "personal" },
];

export const courseFolders = ["Lectures", "Tutorials", "Labs", "Assignments", "Past Papers", "Formula Sheets"];
