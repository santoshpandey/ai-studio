// tests/components/GenerationHistory.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GenerationHistory } from '../../app/components/GenerationHistory';
import { GenerationResponse } from '../../types/types';

describe('GenerationHistory', () => {
  const mockItems: GenerationResponse[] = [
    {
      id: '1',
      imageUrl: 'image1.jpg',
      prompt: 'Prompt 1',
      style: 'Editorial',
      createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      imageUrl: 'image2.jpg',
      prompt: 'Prompt 2',
      style: 'Streetwear',
      createdAt: '2023-01-02T00:00:00.000Z',
    },
  ];

  const mockOnItemClick = jest.fn();

  it('renders nothing when items array is empty', () => {
    const { container } = render(<GenerationHistory items={[]} onItemClick={mockOnItemClick} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders history items when provided', () => {
    render(<GenerationHistory items={mockItems} onItemClick={mockOnItemClick} />);
    
    expect(screen.getByText('Recent Generations')).toBeInTheDocument();
    expect(screen.getByText('Prompt 1')).toBeInTheDocument();
    expect(screen.getByText('Prompt 2')).toBeInTheDocument();
    expect(screen.getByText('Editorial')).toBeInTheDocument();
    expect(screen.getByText('Streetwear')).toBeInTheDocument();
  });

  it('calls onItemClick when a history item is clicked', () => {
    render(<GenerationHistory items={mockItems} onItemClick={mockOnItemClick} />);
    
    const firstItem = screen.getByText('Prompt 1').closest('button');
    fireEvent.click(firstItem!);
    
    expect(mockOnItemClick).toHaveBeenCalledWith(mockItems[0]);
  });
});