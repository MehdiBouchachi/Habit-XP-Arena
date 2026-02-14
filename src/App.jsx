import { useState, useEffect } from "react";

/* RANK SYSTEM */

const RANKS = [
  { name: "Bronze", min: 0, color: "#cd7f32" },
  { name: "Silver", min: 200, color: "#c0c0c0" },
  { name: "Gold", min: 500, color: "#facc15" },
  { name: "Platinum", min: 900, color: "#22d3ee" },
  { name: "Diamond", min: 1500, color: "#38bdf8" },
];

function getRank(totalXP) {
  return [...RANKS].reverse().find((rank) => totalXP >= rank.min);
}

/* MAIN APP */

export default function App() {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("xp-habits");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState("all");

  /* PERSIST TO LOCAL STORAGE */

  useEffect(() => {
    localStorage.setItem("xp-habits", JSON.stringify(habits));
  }, [habits]);

  /* XP + LEVEL SYSTEM */

  const totalXP = habits.reduce((acc, h) => acc + h.progress, 0);

  const level = Math.floor(totalXP / 100) + 1;
  const xpInLevel = totalXP % 100;
  const xpPercent = xpInLevel;

  const rank = getRank(totalXP);

  /* ACTIONS */

  function addHabit(habit) {
    setHabits((prev) => [...prev, habit]);
  }

  function deleteHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function increment(id) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id && h.progress < h.target
          ? { ...h, progress: h.progress + 1 }
          : h,
      ),
    );
  }

  function decrement(id) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id && h.progress > 0 ? { ...h, progress: h.progress - 1 } : h,
      ),
    );
  }

  const filtered =
    filter === "all"
      ? habits
      : filter === "completed"
        ? habits.filter((h) => h.progress === h.target)
        : habits.filter((h) => h.progress < h.target);

  const completed = habits.filter((h) => h.progress === h.target).length;

  return (
    <>
      {/* HERO */}

      <header>
        <div className="section-inner">
          <h1>⚔ Habit XP Arena</h1>
          <p>Level up your daily habits.</p>

          <div className="player-stats">
            <div className="level-box">
              <span>Level {level}</span>
            </div>

            <div className="rank-box" style={{ color: rank.color }}>
              {rank.name} Rank
            </div>
          </div>

          <div className="global-xp-bar">
            <div
              className="global-xp-fill"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <div className="xp-label-global">
            {xpInLevel} / 100 XP to next level
          </div>
        </div>
      </header>

      {/* ADD SECTION */}

      <section className="add-section">
        <div className="section-inner">
          <AddHabitForm onAdd={addHabit} />
        </div>
      </section>

      {/* ARENA */}

      <section className="arena">
        <div className="section-inner">
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          {filtered.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onDelete={deleteHabit}
              onIncrement={increment}
              onDecrement={decrement}
            />
          ))}

          <div className="stats">
            {habits.length === 0
              ? "Start your first habit ⚡"
              : `Total XP: ${totalXP} • Completed: ${completed}/${habits.length}`}
          </div>
        </div>
      </section>

      <footer>
        <div className="section-inner">Keep grinding. XP never sleeps.</div>
      </footer>
    </>
  );
}

/* ADD FORM */

function AddHabitForm({ onAdd }) {
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
  );
}

/* HABIT ITEM */

function HabitItem({ habit, onDelete, onIncrement, onDecrement }) {
  const percent = Math.round((habit.progress / habit.target) * 100);
  const leveledUp = habit.progress === habit.target;

  return (
    <div className="habit">
      <div className="habit-header">
        <span className="habit-title">{habit.title}</span>
        <span className="xp-label">
          {habit.progress} / {habit.target} XP
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {leveledUp && <div className="level-up">QUEST COMPLETED 🎉</div>}

      <div className="habit-actions">
        <button className="btn-secondary" onClick={() => onDecrement(habit.id)}>
          −
        </button>

        <button className="btn-secondary" onClick={() => onIncrement(habit.id)}>
          +
        </button>

        <button className="btn-danger" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
