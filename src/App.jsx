import { useState, useEffect } from "react";
import { getRank } from "./constants/ranks";

import Header from "./components/Header";
import Filters from "./components/Filters";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";

export default function App() {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("xp-habits");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("xp-habits", JSON.stringify(habits));
  }, [habits]);

  const totalXP = habits.reduce((acc, h) => acc + h.progress, 0);
  const level = Math.floor(totalXP / 100) + 1;
  const xpInLevel = totalXP % 100;
  const rank = getRank(totalXP);

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

  return (
    <>
      <Header
        level={level}
        rank={rank}
        totalXP={totalXP}
        xpInLevel={xpInLevel}
      />

      <AddHabitForm onAdd={addHabit} />

      <section className="arena">
        <div className="section-inner">
          <Filters filter={filter} setFilter={setFilter} />

          <HabitList
            habits={filtered}
            onDelete={deleteHabit}
            onIncrement={increment}
            onDecrement={decrement}
          />
        </div>
      </section>

      <footer>
        <div className="section-inner">Keep grinding. XP never sleeps.</div>
      </footer>
    </>
  );
}
