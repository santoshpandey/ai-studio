// components/GenerationHistory.tsx
"use client";
import { GenerationResponse } from '../../types/types';

interface GenerationHistoryProps {
  items: GenerationResponse[];
  onItemClick: (item: GenerationResponse) => void;
}

export const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  items,
  onItemClick
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Generations</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="text-left bg-white rounded-lg shadow p-3 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={item.imageUrl}
              alt="Generated result"
              className="w-full h-24 object-cover rounded-md mb-2"
            />
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.prompt}
            </p>
            <p className="text-xs text-gray-500">{item.style}</p>
            <p className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};