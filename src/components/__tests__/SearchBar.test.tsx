import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Search by Order ID or Customer Name" value="" onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText('Search by Order ID or Customer Name')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays the value provided', () => {
    render(<SearchBar value="test query" onChange={jest.fn()} />);
    
    const input = screen.getByDisplayValue('test query');
    expect(input).toBeInTheDocument();
  });
}); 