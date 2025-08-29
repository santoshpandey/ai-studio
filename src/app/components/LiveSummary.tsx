// components/LiveSummary.tsx
'use client';
import { GenerationRequest } from '../../types/types';

interface LiveSummaryProps {
  data: GenerationRequest;
}

export const LiveSummary: React.FC<LiveSummaryProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Live Summary</h3>
      {data.imageDataUrl && (
        <img
          src={data.imageDataUrl}
          alt="Preview"
          className="max-w-full h-32 object-cover rounded-md mb-3"
        />
      )}
      <p className="text-sm text-gray-700">
        <strong>Prompt:</strong> {data.prompt || 'None'}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Style:</strong> {data.style}
      </p>
    </div>
  );
};