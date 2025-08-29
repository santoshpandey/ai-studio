// tests/components/LiveSummary.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LiveSummary } from '../../app/components/LiveSummary';
import { GenerationRequest } from '../../types/types';

describe('LiveSummary', () => {
  const mockData: GenerationRequest = {
    imageDataUrl: 'test-image-url',
    prompt: 'Test prompt',
    style: 'Editorial',
  };

  it('renders with provided data', () => {
    render(<LiveSummary data={mockData} />);
    
    expect(screen.getByText('Live Summary')).toBeInTheDocument();
    expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'test-image-url');
    expect(screen.getByText('Test prompt')).toBeInTheDocument();
    expect(screen.getByText('Editorial')).toBeInTheDocument();
  });

  it('does not show image when no imageDataUrl is provided', () => {
    const dataWithoutImage = { ...mockData, imageDataUrl: '' };
    render(<LiveSummary data={dataWithoutImage} />);
    
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });
});