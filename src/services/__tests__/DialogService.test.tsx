import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DialogProvider, useDialog } from '../DialogService';
import { act } from 'react-dom/test-utils';

// Test component that uses the dialog service
function TestComponent({ onDialogResult }: { onDialogResult: (result: boolean) => void }) {
  const { showConfirmDialog } = useDialog();

  const handleClick = async () => {
    const result = await showConfirmDialog({
      title: "Test Dialog",
      message: "Test message",
      type: "confirm"
    });
    onDialogResult(result);
  };

  return <button onClick={handleClick}>Show Dialog</button>;
}

describe('DialogService', () => {
  beforeEach(() => {
    // Reset body style before each test
    document.body.style.overflow = '';
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent onDialogResult={() => {}} />);
    }).toThrow('useDialog must be used within a DialogProvider');

    consoleSpy.mockRestore();
  });

  it('should render dialog when triggered', async () => {
    render(
      <DialogProvider>
        <TestComponent onDialogResult={() => {}} />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Show Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  it('should resolve with true when confirmed', async () => {
    const onDialogResult = jest.fn();

    render(
      <DialogProvider>
        <TestComponent onDialogResult={onDialogResult} />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Show Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(onDialogResult).toHaveBeenCalledWith(true);
    });
  });

  it('should resolve with false when cancelled', async () => {
    const onDialogResult = jest.fn();

    render(
      <DialogProvider>
        <TestComponent onDialogResult={onDialogResult} />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Show Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(onDialogResult).toHaveBeenCalledWith(false);
    });
  });

  it('should resolve with false when clicking outside', async () => {
    const onDialogResult = jest.fn();

    render(
      <DialogProvider>
        <TestComponent onDialogResult={onDialogResult} />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Show Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    // Click the backdrop (the semi-transparent overlay)
    const backdrop = screen.getByTestId('dialog-backdrop');
    fireEvent.click(backdrop);

    await waitFor(() => {
      expect(onDialogResult).toHaveBeenCalledWith(false);
    });
  });

  it('should support custom button labels', async () => {
    function CustomLabelsComponent() {
      const { showConfirmDialog } = useDialog();
  
      const handleClick = () => {
        showConfirmDialog({
          title: "Custom Labels",
          message: "Test message",
          confirmLabel: "Yes, do it",
          cancelLabel: "No, go back"
        });
      };
  
      return <button onClick={handleClick}>Show Dialog</button>;
    }

    render(
      <DialogProvider>
        <CustomLabelsComponent />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Show Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Yes, do it')).toBeInTheDocument();
      expect(screen.getByText('No, go back')).toBeInTheDocument();
    });
  });

  it('should prevent body scroll when dialog is open', async () => {
    render(
      <DialogProvider>
        <TestComponent onDialogResult={() => {}} />
      </DialogProvider>
    );

    expect(document.body.style.overflow).toBe('');

    fireEvent.click(screen.getByText('Show Dialog'));

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  it('should support multiple dialogs in sequence', async () => {
    function MultipleDialogsComponent() {
      const { showConfirmDialog } = useDialog();
  
      const handleClick = async () => {
        await showConfirmDialog({
          title: "First Dialog",
          message: "First message"
        });
        
        await showConfirmDialog({
          title: "Second Dialog",
          message: "Second message"
        });
      };
  
      return <button onClick={handleClick}>Show Dialogs</button>;
    }

    render(
      <DialogProvider>
        <MultipleDialogsComponent />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Show Dialogs'));

    // First dialog
    await waitFor(() => {
      expect(screen.getByText('First Dialog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Confirm'));

    // Second dialog
    await waitFor(() => {
      expect(screen.getByText('Second Dialog')).toBeInTheDocument();
    });
  });
}); 