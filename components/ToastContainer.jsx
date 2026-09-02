"use client";

import { useToastStore } from "@/store/toastStore";

const styles = {
  success: "bg-grass text-white",
  error: "bg-coral text-white",
  info: "bg-plum text-cream",
};

// Renders active toasts fixed to the bottom of the screen. Mount this
// once in the root layout — call useToastStore.getState().addToast(msg, type)
// from anywhere to show one.
export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          className={`cursor-pointer rounded-full px-5 py-3 text-sm font-700 shadow-lg ${styles[t.type] || styles.info}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
