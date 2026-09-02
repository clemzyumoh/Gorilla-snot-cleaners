"use client";

// Reusable confirm modal. Usage in a page:
//   const [confirmTarget, setConfirmTarget] = useState(null);
//   <ConfirmDialog
//     open={!!confirmTarget}
//     message="Delete this address?"
//     onConfirm={() => { doDelete(confirmTarget); setConfirmTarget(null); }}
//     onCancel={() => setConfirmTarget(null)}
//   />
export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-lg">
        <p className="text-plum">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border border-plum/20 py-2 font-700 text-plum hover:border-coral hover:text-coral">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-coral py-2 font-700 text-white hover:bg-plum">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
