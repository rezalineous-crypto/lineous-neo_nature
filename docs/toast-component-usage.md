# Toast Component — Implementation Manual

## Overview

The `Toast` component (`components/ui/Toast.tsx`) provides a unified notification system for the Neo Nature project. It replaces browser default `alert()`, `confirm()`, and `prompt()` dialogs with styled, theme-aware alternatives that match the site's visual design.

## What It Exports

### Provider

| Export | Type | Description |
|--------|------|-------------|
| `ToastProvider` | Component | Wraps your app (or a subtree) to enable toast functionality |

### Hook

| Export | Type | Description |
|--------|------|-------------|
| `useToast()` | Hook | Returns toast and dialog functions for use in client components |

### Imperative API (global, no provider needed)

| Export | Type | Description |
|--------|------|-------------|
| `showToast(type, message)` | Function | Show a toast of given type |
| `showSuccess(message)` | Function | Show a success toast |
| `showError(message)` | Function | Show an error toast |
| `showInfo(message)` | Function | Show an info toast |
| `showAlert(message)` | Function | Show a styled alert dialog, returns `Promise<void>` |
| `showConfirm(message)` | Function | Show a styled confirm dialog, returns `Promise<boolean>` |

## Setup

### 1. Wrap your app with `ToastProvider`

In `app/layout.tsx`, wrap the tree with `<ToastProvider>`:

```tsx
import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 2. Use `useToast()` in client components

```tsx
"use client";

import { useToast } from "@/components/ui/Toast";

export default function MyComponent() {
  const { success, error, info, alert, confirm } = useToast();

  const handleSave = async () => {
    const res = await fetch("/api/something", { method: "POST" });
    if (res.ok) {
      success("Saved successfully!");
    } else {
      error("Failed to save");
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirm("Are you sure you want to delete this?");
    if (confirmed) {
      // proceed with deletion
      success("Deleted!");
    }
  };

  return (
    <button onClick={handleSave}>Save</button>
  );
}
```

### 3. Use the imperative API (no provider needed)

For use outside of a `ToastProvider` context (e.g., in utility functions or non-React code):

```tsx
import { showSuccess, showError, showAlert, showConfirm } from "@/components/ui/Toast";

// These work without a provider once the ToastProvider is mounted in the app
showSuccess("Operation completed");
showError("Something went wrong");

const ok = await showAlert("This is important");
const yes = await showConfirm("Are you sure?");
```

## Toast Types

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| `success` | Emerald green | Checkmark | Successful operations, saves, confirmations |
| `error` | Red | X mark | Failed operations, validation errors |
| `info` | Chrome blue (site accent) | Info circle | General information, loading states |

## Styling

The toast component uses the site's existing design tokens:

- **Background**: `bg-void` (dark) / `bg-graphite` (light theme)
- **Text**: `text-bone` (primary), `text-haze` (muted)
- **Accent**: `text-chrome1` for info toasts
- **Borders**: `border-line` with type-specific accent borders
- **Rounded corners**: `rounded-xl` for toasts, `rounded-2xl` for dialogs
- **Backdrop**: `backdrop-blur-md` / `backdrop-blur-xl` for glass effect
- **Font**: Space Grotesk (display), JetBrains Mono (mono labels)

## Dialog Behavior

### `alert(message)`
- Shows a modal overlay with a message and an "OK" button
- Returns a `Promise<void>` that resolves when the user clicks OK
- Replaces `window.alert()`

### `confirm(message)`
- Shows a modal overlay with a message, "Cancel" and "Confirm" buttons
- Returns a `Promise<boolean>` — `true` if confirmed, `false` if cancelled
- Replaces `window.confirm()`

## Examples

### API call with success/error feedback

```tsx
"use client";
import { useToast } from "@/components/ui/Toast";

export default function SaveButton() {
  const { success, error } = useToast();

  const handleClick = async () => {
    try {
      const res = await fetch("/api/data", { method: "POST", body: JSON.stringify({ key: "value" }) });
      if (res.ok) {
        success("Data saved successfully");
      } else {
        const err = await res.json();
        error(err.message || "Save failed");
      }
    } catch {
      error("Network error");
    }
  };

  return <button onClick={handleClick}>Save</button>;
}
```

### Destructive action with confirmation

```tsx
"use client";
import { useToast } from "@/components/ui/Toast";

export default function DeleteButton() {
  const { success, error, confirm } = useToast();

  const handleDelete = async () => {
    const ok = await confirm("This action cannot be undone. Delete this item?");
    if (!ok) return;

    try {
      const res = await fetch("/api/item/123", { method: "DELETE" });
      if (res.ok) {
        success("Item deleted");
      } else {
        error("Failed to delete");
      }
    } catch {
      error("Network error");
    }
  };

  return <button onClick={handleDelete} className="text-red-400">Delete</button>;
}
```

## Notes

- Toasts auto-dismiss after 4 seconds
- The toast container is positioned at the top-right corner (`fixed top-4 right-4`)
- Maximum width is 420px, responsive to viewport
- The portal renders into `document.body` for proper z-index stacking
- SSR-safe: portal content is only rendered on the client (`typeof document !== "undefined"`)
