// components/ImageUpload.tsx
"use client";
import { useRef, useState } from 'react';
import { resizeImage, validateImageFile } from '../../utils/imageUtils';

interface ImageUploadProps {
  onImageChange: (dataUrl: string) => void;
  currentImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageChange,
  currentImage
}) => {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    try {
      let dataUrl = await resizeImage(file, 1920);
      onImageChange(dataUrl);
    } catch (err) {
      setError('Failed to process image');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
        aria-label="Upload image"
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Upload Image (PNG/JPG, max 10MB)
      </button>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {currentImage && (
        <div className="mt-4">
          <img
            src={currentImage}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};