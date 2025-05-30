
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Reports = () => {
  const gameStats = [
    { date: "5/23/2025, 12:17:41 AM", bets: "10 Birr", players: 3, status: "✅", total: "30 Birr", percent: "20%", profit: "6 Birr", paid: "24 Birr", winner: "45", calls: "43" },
    { date: "5/23/2025, 12:14:08 AM", bets: "10 Birr", players: 3, status: "✅", total: "30 Birr", percent: "20%", profit: "6 Birr", paid: "24 Birr", winner: "45", calls: "46" },
    { date: "5/23/2025, 12:09:46 AM", bets: "10 Birr", players: 3, status: "✅", total: "30 Birr", percent: "20%", profit: "6 Birr", paid: "24 Birr", winner: "33, 30, 45", calls: "57" },
  ];

  const profitReport = [
    { date: "April 24, 2025", profit: "818 Birr", games: 28 },
    { date: "April 25, 2025", profit: "788 Birr", games: 38 },
    { date: "April 26, 2025", profit: "812 Birr", games: 27 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Reports</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎮</div>
              <div>
                <div className="text-orange-400 text-sm">30-Day Games</div>
                <div className="text-2xl font-bold text-white">943</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">💰</div>
              <div>
                <div className="text-orange-400 text-sm">Wallet Balance</div>
                <div className="text-2xl font-bold text-green-400">***** Birr 👁</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">📊</div>
              <div>
                <div className="text-orange-400 text-sm">Lifetime Games</div>
                <div className="text-2xl font-bold text-white">2,316</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="text-orange-400 text-sm">Your Rank</div>
                <div className="text-2xl font-bold text-white">N/A</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Game Statistics Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400">Game Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-2 text-gray-300">Date</th>
                  <th className="text-left p-2 text-gray-300">$ Bets</th>
                  <th className="text-left p-2 text-gray-300">👥 Players</th>
                  <th className="text-left p-2 text-gray-300">✓ Status</th>
                  <th className="text-left p-2 text-gray-300">📊 Total</th>
                  <th className="text-left p-2 text-gray-300">📈 %</th>
                  <th className="text-left p-2 text-gray-300">💰 Profit</th>
                  <th className="text-left p-2 text-gray-300">$ Paid</th>
                  <th className="text-left p-2 text-gray-300">👁 Winner</th>
                  <th className="text-left p-2 text-gray-300">📞 Calls</th>
                </tr>
              </thead>
              <tbody>
                {gameStats.map((stat, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2 text-white">{stat.date}</td>
                    <td className="p-2 text-white">{stat.bets}</td>
                    <td className="p-2 text-white">{stat.players}</td>
                    <td className="p-2">{stat.status}</td>
                    <td className="p-2 text-white">{stat.total}</td>
                    <td className="p-2 text-white">{stat.percent}</td>
                    <td className="p-2 text-white">{stat.profit}</td>
                    <td className="p-2 text-white">{stat.paid}</td>
                    <td className="p-2 text-white">{stat.winner}</td>
                    <td className="p-2 text-white">{stat.calls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Profit Report */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-white">Date</th>
                  <th className="text-left p-4 text-white">Profit</th>
                  <th className="text-left p-4 text-white">Games Played</th>
                </tr>
              </thead>
              <tbody>
                {profitReport.map((report, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-4 text-white">{report.date}</td>
                    <td className="p-4 text-green-400">{report.profit}</td>
                    <td className="p-4 text-blue-400">{report.games}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
