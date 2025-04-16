'use client';

import { Trash2, X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'delete' | 'confirm' | 'warning' | 'success';
  showCancel?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'confirm',
  showCancel = true,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getIconStyles = () => {
    switch (type) {
      case 'delete':
        return {
          bgColor: 'bg-red-50',
          iconColor: 'text-red-400',
          icon: <Trash2 className="w-8 h-8" />
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          iconColor: 'text-green-400',
          icon: <Check className="w-8 h-8" />
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-400',
          icon: <Check className="w-8 h-8" />
        };
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-500 hover:bg-red-600';
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  if (!isOpen || !mounted) return null;

  const { bgColor, iconColor, icon } = getIconStyles();
  const buttonStyle = getButtonStyles();

  const dialog = (
    <div className="relative">
      <div 
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: 9998 }}
        onClick={onClose}
        data-testid="dialog-backdrop"
      />
      <div 
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 9999 }}
      >
        <div 
          className="bg-white rounded-2xl shadow-lg w-[400px] max-w-[90vw] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {showCancel && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[--text-secondary] hover:text-[--text-primary] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="px-8 py-10 space-y-6 text-center">
            {/* Icon */}
            <div className="flex justify-center">
              <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center`}>
                <div className={iconColor}>
                  {icon}
                </div>
              </div>
            </div>

            {/* Title and Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-[--text-secondary]">{message}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-4">
              {showCancel && (
                <button
                  onClick={onClose}
                  className="min-w-[120px] px-6 py-3 text-sm font-medium rounded-lg bg-[--background-hover] hover:bg-[--background-sidebar] transition-colors"
                >
                  {cancelLabel}
                </button>
              )}
              <button
                onClick={onConfirm}
                className={`min-w-[120px] px-6 py-3 text-sm font-medium text-white ${buttonStyle} rounded-lg transition-colors`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
} 