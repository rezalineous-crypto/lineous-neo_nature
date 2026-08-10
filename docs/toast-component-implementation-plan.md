# Toast Component — Implementation Plan

## Overview

Create a custom Toast component that replaces the browser's native `alert()` and `confirm()` dialogs in the admin ROI page, while providing a reusable toast notification system usable anywhere in the project. The component will match the site's dark theme visual design (void background, chrome accents, rounded corners, Space Grotesk font) and render via a React portal.

---

## 1. Design System Reference

### Color Tokens (from `app/globals.css`)

| Token | Dark Value | Usage |
|---|---|---|
| `--color-void` | `#0A0A0C` | Primary background |
| `--color-graphite` | `#1A1A1E` | Card/surface background |
| `--color-line` | `#2A2A2F` | Borders, dividers |
| `--color-bone` | `#EDEDE8` | Primary text |
| `--color-haze` | `#9A9AA0` | Secondary/muted text |
| `--color-chrome1` | `#8EC5FF` | Primary chrome accent (info) |
| `--color-chrome2` | `#C9A9FF` | Secondary chrome accent |
| `--color-chrome3` | `#FF9EC4` | Tertiary chrome accent (error) |

### Typography

- **Display font**: `Space Grotesk` (`--font-display`) — used for headings and body
- **Mono font**: `JetBrains Mono` (`--font-mono`) — used for labels, captions, code

### Visual Patterns (from existing components)

- Rounded corners: `rounded-xl` (inputs/cards), `rounded-2xl` (panels), `rounded-full` (buttons)
- Chrome gradient: `linear-gradient(115deg, var(--color-chrome1), var(--color-chrome2), var(--color-chrome3))`
- Backdrop blur: `backdrop-blur-xl` with `bg-graphite/50` or `bg-void/50`
- Framer Motion for enter/exit animations (see `components/Tooltip.tsx`)
- Border: `border border-line`
- Transition timing: `cubic-bezier(0.16, 1, 0.3, 1)` (fluid ease)

---

## 2. Architecture

### File Structure

```
components/
  ui/
    Toast.tsx          — Main Toast component (portal renderer, toast stack)
    ToastProvider.tsx  — Context provider + state management
    useToast.ts        — Hook for imperative toast calls (success/error/info)
    useDialog.ts       — Hook for imperative alert/confirm calls
```

### Design Decisions

1. **Imperative API via context + event bus pattern**: Toast and dialog functions (`toast.success()`, `toast.error()`, `toast.info()`, `alert()`, `confirm()`) need to be callable from anywhere — including non-component code (event handlers, async callbacks). We'll use a React context that exposes a `showToast` function, backed by a state-managed queue.

2. **Single provider at root**: `ToastProvider` wraps the app in `app/layout.tsx` (inside `ThemeProvider`), so the portal target is always available.

3. **Portal rendering**: The toast container and modal dialogs render into a portal attached to `document.body`, ensuring they appear above all page content regardless of parent stacking contexts.

4. **Framer Motion**: Use `AnimatePresence` for toast enter/exit animations and modal fade/scale transitions, consistent with `Tooltip.tsx`.

5. **TypeScript**: Full type safety for toast types, dialog options, and return values.

---

## 3. Component Specifications

### 3.1 ToastProvider (`components/ui/ToastProvider.tsx`)

**Purpose**: Provides the toast and dialog context to the entire app. Manages the internal state of active toasts and the current dialog.

**State**:
- `toasts: ToastData[]` — array of active toast notifications
- `dialog: DialogState | null` — current modal dialog (alert or confirm)

**Context Value**:
```ts
interface ToastContextValue {
  toast: {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
  };
  alert: (message: string, options?: AlertOptions) => Promise<void>;
  confirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
}
```

**Rendering**:
- Renders a `ToastContainer` (portal) that maps over `toasts` with `AnimatePresence`
- Renders a `DialogOverlay` (portal) when `dialog` is not null
- Exposes `showToast`, `showAlert`, `showConfirm` functions via context

### 3.2 Toast Data Types

