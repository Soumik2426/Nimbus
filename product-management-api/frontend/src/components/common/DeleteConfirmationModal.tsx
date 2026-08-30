interface Props {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmationModal({
  open,
  title,
  message,
  loading,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
    >
      <div className="w-[420px] rounded-xl bg-white p-8 shadow-2xl">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-4">
          {message}
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmationModal;