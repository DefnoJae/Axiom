"use client";

import { BrainCircuit, CalendarPlus, ChevronLeft, ChevronRight, Clock3, Plus, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { initialEvents } from "@/data/mock";
import type { CalendarEvent } from "@/types";

const days = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18", "Sat 19", "Sun 20"];
const hours = Array.from({ length: 14 }, (_, index) => index + 7);

export default function PlannerPage() {
  const [events, setEvents] = useState(initialEvents);
  const [selected, setSelected] = useState<CalendarEvent | null>(null);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);
  const [eventDialog, setEventDialog] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [view, setView] = useState("Week");
  const studyCount = useMemo(() => events.filter((event) => event.type === "study").length, [events]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "create_planner_event",
      title: "Create planner event",
      description: "Create a visible mock event in the current AXIOM weekly planner.",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          day: { type: "integer", minimum: 0, maximum: 6 },
          start: { type: "number", minimum: 7, maximum: 20 },
          duration: { type: "number", minimum: 0.5, maximum: 4 },
          type: { type: "string", enum: ["class", "lab", "study", "deadline", "personal"] },
        },
        required: ["title", "day", "start", "duration", "type"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const candidate = input as Partial<CalendarEvent>;
        if (!candidate.title || typeof candidate.day !== "number" || typeof candidate.start !== "number" || typeof candidate.duration !== "number" || !candidate.type) {
          throw new Error("Invalid planner event");
        }
        const created = { ...candidate, id: `tool-${Date.now()}` } as CalendarEvent;
        setEvents((current) => [...current, created]);
        return { id: created.id, title: created.title, status: "created" };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const openCreate = () => {
    setEditing({ id: `custom-${Date.now()}`, title: "", day: 0, start: 9, duration: 1, type: "personal" });
    setEventDialog(true);
  };
  const saveEvent = () => {
    if (!editing?.title.trim()) return;
    setEvents((current) => [...current.filter((event) => event.id !== editing.id), editing]);
    setEventDialog(false);
  };
  const generatePlan = () => {
    setGenerating(true);
    window.setTimeout(() => {
      const additions: CalendarEvent[] = [
        { id: `gen-${Date.now()}-1`, title: "Physics Topic 3", course: "PHY3001", day: 2, start: 9, duration: 1.5, type: "study", ai: true },
        { id: `gen-${Date.now()}-2`, title: "Past Paper Sprint", course: "MEE3003", day: 4, start: 13, duration: 1.5, type: "study", ai: true },
      ];
      setEvents((current) => [...current, ...additions]);
      setGenerating(false);
      setPlanOpen(false);
    }, 1100);
  };

  return (
    <main className="page planner-page">
      <header className="page-header planner-header">
        <div><span className="eyebrow">SEPTEMBER 2026</span><h1>Planner</h1><p>Your classes, study plan and deadlines — all in one place.</p></div>
        <div className="planner-actions"><button className="ghost-button" onClick={openCreate}><Plus size={17} /> Add Task</button><button className="accent-button" onClick={() => setPlanOpen(true)}><Sparkles size={17} /> AI Plan</button></div>
      </header>
      <div className="planner-toolbar panel">
        <div className="segmented">{["Today", "Week", "Month"].map((item) => <button key={item} data-active={view === item || undefined} onClick={() => setView(item)}>{item}</button>)}</div>
        <div className="date-nav"><button aria-label="Previous week"><ChevronLeft size={17} /></button><strong>September 14–20, 2026</strong><button aria-label="Next week"><ChevronRight size={17} /></button></div>
        <div className="legend"><span className="class">Class</span><span className="study">AI Study</span><span className="lab">Lab</span><span className="deadline">Deadline</span><span className="personal">Personal</span></div>
      </div>
      <div className="planner-grid-layout">
        <section className="calendar panel">
          <div className="calendar-head"><span className="time-zone">GMT-5</span>{days.map((day, index) => <div key={day} data-today={index === 4 || undefined}><strong>{day.split(" ")[0]}</strong><span>{day.split(" ")[1]}</span></div>)}</div>
          <div className="calendar-body">
            <div className="time-axis">{hours.map((hour) => <span key={hour}>{hour > 12 ? hour - 12 : hour}:00</span>)}</div>
            <div className="calendar-lines">{hours.map((hour) => <i key={hour} />)}</div>
            {events.map((event) => <button key={event.id} className={`calendar-event ${event.type}`} style={{ "--day": event.day, "--start": event.start - 7, "--duration": event.duration } as React.CSSProperties} onClick={() => setSelected(event)}><strong>{event.ai && <Sparkles size={11} />} {event.title}</strong><span>{formatTime(event.start)} · {event.duration}h</span></button>)}
          </div>
        </section>
        <aside className="planner-side">
          <section className="panel side-card week-card"><span className="eyebrow">THIS WEEK</span><div className="metric-line"><strong>{studyCount} / 8</strong><span>study sessions</span></div><div className="progress-track"><i style={{ width: `${Math.min(studyCount / 8 * 100, 100)}%` }} /></div><p>7h 30m completed</p></section>
          <section className="panel side-card"><div className="side-card-title"><strong>Today</strong><button>View all</button></div><label className="today-task"><input type="checkbox" /><span><strong>Physics — Topic 3 Practice</strong><small>4:00 PM · 60 min</small></span></label><label className="today-task"><input type="checkbox" /><span><strong>Fluid Mechanics — Review</strong><small>7:30 PM · 45 min</small></span></label><button className="start-button">▶ Start Next Session</button></section>
          <section className="panel side-card ai-plan-card"><BrainCircuit size={23} /><span className="eyebrow">AI PLAN</span><h3>Let Axiom build your optimal week.</h3><button className="accent-button" onClick={() => setPlanOpen(true)}>Generate My Week</button></section>
          <section className="panel side-card"><strong>Quick add</strong><div className="quick-grid">{["Assignment", "Test", "Study Session", "Personal Event"].map((label) => <button key={label} onClick={openCreate}><CalendarPlus size={17} />{label}</button>)}</div></section>
        </aside>
      </div>

      <Dialog open={eventDialog} onOpenChange={setEventDialog}>
        <DialogContent className="axiom-dialog">
          <DialogHeader><DialogTitle>{events.some((event) => event.id === editing?.id) ? "Edit event" : "Add event"}</DialogTitle><DialogDescription>Mock planner data is stored for this session only.</DialogDescription></DialogHeader>
          {editing && <div className="form-grid"><label>Title<input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} placeholder="Event title" /></label><label>Day<select value={editing.day} onChange={(event) => setEditing({ ...editing, day: Number(event.target.value) })}>{days.map((day, index) => <option value={index} key={day}>{day}</option>)}</select></label><label>Start time<input type="number" min={7} max={20} value={editing.start} onChange={(event) => setEditing({ ...editing, start: Number(event.target.value) })} /></label><label>Type<select value={editing.type} onChange={(event) => setEditing({ ...editing, type: event.target.value as CalendarEvent["type"] })}>{["class", "lab", "study", "deadline", "personal"].map((type) => <option key={type}>{type}</option>)}</select></label></div>}
          <DialogFooter><button className="ghost-button" onClick={() => setEventDialog(false)}>Cancel</button><button className="accent-button" onClick={saveEvent}>Save event</button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="axiom-sheet">
          {selected && <><SheetHeader><span className="eyebrow">{selected.ai ? "AI STUDY SESSION" : selected.type.toUpperCase()}</span><SheetTitle>{selected.title}</SheetTitle><SheetDescription>{selected.course ?? "Personal"} · {formatTime(selected.start)} · {selected.duration}h</SheetDescription></SheetHeader><div className="sheet-body">{selected.type === "study" ? <StudyDetails /> : <><h3>Event details</h3><p>This mock event can be edited or removed from your weekly plan.</p></>}<div className="sheet-actions"><button className="ghost-button" onClick={() => { setEditing(selected); setEventDialog(true); setSelected(null); }}>Edit event</button><button className="danger-button" onClick={() => { setEvents((current) => current.filter((event) => event.id !== selected.id)); setSelected(null); }}><Trash2 size={16} /> Delete</button></div></div><SheetFooter>{selected.type === "study" && <button className="accent-button">Start Study Session</button>}</SheetFooter></>}
        </SheetContent>
      </Sheet>

      <Sheet open={planOpen} onOpenChange={setPlanOpen}>
        <SheetContent className="axiom-sheet plan-sheet"><SheetHeader><span className="eyebrow">MOCK AI PLANNER</span><SheetTitle>Build My Week</SheetTitle><SheetDescription>Available study time: 14.5 hours</SheetDescription></SheetHeader><div className="sheet-body priority-list">{[["Physics", "High", "5 hours"], ["Fluid Mechanics", "High", "4 hours"], ["Thermal Fluid Science", "Medium", "2.5 hours"], ["Critical Thinking", "Normal", "1.5 hours"], ["Buffer", "", "1.5 hours"]].map(([name, priority, time]) => <div key={name}><span><strong>{name}</strong>{priority && <small>Priority: {priority}</small>}</span><b>{time}</b></div>)}</div><SheetFooter><button className="accent-button full-button" disabled={generating} onClick={generatePlan}>{generating ? <><span className="spinner" /> Building your week…</> : <><Sparkles size={17} /> Generate Plan</>}</button></SheetFooter></SheetContent>
      </Sheet>
    </main>
  );
}

function StudyDetails() {
  return <><section><span className="eyebrow">GOAL</span><h3>Master Topic 3</h3></section><section><span className="eyebrow">PLAN</span>{[[20, "Review Lecture 3"], [60, "Solve tutorial problems"], [20, "AI-generated test questions"], [20, "Review mistakes"]].map(([minutes, label]) => <div className="plan-step" key={label}><Clock3 size={16} /><b>{minutes} min</b><span>{label}</span></div>)}</section><section><span className="eyebrow">RESOURCES</span><p>Lecture 3.pdf · Tutorial 3.pdf</p></section></>;
}

function formatTime(value: number) {
  const hour = Math.floor(value);
  const minutes = value % 1 ? "30" : "00";
  return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
}
