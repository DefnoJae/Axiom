import { BrainCircuit, CalendarDays, Clock3, Sparkles, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { courses, tasks } from "@/data/mock";

export default function DashboardPage() {
  return (
    <main className="page dashboard-page">
      <header className="page-header dashboard-header">
        <div><span className="eyebrow">THURSDAY · SEPTEMBER 18</span><h1>Good afternoon, Jae</h1><p>Here’s what matters today.</p></div>
        <Link href="/ai-tutor" className="accent-button"><Sparkles size={17} /> Ask Axiom</Link>
      </header>
      <div className="dashboard-layout">
        <section className="panel dashboard-next">
          <div className="panel-heading"><span className="panel-icon"><Clock3 size={18} /></span><span>Next class</span><small>in 42 min</small></div>
          <div className="next-class-content"><span className="course-code">MEE3003</span><h2>Fluid Mechanics</h2><p>Lecture · Room 1A-68</p><div className="time-pill">1:00 PM — 2:50 PM</div></div>
        </section>
        <section className="panel dashboard-plan">
          <div className="panel-heading"><span className="panel-icon violet"><BrainCircuit size={18} /></span><span>Today’s study plan</span><small>2 sessions</small></div>
          {["Physics practice|4:00 PM|Topic 3 · 60 min", "Fluid review|7:30 PM|Bernoulli’s equation · 45 min"].map((item) => {
            const [title, time, meta] = item.split("|");
            return <div className="session-row" key={title}><span className="session-time">{time}</span><div><strong>{title}</strong><small>{meta}</small></div><Sparkles size={15} className="spark" /></div>;
          })}
        </section>
        <section className="panel dashboard-deadlines">
          <div className="panel-heading"><span className="panel-icon orange"><Target size={18} /></span><span>Upcoming deadlines</span><Link href="/tasks">View all</Link></div>
          <div className="deadline-list">{tasks.slice(1, 4).map((task) => <div className="deadline-row" key={task.id}><span className={`priority-dot ${task.priority.toLowerCase()}`} /><div><strong>{task.title}</strong><small>{task.course}</small></div><time>{task.due}</time></div>)}</div>
        </section>
        <section className="panel dashboard-progress">
          <div className="panel-heading"><span className="panel-icon cyan"><TrendingUp size={18} /></span><span>Course progress</span><small>Semester 1</small></div>
          <div className="progress-list">{courses.slice(0, 4).map((course) => <div className="progress-row" key={course.id}><div><strong>{course.code}</strong><span>{course.title}</span></div><div className="progress-track"><i style={{ width: `${course.progress}%` }} /></div><b>{course.progress}%</b></div>)}</div>
        </section>
        <section className="panel study-metric">
          <CalendarDays size={20} /><span className="eyebrow">WEEKLY STUDY</span><strong>7h 30m</strong><p>of 12 hour goal</p><div className="progress-track"><i style={{ width: "62%" }} /></div>
        </section>
        <section className="panel insight-panel">
          <div className="insight-orb"><Sparkles size={24} /></div><div><span className="eyebrow">AXIOM INSIGHT</span><p>Your Physics assessment is approaching. Topic 3 needs the most attention.</p></div><Link href="/ai-tutor" aria-label="Open AI Tutor">→</Link>
        </section>
      </div>
    </main>
  );
}
