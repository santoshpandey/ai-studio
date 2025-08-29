// tests/components/StyleDropdown.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyleDropdown } from '../../app/components/StyleDropdown';

describe('StyleDropdown', () => {
  const mockOnChange = jest.fn();

  it('renders with all style options', () => {
    render(<StyleDropdown value="Editorial" onChange={mockOnChange} />);
    
    expect(screen.getByLabelText('Style')).toBeInTheDocument();
    expect(screen.getByText('Editorial')).toBeInTheDocument();
    expect(screen.getByText('Streetwear')).toBeInTheDocument();
    expect(screen.getByText('Vintage')).toBeInTheDocument();
  });

  it('calls onChange when a different option is selected', () => {
    render(<StyleDropdown value="Editorial" onChange={mockOnChange} />);
    
    const select = screen.getByLabelText('Style');
    fireEvent.change(select, { target: { value: 'Streetwear' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('Streetwear');
  });

  it('displays the current value', () => {
    render(<StyleDropdown value="Vintage" onChange={mockOnChange} />);
    
    const select = screen.getByLabelText('Style');
    expect(select).toHaveValue('Vintage');
  });
});