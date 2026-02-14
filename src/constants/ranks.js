export const RANKS = [
  { name: "Bronze", min: 0, color: "#cd7f32" },
  { name: "Silver", min: 200, color: "#c0c0c0" },
  { name: "Gold", min: 500, color: "#facc15" },
  { name: "Platinum", min: 900, color: "#22d3ee" },
  { name: "Diamond", min: 1500, color: "#38bdf8" },
];

export function getRank(totalXP) {
  return [...RANKS].reverse().find((rank) => totalXP >= rank.min);
}
