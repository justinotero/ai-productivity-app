import { useState } from 'react';

interface UseDeleteOptions<T> {
  onDelete: (ids: string[]) => void;
  itemName?: string;
}

interface UseDeleteReturn {
  selectedIds: Set<string>;
  isDeleteDialogOpen: boolean;
  toggleSelection: (id: string) => void;
  handleDelete: () => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
  clearSelection: () => void;
}

export function useDelete<T>({ onDelete, itemName = 'item' }: UseDeleteOptions<T>): UseDeleteReturn {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleSelection = (id: string) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleDelete = () => {
    onDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
    setIsDeleteDialogOpen(false);
  };

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const clearSelection = () => setSelectedIds(new Set());

  return {
    selectedIds,
    isDeleteDialogOpen,
    toggleSelection,
    handleDelete,
    openDeleteDialog,
    closeDeleteDialog,
    clearSelection,
  };
} 