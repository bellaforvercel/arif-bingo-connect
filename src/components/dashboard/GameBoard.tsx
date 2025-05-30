
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BingoGrid } from "@/components/game/BingoGrid";

export const GameBoard = () => {
  const [gameSettings, setGameSettings] = useState({
    betAmount: '10',
    winningPattern: 'All',
    callSpeed: '3 seconds',
    audioEnabled: true,
    audioType: 'Double Call Male'
  });

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Game Board</h1>
        <div className="text-orange-400 font-semibold">Wallet: ***** Birr 👁</div>
      </div>

      {/* Game Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm">Bet Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={gameSettings.betAmount}
              onChange={(e) => setGameSettings(prev => ({ ...prev, betAmount: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm">Winning Pattern(s)</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={gameSettings.winningPattern} onValueChange={(value) => setGameSettings(prev => ({ ...prev, winningPattern: value }))}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Full House">Full House</SelectItem>
                <SelectItem value="1 Line">1 Line</SelectItem>
                <SelectItem value="4 Corners">4 Corners</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm">Call Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={gameSettings.callSpeed} onValueChange={(value) => setGameSettings(prev => ({ ...prev, callSpeed: value }))}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="3 seconds">3 seconds</SelectItem>
                <SelectItem value="5 seconds">5 seconds</SelectItem>
                <SelectItem value="7 seconds">7 seconds</SelectItem>
                <SelectItem value="10 seconds">10 seconds</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm">Audio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className={`w-full ${gameSettings.audioEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
              onClick={() => setGameSettings(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }))}
            >
              🔊 Audio
            </Button>
            <div className="text-gray-400 text-xs">Option not available</div>
          </CardContent>
        </Card>
      </div>

      {/* Number Selection Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-white">
            <input type="checkbox" className="rounded" />
            <span>Select All</span>
          </label>
          <Button className="bg-orange-500 hover:bg-orange-600">⭐</Button>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">Print Cards</Button>
          <Button className="bg-green-600 hover:bg-green-700">Updates</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">🔄 Reload</Button>
        </div>
      </div>

      {/* Bingo Number Grid */}
      <BingoGrid selectedNumbers={selectedNumbers} onNumberToggle={(num) => {
        setSelectedNumbers(prev => 
          prev.includes(num) 
            ? prev.filter(n => n !== num)
            : [...prev, num]
        );
      }} />

      {/* Play Button */}
      <div className="flex justify-center">
        <Button 
          className="bg-gray-600 hover:bg-gray-700 text-white px-12 py-4 text-lg rounded-full"
          disabled={selectedNumbers.length === 0}
        >
          PLAY Bingo! 🎲
        </Button>
      </div>
    </div>
  );
};
