import { Search, X } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  return (
    <div className="relative w-full max-w-md">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-slate-100"
        >
          <X
            size={16}
            className="text-slate-500"
          />
        </button>
      )}

    </div>
  );
}

export default ProductSearch;