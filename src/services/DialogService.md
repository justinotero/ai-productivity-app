# Dialog Service

The Dialog Service provides a centralized way to manage dialog interactions in the application. It uses React Context to make dialog functionality available throughout the application and provides a promise-based API for handling dialog confirmations.

## Features

- Centralized dialog management
- Promise-based API for handling confirmations
- Support for different dialog types (delete, confirm, warning)
- Customizable dialog options
- TypeScript support with full type safety

## Installation

The Dialog Service is built into the application. To use it, you need to:

1. Wrap your application with the `DialogProvider`:

```tsx
import { DialogProvider } from '@/services/DialogService';

function App() {
  return (
    <DialogProvider>
      {/* Your app components */}
    </DialogProvider>
  );
}
```

## Usage

### Basic Usage

```tsx
import { useDialog } from '@/services/DialogService';

function MyComponent() {
  const { showConfirmDialog } = useDialog();

  const handleAction = async () => {
    const confirmed = await showConfirmDialog({
      title: "Confirm Action",
      message: "Are you sure you want to proceed?",
    });

    if (confirmed) {
      // Handle confirmation
    }
  };

  return <button onClick={handleAction}>Perform Action</button>;
}
```

### Delete Confirmation Example

```tsx
const handleDelete = async () => {
  const confirmed = await showConfirmDialog({
    title: "Delete Item",
    message: "Are you sure you want to delete this item?",
    type: "delete",
    confirmLabel: "Delete",
    cancelLabel: "Cancel"
  });

  if (confirmed) {
    // Perform deletion
  }
};
```

## API Reference

### DialogProvider

The root component that provides dialog functionality to the application.

```tsx
<DialogProvider>
  {/* Your app components */}
</DialogProvider>
```

### useDialog Hook

A hook that provides access to the dialog functionality.

Returns:
- `showConfirmDialog`: Function to show a confirmation dialog

### DialogOptions

Interface for configuring dialog appearance and behavior.

```typescript
interface DialogOptions {
  title: string;          // Dialog title
  message: string;        // Dialog message
  confirmLabel?: string;  // Text for confirm button (optional)
  cancelLabel?: string;   // Text for cancel button (optional)
  type?: 'delete' | 'confirm' | 'warning';  // Dialog type (optional)
  icon?: ReactNode;       // Custom icon (optional)
}
```

### showConfirmDialog

Function to display a confirmation dialog.

```typescript
function showConfirmDialog(options: DialogOptions): Promise<boolean>
```

Parameters:
- `options`: DialogOptions object

Returns:
- Promise that resolves to `true` if confirmed, `false` if cancelled

## Examples

### Warning Dialog

```tsx
const confirmed = await showConfirmDialog({
  title: "Warning",
  message: "This action cannot be undone",
  type: "warning",
  confirmLabel: "Proceed",
  cancelLabel: "Go Back"
});
```

### Custom Icon Dialog

```tsx
const confirmed = await showConfirmDialog({
  title: "Custom Dialog",
  message: "Dialog with custom icon",
  icon: <CustomIcon />,
  type: "confirm"
});
```

## Integration with useDelete Hook

The Dialog Service is integrated with the `useDelete` hook for handling delete confirmations:

```tsx
const { handleDelete } = useDelete({
  onDelete: deleteItems,
  itemName: 'item'
});

// handleDelete will automatically show a confirmation dialog
await handleDelete();
```

## Best Practices

1. Always wrap your application with `DialogProvider` at a high level
2. Use the `useDialog` hook within functional components
3. Handle both confirmation and cancellation cases
4. Provide clear and descriptive messages
5. Use appropriate dialog types for different actions
6. Consider using custom labels for better UX

## Error Handling

The `useDialog` hook will throw an error if used outside of a `DialogProvider`. Always ensure your components are wrapped with `DialogProvider`. 