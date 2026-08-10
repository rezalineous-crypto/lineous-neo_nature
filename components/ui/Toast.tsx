"use client";

// Implementation manual: docs/toast-component-usage.md
// For usage examples, API reference, and integration guide, see the manual above.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/* ── Types ─────────────────────────────────────────── */

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  alert: (message: string) => Promise<void>;
  confirm: (message: string) => Promise<boolean>;
}

/* ── Context ───────────────────────────────────────── */

const ToastContext = createContext<ToastContextType | null>(null);

/* ── Provider ──────────────────────────────────────── */

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [alertState, setAlertState] = useState<{
    show: boolean;
    message: string;
    resolve: (value: void) => void;
  } | null>(null);
  const [confirmState, setConfirmState] = useState<{
    show: boolean;
    message: string;
    resolve: (value: boolean) => void;
  } | null>(null);
  const isClient = useIsClient();
  const idCounter = useRef(0);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${++idCounter.current}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const toast = useCallback(
    (type: ToastType, message: string) => addToast(type, message),
    [addToast]
  );

  const success = useCallback(
    (message: string) => addToast("success", message),
    [addToast]
  );

  const error = useCallback(
    (message: string) => addToast("error", message),
    [addToast]
  );

  const info = useCallback(
    (message: string) => addToast("info", message),
    [addToast]
  );

  const alert = useCallback((message: string): Promise<void> => {
    return new Promise((resolve) => {
      setAlertState({ show: true, message, resolve });
    });
  }, []);

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({ show: true, message, resolve });
    });
  }, []);

  const dismissAlert = useCallback(() => {
    if (alertState) {
      alertState.resolve();
      setAlertState(null);
    }
  }, [alertState]);

  const dismissConfirm = useCallback((result: boolean) => {
    if (confirmState) {
      confirmState.resolve(result);
      setConfirmState(null);
    }
  }, [confirmState]);

  return (
    <ToastContext.Provider
      value={{ toast, success, error, info, alert, confirm }}
    >
      {children}
      {isClient &&
        createPortal(
          <div
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
            style={{ maxWidth: "420px", width: "calc(100vw - 2rem)" }}
          >
            {toasts.map((t) => (
              <ToastItem key={t.id} type={t.type} message={t.message} />
            ))}
          </div>,
          document.body
        )}
      {alertState && (
        <AlertDialog
          message={alertState.message}
          onClose={dismissAlert}
        />
      )}
      {confirmState && (
        <ConfirmDialog
          message={confirmState.message}
          onConfirm={() => dismissConfirm(true)}
          onCancel={() => dismissConfirm(false)}
        />
      )}
    </ToastContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────── */

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

/* ── Toast Item ────────────────────────────────────── */

interface ToastItemProps {
  type: ToastType;
  message: string;
}

function ToastItem({ type, message }: ToastItemProps) {
  const borderColor =
    type === "success"
      ? "border-emerald-500/30"
      : type === "error"
      ? "border-red-500/30"
      : "border-chrome1/30";

  const bgColor =
    type === "success"
      ? "bg-emerald-500/10"
      : type === "error"
      ? "bg-red-500/10"
      : "bg-chrome1/10";

  const textColor =
    type === "success"
      ? "text-emerald-400"
      : type === "error"
      ? "text-red-400"
      : "text-chrome1";

  const iconColor =
    type === "success"
      ? "text-emerald-400"
      : type === "error"
      ? "text-red-400"
      : "text-chrome1";

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border ${borderColor} ${bgColor} backdrop-blur-md shadow-lg shadow-black/30 animate-in slide-in-from-right duration-300`}
    >
      <div className={`flex-shrink-0 mt-0.5 ${iconColor}`}>
        {type === "success" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {type === "error" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
        {type === "info" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )}
      </div>
      <p className={`text-sm font-medium ${textColor} leading-relaxed`}>
        {message}
      </p>
    </div>
  );
}

/* ── Alert Dialog ──────────────────────────────────── */

interface AlertDialogProps {
  message: string;
  onClose: () => void;
}

function AlertDialog({ message, onClose }: AlertDialogProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 rounded-2xl border border-line bg-graphite/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 space-y-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chrome1/10 flex items-center justify-center text-chrome1 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <p className="text-sm text-bone leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full rounded-full bg-chrome2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-void transition hover:bg-chrome1 focus:outline-none focus:ring-2 focus:ring-chrome1/50"
        >
          OK
        </button>
      </div>
    </div>
  );
}

/* ── Confirm Dialog ────────────────────────────────── */

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 rounded-2xl border border-line bg-graphite/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 space-y-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-sm text-bone leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border border-line bg-void/50 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-haze transition hover:text-bone hover:border-chrome1/30 focus:outline-none focus:ring-2 focus:ring-line"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-red-500/90 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-void transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Imperative API (global access without provider) ── */

let globalToast: ((type: ToastType, message: string) => void) | null = null;
let globalSuccess: ((message: string) => void) | null = null;
let globalError: ((message: string) => void) | null = null;
let globalInfo: ((message: string) => void) | null = null;
let globalAlert: ((message: string) => Promise<void>) | null = null;
let globalConfirm: ((message: string) => Promise<boolean>) | null = null;

export function setGlobalToastAPI(
  toast: (type: ToastType, message: string) => void,
  success: (message: string) => void,
  error: (message: string) => void,
  info: (message: string) => void,
  alert: (message: string) => Promise<void>,
  confirm: (message: string) => Promise<boolean>
) {
  globalToast = toast;
  globalSuccess = success;
  globalError = error;
  globalInfo = info;
  globalAlert = alert;
  globalConfirm = confirm;
}

export function showToast(type: ToastType, message: string) {
  globalToast?.(type, message);
}

export function showSuccess(message: string) {
  globalSuccess?.(message);
}

export function showError(message: string) {
  globalError?.(message);
}

export function showInfo(message: string) {
  globalInfo?.(message);
}

export function showAlert(message: string): Promise<void> {
  return globalAlert?.(message) ?? Promise.resolve();
}

export function showConfirm(message: string): Promise<boolean> {
  return globalConfirm?.(message) ?? Promise.resolve(false);
}
