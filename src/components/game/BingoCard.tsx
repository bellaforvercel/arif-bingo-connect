
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BingoCardProps {
  card: {
    id: number;
    numbers: number[];
  };
}

export const BingoCard = ({ card }: BingoCardProps) => {
  const letters = ['B', 'I', 'N', 'G', 'O'];
  const gridNumbers = card.numbers.length === 25 ? card.numbers : [...card.numbers, ...Array(25 - card.numbers.length).fill('')];

  return (
    <Card className="bg-gradient-to-br from-yellow-200 to-yellow-300 border-yellow-400">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-orange-600 text-xl font-bold">ARIF BINGO</CardTitle>
        <div className="flex justify-center space-x-4">
          {letters.map((letter, index) => (
            <div key={letter} className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
              index === 0 ? 'bg-blue-500' :
              index === 1 ? 'bg-purple-500' :
              index === 2 ? 'bg-pink-500' :
              index === 3 ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {letter}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-1">
          {gridNumbers.map((num, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded ${
                index === 12 ? 'bg-green-500 text-white' : 'bg-yellow-100 text-gray-800'
              }`}
            >
              {index === 12 ? 'FREE' : num || ''}
            </div>
          ))}
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          Card No. {card.id}
        </div>
      </CardContent>
    </Card>
  );
};