```ts
type ToastType = "success" | "error" | "info";

interface ToastOptions {
  duration?: number;       // auto-dismiss timeout in ms (default: 4000)
  title?: string;          // optional heading
  action?: {               // optional action button
    label: string;
    onClick: () => void;
  };
}

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration: number;
  action?: { label: string; onClick: () => void };
}
```

### 3.3 Dialog Types

```ts
type DialogType = "alert" | "confirm";

interface DialogState {
  id: string;
  type: DialogType;
  message: string;
  title?: string;
  confirmLabel?: string;   // default: "Confirm"
  cancelLabel?: string;    // default: "Cancel"
}

interface AlertOptions {
  title?: string;
  confirmLabel?: string;
}

interface ConfirmOptions {
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}
```

### 3.4 Toast Container & Individual Toast (`components/ui/Toast.tsx`)

**ToastContainer**:
- Fixed position: `fixed bottom-6 right-6 z-[100]`
- Flex column layout with gap
- Renders via `createPortal` into `document.body`

**Individual Toast**:
- Background: `bg-graphite/80` with `backdrop-blur-xl`
- Border: `border border-line`
- Accent border-left based on type:
  - success → `border-l-chrome1` (blue)
  - error → `border-l-chrome3` (pink/red)
  - info → `border-l-chrome2` (purple)
- Rounded: `rounded-2xl`
- Padding: `px-5 py-4`
- Layout: icon + content (title + message) + optional action button
- Icon: `lucide-react` icons (CheckCircle, XCircle, Info)
- Close button: small `X` icon in top-right
- Animation: slide up + fade in (framer motion), exit slide down + fade out
- Auto-dismiss after `duration` ms (default 4000)
- Font: `font-display` (Space Grotesk) for text, `font-mono` for labels

### 3.5 Dialog Overlay (Alert/Confirm)

**Overlay**:
- Fixed inset: `fixed inset-0 z-[100]`
- Background: `bg-void/60` with `backdrop-blur-sm`
- Centered: `flex items-center justify-center`

**Dialog Panel**:
- Background: `bg-graphite/90` with `backdrop-blur-xl`
- Border: `border border-line`
- Rounded: `rounded-2xl`
- Max width: `max-w-md w-full mx-4`
- Padding: `p-7`
- Layout:
  - Icon at top (exclamation for alert, question for confirm)
  - Title (optional)
  - Message body
  - Action buttons (Confirm/Cancel) at bottom
- Buttons:
  - Confirm: `rounded-full bg-chrome2 text-void font-bold` (purple gradient button)
  - Cancel: `rounded-full border border-line bg-void/50 text-haze`
- Animation: scale + fade in (framer motion)

### 3.6 useToast Hook (`components/ui/useToast.ts`)

```ts
export function useToast(): ToastContextValue
```

Returns the context value. Throws if used outside `ToastProvider`.

### 3.7 useDialog Hook (`components/ui/useDialog.ts`)

```ts
export function useDialog(): {
  alert: (message: string, options?: AlertOptions) => Promise<void>;
  confirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
}
```

Returns the dialog functions. Throws if used outside `ToastProvider`.

### 3.8 Convenience Exports

A single barrel file `components/ui/index.ts` (or direct exports from `ToastProvider.tsx`) will export:
- `ToastProvider`
- `useToast`
- `useDialog`
- `toast` — a standalone object with `success`, `error`, `info` methods that work via a module-level reference to the provider's internal functions (for use outside React components, e.g., in async callbacks)

---

## 4. Integration Steps

### Step 1: Create the Toast component files

1. Create `components/ui/Toast.tsx` — the visual toast + dialog components
2. Create `components/ui/ToastProvider.tsx` — context, provider, and state management
3. Create `components/ui/useToast.ts` — hook for toast calls
4. Create `components/ui/useDialog.ts` — hook for alert/confirm calls
5. Create `components/ui/index.ts` — barrel exports

### Step 2: Wire up the provider in the root layout

In `app/layout.tsx`:
- Import `ToastProvider`
- Wrap the app content inside `ThemeProvider` (so theme context is available)
- The provider renders the portal containers

### Step 3: Replace `confirm()` in the admin ROI page

