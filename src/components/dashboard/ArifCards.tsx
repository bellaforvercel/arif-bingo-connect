
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BingoCard } from "@/components/game/BingoCard";

export const ArifCards = () => {
  const [cards] = useState([
    { id: 1, numbers: [12, 17, 32, 58, 69, 11, 26, 35, 52, 71, 7, 20, 0, 51, 67, 2, 21, 31, 47, 62, 9, 25, 39, 55, 61] },
    { id: 2, numbers: [11, 26, 32, 48, 73, 15, 17, 42, 47, 72, 2, 22, 0, 59, 66, 9, 30, 43, 50, 68, 7, 18, 44, 54, 61] },
    { id: 3, numbers: [4, 28, 38, 60, 75, 11, 19, 45, 59, 63, 12, 30, 0, 50, 73, 2, 27, 34, 58, 66, 7, 17, 43, 56, 68] },
    { id: 4, numbers: [3, 25, 40, 47, 65, 1, 25, 32, 50, 72, 13, 30, 42, 47, 70] },
    { id: 5, numbers: [1, 25, 32, 50, 72, 13, 30, 42, 47, 70] },
    { id: 6, numbers: [13, 30, 42, 47, 70] }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">ARIF Cards</h1>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">Print Cards</Button>
          <Button className="bg-green-600 hover:bg-green-700">Updates</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">🔄 Reload</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <BingoCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
