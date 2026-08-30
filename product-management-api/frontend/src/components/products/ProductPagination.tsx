import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

function ProductPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">

      <button
        disabled={page === 0}
        onClick={onPrevious}
        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="font-semibold text-slate-700">
        Page {page + 1} of {totalPages}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={onNext}
        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default ProductPagination;