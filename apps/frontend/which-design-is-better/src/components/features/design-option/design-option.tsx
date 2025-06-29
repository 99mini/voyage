import type { DesignOptionSchema } from '@/apis/vote/model';

interface DesignOptionProps {
  option: DesignOptionSchema;
  votes: number;
  totalVotes: number;
  selected?: boolean;
  onClick: () => void;
  showResults: boolean;
}

const DesignOption = ({ option, votes, totalVotes, selected = false, onClick, showResults }: DesignOptionProps) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={option.imageUrl}
          alt={option.description}
          className="w-full h-auto rounded"
          width={option.size.width}
          height={option.size.height}
        />

        {showResults && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
            <div className="text-4xl font-bold">{percentage}%</div>
            <div className="text-sm">{votes} 표</div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="font-medium">{option.description}</h3>
      </div>

      {showResults && (
        <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full" style={{ width: `${percentage}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default DesignOption;
