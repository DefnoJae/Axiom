"use client";

import { useParams } from "next/navigation";
import { Download, FileText, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseFolders, courses } from "@/data/mock";
import { CourseArtwork } from "@/features/courses/course-artwork";

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();
  const course = courses.find((item) => item.id === params.courseId) ?? courses[0];
  return (
    <main className="page">
      <header className="course-detail-header panel"><CourseArtwork course={course} compact /><div><span className="course-code">{course.code}</span><h1>{course.title}</h1><p>{course.lecturer} · Semester 1</p></div><button className="accent-button"><Sparkles size={17} /> Study with Axiom</button></header>
      <Tabs defaultValue="overview" className="course-tabs">
        <TabsList variant="line">{["overview", "materials", "assessments", "grades", "practice", "ai-tutor"].map((tab) => <TabsTrigger value={tab} key={tab}>{tab === "ai-tutor" ? "AI Tutor" : tab[0].toUpperCase() + tab.slice(1)}</TabsTrigger>)}</TabsList>
        <TabsContent value="overview"><div className="detail-grid"><section className="panel content-card"><h2>Course overview</h2><p>Core principles of fluid behavior, pressure, energy, flow measurement and engineering applications.</p><div className="stat-row"><div><strong>{course.progress}%</strong><span>Progress</span></div><div><strong>{course.files}</strong><span>Materials</span></div><div><strong>{course.tasksTotal - course.tasksDone}</strong><span>Tasks left</span></div></div></section><section className="panel content-card"><h2>Next up</h2><p className="agenda-item"><span>Lecture 6</span><strong>Bernoulli applications</strong><small>Today · 1:00 PM</small></p><p className="agenda-item"><span>Assessment</span><strong>Tutorial review</strong><small>Due tomorrow</small></p></section></div></TabsContent>
        <TabsContent value="materials"><FolderGrid /></TabsContent>
        <TabsContent value="assessments"><EmptyTab icon={FileText} title="Assessments" text="2 upcoming · 3 completed" /></TabsContent>
        <TabsContent value="grades"><EmptyTab icon={Download} title="Current grade" text="72% calculated from 35% completed weight." /></TabsContent>
        <TabsContent value="practice"><EmptyTab icon={Sparkles} title="Practice sets" text="Continue Topic 3 or generate a mock quiz." /></TabsContent>
        <TabsContent value="ai-tutor"><EmptyTab icon={Sparkles} title="Course tutor" text="Ask questions using this course’s mock context." /></TabsContent>
      </Tabs>
    </main>
  );
}

function FolderGrid() {
  return <div className="folder-grid">{courseFolders.map((folder, index) => <button className={`folder-card folder-variant-${index + 1}`} key={folder}><span className="folder-shape"><i /></span><strong>{folder}</strong><small>{index * 3 + 4} items</small></button>)}</div>;
}

function EmptyTab({ icon: Icon, title, text }: { icon: typeof FileText; title: string; text: string }) {
  return <section className="panel empty-tab"><Icon size={26} /><h2>{title}</h2><p>{text}</p></section>;
}
