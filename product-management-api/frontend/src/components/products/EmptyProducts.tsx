import { PackageSearch } from "lucide-react";

function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20">

      <PackageSearch
        size={70}
        className="text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        No Products Found
      </h2>

      <p className="mt-2 text-slate-500">
        Try searching with another keyword.
      </p>

    </div>
  );
}

export default EmptyProducts;