In `app/admin/roi/page.tsx`:
- Import `useDialog` (or `useToast`)
- Replace the `confirm()` call on line 73 with `await confirm(...)`
- Replace the `message` state-based success/error feedback with `toast.success()` / `toast.error()` calls
- Remove the inline `message` display block (lines 192-202) since toasts now handle this

### Step 4: Verify

- Run `npm run dev` and test:
  - Toast notifications appear on save success/error
  - Confirm dialog appears on "Restore Defaults" click
  - Dialog returns correct boolean
  - Toasts auto-dismiss
  - Visual design matches the dark theme

---

## 5. Visual Design Mockup

### Toast (success)
```
┌──────────────────────────────────────────────┐
│  ✓  Configuration saved successfully         │  ← green-blue chrome1 accent
│                                               │
│  [ Undo ]              [ ✕ ]                  │
└──────────────────────────────────────────────┘
```
- `bg-graphite/80`, `border-line`, `backdrop-blur-xl`
- Left border: `4px solid var(--color-chrome1)`
- Icon: `CheckCircle` in `text-chrome1`
- Close: `X` icon top-right

### Toast (error)
- Left border: `4px solid var(--color-chrome3)` (pink)
- Icon: `XCircle` in `text-chrome3`

### Toast (info)
- Left border: `4px solid var(--color-chrome2)` (purple)
- Icon: `Info` in `text-chrome2`

### Confirm Dialog
```
┌──────────────────────────────────────────────┐
│  ⚠  Restore Defaults                         │
│                                               │
│  Are you sure you want to restore all        │
│  defaults? This will overwrite your current   │
│  configuration.                               │
│                                               │
│  [ Cancel ]  [ Confirm ]                      │
└──────────────────────────────────────────────┘
```
- Overlay: `bg-void/60 backdrop-blur-sm`
- Panel: `bg-graphite/90 border-line backdrop-blur-xl rounded-2xl`
- Confirm button: `bg-chrome2 text-void` (purple)
- Cancel button: `bg-void/50 border-line text-haze`

---

## 6. API Usage Examples

### Toast notifications
```tsx
import { useToast } from "@/components/ui";

const { toast } = useToast();

toast.success("Configuration saved successfully");
toast.error("Failed to save configuration");
toast.info("Last updated 2 minutes ago");

// With options
toast.success("Changes applied", {
  title: "Success",
  duration: 5000,
  action: { label: "Undo", onClick: () => revert() },
});
```

### Alert (replaces `alert()`)
```tsx
import { useDialog } from "@/components/ui";

const { alert } = useDialog();

await alert("Configuration has been reset to defaults.");
```

### Confirm (replaces `confirm()`)
```tsx
import { useDialog } from "@/components/ui";

const { confirm } = useDialog();

const confirmed = await confirm(
  "Are you sure you want to restore all defaults? This will overwrite your current configuration."
);

if (confirmed) {
  // proceed with restore
}
```

### Standalone (outside React components)
```ts
import { toast } from "@/components/ui";

toast.error("Something went wrong");
```

---

## 7. Dependencies

- **framer-motion** — already installed (`^12.40.0`), used for animations
- **lucide-react** — already installed (`^1.18.0`), used for icons
- **react-dom** — `createPortal` for portal rendering (React 19)
- **clsx** — already installed (`^2.1.1`), for conditional class names
- **tailwind-merge** — already installed (`^3.6.0`), for merging Tailwind classes

No new dependencies required.

---

## 8. Edge Cases & Considerations

1. **SSR safety**: Portal rendering must be guarded with `typeof window !== "undefined"` checks since the provider may render during SSR.
2. **Toast stacking**: Multiple toasts should stack vertically with offset animation.
3. **Dialog blocking**: While a dialog is open, background scrolling should be locked.
4. **Escape key**: Both toasts (dismiss on Escape if focused) and dialogs (cancel on Escape) should handle keyboard events.
5. **Auto-dismiss**: Toasts auto-dismiss after duration; dialogs do not auto-dismiss.
6. **Theme awareness**: The component uses CSS variables so it automatically adapts to light/dark theme.
7. **Z-index**: Use `z-[100]` to ensure toasts/dialogs appear above the `grain-overlay` (`z-60`) and all page content.
