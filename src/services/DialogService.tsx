'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

// Types
interface DialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'delete' | 'confirm' | 'warning' | 'success';
  icon?: ReactNode;
  showCancel?: boolean;
}

interface DialogContextType {
  showConfirmDialog: (options: DialogOptions) => Promise<boolean>;
  showSuccessDialog: (options: Omit<DialogOptions, 'type' | 'showCancel'>) => Promise<boolean>;
}

// Context
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// Provider
export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    options: DialogOptions | null;
    resolve: ((value: boolean) => void) | null;
  }>({
    isOpen: false,
    options: null,
    resolve: null,
  });

  const showConfirmDialog = (options: DialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        options,
        resolve,
      });
    });
  };

  const showSuccessDialog = (options: Omit<DialogOptions, 'type' | 'showCancel'>): Promise<boolean> => {
    return showConfirmDialog({
      ...options,
      type: 'success',
      showCancel: false,
      confirmLabel: options.confirmLabel || 'OK'
    });
  };

  const handleClose = () => {
    if (dialogState.resolve) {
      dialogState.resolve(false);
    }
    setDialogState({
      isOpen: false,
      options: null,
      resolve: null,
    });
  };

  const handleConfirm = () => {
    if (dialogState.resolve) {
      dialogState.resolve(true);
    }
    setDialogState({
      isOpen: false,
      options: null,
      resolve: null,
    });
  };

  return (
    <DialogContext.Provider value={{ showConfirmDialog, showSuccessDialog }}>
      {children}
      {dialogState.isOpen && dialogState.options && (
        <ConfirmDialog
          isOpen={dialogState.isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title={dialogState.options.title}
          message={dialogState.options.message}
          confirmLabel={dialogState.options.confirmLabel}
          cancelLabel={dialogState.options.cancelLabel}
          type={dialogState.options.type}
          showCancel={dialogState.options.showCancel}
        />
      )}
    </DialogContext.Provider>
  );
}

// Hook
export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
} 