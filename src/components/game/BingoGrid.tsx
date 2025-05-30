
interface BingoGridProps {
  selectedNumbers: number[];
  onNumberToggle: (num: number) => void;
}

export const BingoGrid = ({ selectedNumbers, onNumberToggle }: BingoGridProps) => {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-10 gap-2 p-4 bg-gray-800 rounded-lg">
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => onNumberToggle(num)}
          className={`
            w-12 h-12 rounded-full border-2 font-semibold transition-all hover:scale-105
            ${selectedNumbers.includes(num)
              ? 'bg-orange-500 border-orange-400 text-white'
              : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }
          `}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
