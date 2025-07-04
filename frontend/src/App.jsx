import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <nav className="bg-white shadow p-4 flex justify-around">
          <NavLink to="/" className={({ isActive }) => isActive ? "font-bold" : ""}>Spiral Map</NavLink>
          <NavLink to="/journal" className={({ isActive }) => isActive ? "font-bold" : ""}>Pattern Journal</NavLink>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? "font-bold" : ""}>Spiral Calendar</NavLink>
          <NavLink to="/ecosystem" className={({ isActive }) => isActive ? "font-bold" : ""}>Ecosystem Mapper</NavLink>
          <NavLink to="/efs" className={({ isActive }) => isActive ? "font-bold" : ""}>EFS Visualizer</NavLink>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<SpiralMap />} />
            <Route path="/journal" element={<PatternJournal />} />
            <Route path="/calendar" element={<SpiralCalendar />} />
            <Route path="/ecosystem" element={<EcosystemMapper />} />
            <Route path="/efs" element={<EFSVisualizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function SpiralMap() {
  const lamps = [
    "Safety", "Inclusivity", "Healing", "Learning", "Growth", "Fun", "Organized", "Self-Discovery", "Connection"
  ];

  const functions = [
    "Recursive Presence", "Pattern Recognition", "Diunital Logic", "Nonlinear Time",
    "Quantum Entanglement", "Emergence", "Inner Coherence", "Outer Coherence"
  ];

  const domains = [
    "Sensory", "Cognitive", "Emotional", "Relational", "Environmental Fit"
  ];

  const [selected, setSelected] = useState({ lamp: null, func: null, domain: null });

  const generatePrompt = () => {
    if (!selected.lamp && !selected.func && !selected.domain) return "Select a lamp, function, or domain to receive a prompt.";
    return `Reflect on how ${selected.lamp || 'your current state'} engages ${selected.func || 'your way of thinking'} in the context of ${selected.domain || 'your lived experience'}.`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🌌 Spiral Mandala Map</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">🕯️ Lamps</h3>
          {lamps.map((lamp) => (
            <button
              key={lamp}
              className={`block w-full text-left px-3 py-1 rounded mb-1 ${selected.lamp === lamp ? 'bg-blue-200' : 'bg-white'}`}
              onClick={() => setSelected({ ...selected, lamp })}
            >
              {lamp}
            </button>
          ))}
        </div>
        <div>
          <h3 className="font-semibold">🔮 Functions</h3>
          {functions.map((func) => (
            <button
              key={func}
              className={`block w-full text-left px-3 py-1 rounded mb-1 ${selected.func === func ? 'bg-green-200' : 'bg-white'}`}
              onClick={() => setSelected({ ...selected, func })}
            >
              {func}
            </button>
          ))}
        </div>
        <div>
          <h3 className="font-semibold">🌿 Domains</h3>
          {domains.map((domain) => (
            <button
              key={domain}
              className={`block w-full text-left px-3 py-1 rounded mb-1 ${selected.domain === domain ? 'bg-purple-200' : 'bg-white'}`}
              onClick={() => setSelected({ ...selected, domain })}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-white border rounded shadow">
        <h3 className="text-lg font-semibold mb-2">🔍 Selected Elements</h3>
        <p><strong>Lamp:</strong> {selected.lamp || "None"}</p>
        <p><strong>Function:</strong> {selected.func || "None"}</p>
        <p><strong>Domain:</strong> {selected.domain || "None"}</p>
        <p className="mt-4 text-blue-700"><strong>🧠 Prompt:</strong> {generatePrompt()}</p>
      </div>
    </div>
  );
}

function PatternJournal() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("patternJournalEntries");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentEntry, setCurrentEntry] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    localStorage.setItem("patternJournalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    const newEntry = {
      text: currentEntry,
      tag,
      timestamp: new Date().toISOString()
    };
    setEntries([newEntry, ...entries]);
    setCurrentEntry("");
    setTag("");
  };

  const exportMarkdown = () => {
    const md = entries.map(e => `### ${new Date(e.timestamp).toLocaleString()}\n**Tag:** ${e.tag}\n\n${e.text}\n`).join("\n\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pattern-journal.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pattern-journal.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📝 Pattern Journal</h2>
      <textarea
        className="w-full h-40 p-4 border rounded"
        placeholder="Reflect on your spiral experience today..."
        value={currentEntry}
        onChange={(e) => setCurrentEntry(e.target.value)}
      />
      <input
        className="mt-2 p-2 border rounded w-full"
        placeholder="Optional tag (e.g. Insight, Return, Rupture)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button
        onClick={addEntry}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Entry
      </button>
      <button
        onClick={exportMarkdown}
        className="ml-4 mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Export Markdown
      </button>
      <button
        onClick={exportJSON}
        className="ml-4 mt-4 px-4 py-2 bg-yellow-600 text-white rounded"
      >
        Export JSON
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Previous Entries</h3>
        {entries.map((entry, index) => (
          <div key={index} className="border rounded p-4 mb-4 bg-white shadow">
            <div className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</div>
            {entry.tag && <div className="text-sm italic text-blue-600">Tag: {entry.tag}</div>}
            <p className="mt-2 whitespace-pre-line">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpiralCalendar() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("patternJournalEntries");
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setEntries(parsed);
    }
  }, []);

  const getEmoji = (tag) => {
    if (!tag) return "🔘";
    const map = {
      insight: "✨",
      return: "🔁",
      rupture: "⚡",
      integration: "🧩"
    };
    return map[tag.toLowerCase()] || "🌀";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🌀 Spiral Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {entries.map((entry, index) => (
          <div key={index} className="p-2 border rounded bg-white shadow text-center text-sm">
            <div>{new Date(entry.timestamp).toLocaleDateString()}</div>
            <div className="text-2xl">{getEmoji(entry.tag)}</div>
            {entry.tag && <div className="text-blue-500 italic">{entry.tag}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function EcosystemMapper() {
  const [roles, setRoles] = useState([
    { name: "Witness", fit: false },
    { name: "Anchor", fit: false },
    { name: "Mirror", fit: false },
    { name: "Spark", fit: false },
    { name: "Space Holder", fit: false }
  ]);

  const toggleFit = (index) => {
    const updated = [...roles];
    updated[index].fit = !updated[index].fit;
    setRoles(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🌱 Ecosystem Mapper</h2>
      <div className="grid grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <div key={i} className={`p-4 border rounded shadow ${role.fit ? 'bg-green-100' : 'bg-white'}`}> 
            <h3 className="text-lg font-semibold">{role.name}</h3>
            <button
              onClick={() => toggleFit(i)}
              className="mt-2 px-3 py-1 text-sm rounded bg-indigo-600 text-white"
            >
              {role.fit ? "Marked as Fit" : "Mark as Fit"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EFSVisualizer() {
  return <div className="text-xl">🔁 EFS Visualizer Placeholder</div>;
}

export default App;
