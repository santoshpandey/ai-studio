// components/PromptInput.tsx
interface PromptInputProps {
  value: string;
  onChange: (prompt: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
        Prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        placeholder="Describe what you want to generate..."
        aria-describedby="prompt-description"
      />
      <p id="prompt-description" className="text-sm text-gray-500">
        Enter a detailed description of what you want to generate
      </p>
    </div>
  );
};