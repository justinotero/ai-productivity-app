import { ConfirmDialog } from './ConfirmDialog';

interface DeleteButtonProps {
  selectedCount: number;
  onDelete: () => void;
  isDialogOpen: boolean;
  onCloseDialog: () => void;
  onOpenDialog: () => void;
  itemName?: string;
}

export function DeleteButton({
  selectedCount,
  onDelete,
  isDialogOpen,
  onCloseDialog,
  onOpenDialog,
  itemName = 'item',
}: DeleteButtonProps) {
  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
        <button 
          onClick={onOpenDialog}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-lg transition-colors"
        >
          Delete {selectedCount} {selectedCount === 1 ? itemName : `${itemName}s`}
        </button>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={onCloseDialog}
        onConfirm={onDelete}
        title="Delete"
        message={`Are you sure you want to delete ${selectedCount} ${
          selectedCount === 1 ? itemName : `${itemName}s`
        }?`}
      />
    </>
  );
} 