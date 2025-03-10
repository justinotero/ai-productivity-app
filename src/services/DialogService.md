# Dialog Service

The Dialog Service provides a centralized way to manage dialog interactions in the application. It uses React Context to make dialog functionality available throughout the application and provides a promise-based API for handling dialog confirmations.

## Overview
A flexible and reusable dialog service that handles various types of dialogs (confirmation, delete, success, warning) with consistent styling and behavior. The service uses React Context for global accessibility and provides a promise-based API for handling dialog interactions.

## List of Contributors
1. Justin Otero (@justinotero) - Initial implementation and testing

## Contributing Guidelines

### Before Making Changes
1. Ensure you have the latest code from the main branch
2. Review existing dialog implementations to maintain consistency
3. Run existing tests to ensure current functionality works

### Testing Requirements
1. Write tests for any new dialog types or features
2. Cover both positive and negative interaction paths
3. Test styling and accessibility features
4. Ensure proper cleanup of dialogs
5. Test body scroll locking behavior

## Key Features
- Centralized dialog management through React Context
- Promise-based API for handling confirmations
- Support for multiple dialog types (delete, confirm, warning, success)
- Customizable dialog options and styling
- Automatic body scroll locking
- TypeScript support with full type safety
- Proper cleanup and state management

## Implementation Details

### Core Components
1. `DialogProvider`: Context provider component
2. `ConfirmDialog`: Base dialog component
3. `useDialog`: Custom hook for dialog interactions

### State Management
```typescript
interface DialogState {
  isOpen: boolean;
  options: DialogOptions | null;
  resolve: ((value: boolean) => void) | null;
}
```

### Type System
```typescript
interface DialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'delete' | 'confirm' | 'warning' | 'success';
  icon?: ReactNode;
  showCancel?: boolean;
}
```

## Dependencies
- React (^18.2.0)
- React DOM (^18.2.0)
- Lucide React (for icons)
- TypeScript (for type safety)

## Core Functionality and Flows

### Dialog Creation Flow
1. Component calls `useDialog` hook
2. Invokes `showConfirmDialog` or `showSuccessDialog`
3. Dialog state is updated
4. Dialog renders with specified options
5. User interaction resolves the promise
6. Dialog state is cleaned up

### State Management Flow
1. Dialog state is managed by `DialogProvider`
2. State updates trigger re-renders
3. Promise resolution handles async flow
4. Cleanup occurs after dialog closes

## Usage

### Basic Confirmation Dialog
```typescript
const { showConfirmDialog } = useDialog();

const result = await showConfirmDialog({
  title: "Confirm Action",
  message: "Are you sure you want to proceed?",
  type: "confirm"
});
```

### Success Dialog
```typescript
const { showSuccessDialog } = useDialog();

await showSuccessDialog({
  title: "Success",
  message: "Action completed successfully",
  confirmLabel: "OK"
});
```

### Delete Confirmation
```typescript
const { showConfirmDialog } = useDialog();

const confirmed = await showConfirmDialog({
  title: "Delete Item",
  message: "This action cannot be undone",
  type: "delete",
  confirmLabel: "Delete",
  cancelLabel: "Cancel"
});
```

## Important Notes
1. Always wrap your application with `DialogProvider`
2. Handle both success and error cases when using promises
3. Consider accessibility when customizing dialogs
4. Be mindful of z-index when multiple dialogs are possible
5. Clean up any subscriptions or effects

## Debugging and Troubleshooting

### Common Issues
1. Dialog not showing
   - Check if `DialogProvider` is present in the component tree
   - Verify dialog options are correct

2. Promise not resolving
   - Ensure proper error handling
   - Check if dialog is being closed properly

3. Styling issues
   - Verify correct type is being passed
   - Check for CSS conflicts

### Getting Help
1. Check the test files for usage examples
2. Review the TypeScript types for proper usage
3. Consult the React Context documentation
4. File an issue with:
   - Reproduction steps
   - Expected behavior
   - Actual behavior
   - Code sample 