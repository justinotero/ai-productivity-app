import { useState } from 'react';
import { useDialog } from '@/services/DialogService';

interface UseDeleteOptions<T> {
  onDelete: (ids: string[]) => void;
  itemName?: string;
}

interface UseDeleteReturn {
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  handleDelete: () => void;
  clearSelection: () => void;
}

export function useDelete<T>({ onDelete, itemName = 'item' }: UseDeleteOptions<T>): UseDeleteReturn {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { showConfirmDialog } = useDialog();

  const toggleSelection = (id: string) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleDelete = async () => {
    const count = selectedIds.size;
    const confirmed = await showConfirmDialog({
      title: 'Delete',
      message: `Are you sure you want to delete ${count} ${count === 1 ? itemName : `${itemName}s`}?`,
      type: 'delete'
    });

    if (confirmed) {
      onDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  return {
    selectedIds,
    toggleSelection,
    handleDelete,
    clearSelection,
  };
} 