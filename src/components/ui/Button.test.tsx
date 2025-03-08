import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';
import { createRef } from 'react';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  describe('variants', () => {
    it('renders default variant with correct classes', () => {
      const { container } = render(<Button>Default Button</Button>);
      expect(container.firstChild).toHaveClass('bg-[--primary]', 'text-white');
    });

    it('renders outline variant with correct classes', () => {
      const { container } = render(<Button variant="outline">Outline Button</Button>);
      expect(container.firstChild).toHaveClass('border', 'border-[--border-color]', 'bg-transparent');
    });

    it('renders ghost variant with correct classes', () => {
      const { container } = render(<Button variant="ghost">Ghost Button</Button>);
      expect(container.firstChild).toHaveClass('hover:bg-[--background-hover]');
      expect(container.firstChild).not.toHaveClass('bg-[--primary]', 'border');
    });
  });

  describe('states', () => {
    it('applies disabled styles when disabled', () => {
      const { container } = render(<Button disabled>Disabled Button</Button>);
      const button = container.firstChild as HTMLElement;
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none');
    });

    it('handles click events when not disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Clickable Button</Button>);
      
      fireEvent.click(screen.getByText('Clickable Button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not handle click events when disabled', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
      
      fireEvent.click(screen.getByText('Disabled Button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('merges custom className with default classes', () => {
      const { container } = render(<Button className="custom-class">Custom Button</Button>);
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('inline-flex', 'items-center');
    });

    it('applies focus styles', () => {
      const { container } = render(<Button>Focus Button</Button>);
      expect(container.firstChild).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[--ring]'
      );
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe('Ref Button');
    });
  });
}); 