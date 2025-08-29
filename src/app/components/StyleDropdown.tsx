// components/StyleDropdown.tsx
import { StyleOption } from '../../types/types';

interface StyleDropdownProps {
  value: string;
  onChange: (style: StyleOption) => void;
}

const styleOptions: StyleOption[] = ['Editorial', 'Streetwear', 'Vintage'];

export const StyleDropdown: React.FC<StyleDropdownProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="style" className="block text-sm font-medium text-gray-700">
        Style
      </label>
      <select
        id="style"
        value={value}
        onChange={(e) => onChange(e.target.value as StyleOption)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        aria-describedby="style-description"
      >
        {styleOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p id="style-description" className="text-sm text-gray-500">
        Choose the style for your generation
      </p>
    </div>
  );
};