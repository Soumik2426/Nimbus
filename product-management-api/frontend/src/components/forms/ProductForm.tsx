import { useState } from "react";
import Button from "../ui/Button";

import type { ProductRequest } from "../../types/product";

interface Props {
  initialValues?: ProductRequest;
  loading?: boolean;
  onSubmit: (data: ProductRequest) => Promise<void>;
}

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Home",
  "Beauty",
  "Food",
];

function ProductForm({
  initialValues,
  loading = false,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ProductRequest>(
    initialValues ?? {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: categories[0],
    }
  );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-sm"
    >

      <div>

        <label className="mb-2 block font-medium">
          Product Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
          required
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
          required
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            required
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            required
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
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

      </div>

      <Button
        type="submit"
        fullWidth
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Product"}
      </Button>

    </form>
  );
}

export default ProductForm;