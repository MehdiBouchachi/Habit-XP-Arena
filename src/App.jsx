/* STATIC DATA */

const habits = [
  {
    id: 1,
    title: "Morning Workout",
    target: 7,
    progress: 4,
  },
  {
    id: 2,
    title: "Read 20 Pages",
    target: 10,
    progress: 10,
  },
  {
    id: 3,
    title: "Drink 2L Water",
    target: 5,
    progress: 2,
  },
];

const RANKS = [
  { name: "Bronze", min: 0, color: "#cd7f32" },
  { name: "Silver", min: 200, color: "#c0c0c0" },
  { name: "Gold", min: 500, color: "#facc15" },
  { name: "Platinum", min: 900, color: "#22d3ee" },
  { name: "Diamond", min: 1500, color: "#38bdf8" },
];

/* STATIC CALCULATIONS */

const totalXP = habits.reduce((acc, h) => acc + h.progress, 0);
const level = Math.floor(totalXP / 100) + 1;
const xpInLevel = totalXP % 100;
const xpPercent = xpInLevel;

const rank = [...RANKS].reverse().find((r) => totalXP >= r.min) || RANKS[0];

/* UI ONLY APP */

export default function App() {
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

      {/* ADD SECTION  */}

      <section className="add-section">
        <div className="section-inner">
          <form>
            <input placeholder="New habit..." />
            <select>
              {[5, 7, 10, 14, 21].map((num) => (
                <option key={num}>{num} XP</option>
              ))}
            </select>
            <button className="btn-primary">Add Habit</button>
          </form>
        </div>
      </section>

      {/* ARENA */}

      <section className="arena">
        <div className="section-inner">
          <div className="filters">
            <button className="active">All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>

          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}

          <div className="stats">
            Total XP: {totalXP} • Completed:{" "}
            {habits.filter((h) => h.progress === h.target).length}/
            {habits.length}
          </div>
        </div>
      </section>

      <footer>
        <div className="section-inner">Keep grinding. XP never sleeps.</div>
      </footer>
    </>
  );
}

/* HABIT ITEM  */

function HabitItem({ habit }) {
  const percent = Math.round((habit.progress / habit.target) * 100);

  const completed = habit.progress === habit.target;

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

      {completed && <div className="level-up">QUEST COMPLETED 🎉</div>}

      <div className="habit-actions">
        <button className="btn-secondary">−</button>
        <button className="btn-secondary">+</button>
        <button className="btn-danger">Delete</button>
      </div>
    </div>
  );
}
