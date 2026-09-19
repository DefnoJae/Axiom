"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpDown, Files, Grid2X2, List, Plus, Search, SquareCheckBig } from "lucide-react";
import { useMemo, useState } from "react";
import { courses } from "@/data/mock";
import { CourseArtwork } from "@/features/courses/course-artwork";

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => courses.filter((course) => `${course.code} ${course.title}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="page">
      <header className="page-header split-header"><div><span className="eyebrow">ACADEMICS</span><h1>Courses</h1><p>Your courses, all in one place.</p></div><button className="accent-button"><Plus size={18} /> Add Course</button></header>
      <div className="toolbar course-toolbar">
        <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses..." /></label>
        <select aria-label="Semester"><option>Semester 1 (2026/27)</option><option>Semester 2 (2025/26)</option></select>
        <button><ArrowUpDown size={16} /> Sort</button>
        <div className="view-toggle"><button data-active={view === "grid" || undefined} onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 size={17} /></button><button data-active={view === "list" || undefined} onClick={() => setView("list")} aria-label="List view"><List size={18} /></button></div>
      </div>
      <div className="filter-tabs">{["All", "Current", "Past", "Favourites"].map((item) => <button key={item} data-active={filter === item || undefined} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="course-grid" data-view={view}>
        {filtered.map((course) => (
          <motion.div key={course.id} whileHover={{ y: -6 }} transition={{ duration: .18 }}>
            <Link className="course-card" href={`/courses/${course.id}`}>
              <CourseArtwork course={course} compact={view === "list"} />
              <div className="course-card-body"><span className="course-code">{course.code}</span><h2>{course.title}</h2><p>Lecturer: {course.lecturer}</p><div className="course-progress"><div className="progress-track"><i style={{ width: `${course.progress}%` }} /></div><b>{course.progress}%</b></div><div className="course-meta"><span><Files size={15} /> {course.files} files</span><span><SquareCheckBig size={15} /> {course.tasksDone}/{course.tasksTotal} tasks</span><span>{course.nextClass}</span></div></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
