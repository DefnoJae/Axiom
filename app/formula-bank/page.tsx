"use client";

import { Copy, Search } from "lucide-react";
import { useState } from "react";

const formulas = [
  { category: "Fluid Mechanics", name: "Bernoulli equation", formula: "P/ρg + V²/2g + z = constant", variables: "P pressure · ρ density · V velocity · z elevation", use: "Energy balance along a streamline." },
  { category: "Fluid Mechanics", name: "Continuity equation", formula: "A₁V₁ = A₂V₂", variables: "A area · V velocity", use: "Relate velocity through changing pipe areas." },
  { category: "Physics", name: "Newton’s second law", formula: "F = ma", variables: "F force · m mass · a acceleration", use: "Find net force or resulting acceleration." },
  { category: "Thermal Fluids", name: "Ideal gas law", formula: "PV = mRT", variables: "P pressure · V volume · m mass · T temperature", use: "Relate thermodynamic state variables." },
];

export default function FormulaBankPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const visible = formulas.filter((item) => (filter === "All" || item.category === filter) && `${item.name} ${item.formula}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="page"><header className="page-header"><span className="eyebrow">REFERENCE</span><h1>Formula Bank</h1><p>Your essential equations, organized for fast recall.</p></header><div className="toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search formulas..." /></label><div className="segmented">{["All", "Fluid Mechanics", "Physics", "Thermal Fluids"].map((item) => <button key={item} data-active={filter === item || undefined} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="formula-grid">{visible.map((item) => <article className="panel formula-card" key={item.name}><span className="eyebrow">{item.category}</span><div className="formula-title"><h2>{item.name}</h2><button aria-label={`Copy ${item.name}`}><Copy size={16} /></button></div><div className="formula-expression">{item.formula}</div><p>{item.variables}</p><small>WHEN TO USE</small><strong>{item.use}</strong></article>)}</div></main>;
}
