interface Props {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Home",
  "Beauty",
  "Food",
];

function ProductCategoryFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
    >
      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
}

export default ProductCategoryFilter;