export default function LeaderboardPage() {
  const players = [
    { name: "Ava", xp: 4320, streak: 18 },
    { name: "Mason", xp: 3950, streak: 15 },
    { name: "You", xp: 1260, streak: 7 },
    { name: "Nia", xp: 980, streak: 6 },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Leaderboard</p>
        <h1 className="text-3xl font-bold text-white">Top learners this week</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.12em] text-gray-400">
            <tr>
              <th className="px-5 py-3">Rank</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">XP</th>
              <th className="px-5 py-3">Streak</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.name} className="border-t border-white/10">
                <td className="px-5 py-4 text-white">#{index + 1}</td>
                <td className="px-5 py-4 text-white">{player.name}</td>
                <td className="px-5 py-4">{player.xp}</td>
                <td className="px-5 py-4">🔥 {player.streak} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
