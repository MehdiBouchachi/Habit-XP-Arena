import HabitItem from "./HabitItem";

export default function HabitList({
  habits,
  onDelete,
  onIncrement,
  onDecrement,
}) {
  return (
    <>
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onDelete={onDelete}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </>
  );
}
