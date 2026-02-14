export default function HabitItem({
  habit,
  onDelete,
  onIncrement,
  onDecrement,
}) {
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
