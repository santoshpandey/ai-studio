// tests/components/PromptInput.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PromptInput } from '../../app/components/PromptInput';

describe('PromptInput', () => {
  const mockOnChange = jest.fn();

  it('renders with label and textarea', () => {
    render(<PromptInput value="" onChange={mockOnChange} />);
    
    expect(screen.getByLabelText('Prompt')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe what you want to generate...')).toBeInTheDocument();
  });

  it('calls onChange when text is entered', () => {
    render(<PromptInput value="" onChange={mockOnChange} />);
    
    const textarea = screen.getByLabelText('Prompt');
    fireEvent.change(textarea, { target: { value: 'Test prompt' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('Test prompt');
  });

  it('displays the current value', () => {
    render(<PromptInput value="Current value" onChange={mockOnChange} />);
    
    const textarea = screen.getByLabelText('Prompt');
    expect(textarea).toHaveValue('Current value');
  });
});