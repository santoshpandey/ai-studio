// tests/components/ImageUpload.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageUpload } from '../../app/components/ImageUpload';

// Mock the imageUtils
jest.mock('../../utils/imageUtils', () => ({
  validateImageFile: jest.fn(),
  resizeImage: jest.fn(),
}));

import { validateImageFile, resizeImage } from '../../utils/imageUtils';

describe('ImageUpload', () => {
  const mockOnImageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (validateImageFile as jest.Mock).mockReturnValue(null);
    (resizeImage as jest.Mock).mockResolvedValue('data:image/jpeg;base64,test');
  });

  it('renders upload button', () => {
    render(<ImageUpload onImageChange={mockOnImageChange} />);
    expect(screen.getByText('Upload Image (PNG/JPG, max 10MB)')).toBeInTheDocument();
  });

  it('shows error when file validation fails', () => {
    (validateImageFile as jest.Mock).mockReturnValue('Invalid file type');
    
    render(<ImageUpload onImageChange={mockOnImageChange} />);
    
    const fileInput = screen.getByLabelText('Upload image');
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(screen.getByText('Invalid file type')).toBeInTheDocument();
  });

  it('calls onImageChange with resized image when valid file is selected', async () => {
    render(<ImageUpload onImageChange={mockOnImageChange} />);
    
    const fileInput = screen.getByLabelText('Upload image');
    const file = new File([''], 'test.png', { type: 'image/png' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(resizeImage).toHaveBeenCalledWith(file, 1920);
      expect(mockOnImageChange).toHaveBeenCalledWith('data:image/jpeg;base64,test');
    });
  });

  it('displays current image when provided', () => {
    render(<ImageUpload onImageChange={mockOnImageChange} currentImage="test-image-url" />);
    expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'test-image-url');
  });
});