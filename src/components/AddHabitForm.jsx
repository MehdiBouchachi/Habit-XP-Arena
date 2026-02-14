import { useState } from "react";

export default function AddHabitForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(7);

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now(),
      title: title.trim(),
      target: Number(target),
      progress: 0,
    });

    setTitle("");
    setTarget(7);
  }

  return (
    <section className="add-section">
      <div className="section-inner">
        <form onSubmit={submit}>
          <input
            placeholder="New habit..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            {[5, 7, 10, 14, 21].map((num) => (
              <option key={num} value={num}>
                {num} XP
              </option>
            ))}
          </select>

          <button className="btn-primary">Add Habit</button>
        </form>
      </div>
    </section>
  );
}
