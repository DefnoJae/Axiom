"use client";

import { Check, Circle, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { tasks as initialTasks } from "@/data/mock";
import type { Task } from "@/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<"All" | "Upcoming" | "Completed">("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => tasks.filter((task) => (view === "All" || task.status === view) && `${task.title} ${task.course}`.toLowerCase().includes(query.toLowerCase())), [tasks, view, query]);
  const toggle = (id: string) => setTasks((items) => items.map((task) => task.id === id ? { ...task, status: task.status === "Completed" ? "Upcoming" : "Completed" } as Task : task));
  return <main className="page"><header className="page-header split-header"><div><span className="eyebrow">PLAN</span><h1>Tasks</h1><p>Keep assessments and study work moving.</p></div><button className="accent-button"><Plus size={18} /> New Task</button></header><div className="toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." /></label><div className="segmented">{(["All", "Upcoming", "Completed"] as const).map((item) => <button key={item} data-active={view === item || undefined} onClick={() => setView(item)}>{item}</button>)}</div></div><section className="panel task-table"><div className="task-head"><span>Task</span><span>Type</span><span>Due</span><span>Priority</span><span>Weight</span></div>{visible.map((task) => <div className="task-row" key={task.id} data-completed={task.status === "Completed" || undefined}><button onClick={() => toggle(task.id)} aria-label={`Mark ${task.title} ${task.status === "Completed" ? "upcoming" : "completed"}`}>{task.status === "Completed" ? <Check size={15} /> : <Circle size={15} />}</button><div><strong>{task.title}</strong><small>{task.course}</small></div><span className="task-kind">{task.category}</span><time>{task.due}</time><span className={`priority-chip ${task.priority.toLowerCase()}`}>{task.priority}</span><span>{task.weight ? `${task.weight}%` : "—"}</span></div>)}</section></main>;
}
