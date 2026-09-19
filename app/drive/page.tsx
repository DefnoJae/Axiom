"use client";

import { Grid2X2, List, Plus, Search, Upload } from "lucide-react";
import { useState } from "react";
import { courses } from "@/data/mock";
import { CourseArtwork } from "@/features/courses/course-artwork";

export default function DrivePage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return <main className="page"><header className="page-header split-header"><div><span className="eyebrow">MOCK DRIVE</span><h1>Google Drive</h1><p>Your course materials in one place.</p></div><div className="header-actions"><button className="ghost-button"><Plus size={17} /> New folder</button><button className="accent-button"><Upload size={17} /> Upload</button></div></header><div className="toolbar"><label className="search-field"><Search size={17} /><input placeholder="Search Semester 1..." /></label><select><option>Sort: Name</option><option>Sort: Updated</option></select><div className="view-toggle"><button data-active={view === "grid" || undefined} onClick={() => setView("grid")}><Grid2X2 /></button><button data-active={view === "list" || undefined} onClick={() => setView("list")}><List /></button></div></div><div className="drive-grid" data-view={view}>{courses.map((course) => <button className="drive-folder" key={course.id}><CourseArtwork course={course} compact={view === "list"} /><div><strong>{course.title}</strong><span>{course.files} items · {course.code}</span></div></button>)}<button className="new-folder-card"><Plus /><span>New Folder</span></button></div><p className="architecture-note">This view uses isolated mock data. Google OAuth and Drive APIs are intentionally not connected.</p></main>;
}
