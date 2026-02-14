export default function Header({ level, rank, xpInLevel }) {
  return (
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
          <div className="global-xp-fill" style={{ width: `${xpInLevel}%` }} />
        </div>

        <div className="xp-label-global">
          {xpInLevel} / 100 XP to next level
        </div>
      </div>
    </header>
  );
}
