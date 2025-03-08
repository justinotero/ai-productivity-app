'use client';

import { Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
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

  if (!isOpen || !mounted) return null;

  const dialog = (
    <div className="relative">
      <div 
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />
      <div 
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 9999 }}
      >
        <div 
          className="bg-white rounded-2xl shadow-lg w-[400px] max-w-[90vw] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="px-8 py-10 space-y-6 text-center">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
            </div>

            {/* Title and Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-[--text-secondary]">{message}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={onClose}
                className="min-w-[120px] px-6 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="min-w-[120px] px-6 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
} 