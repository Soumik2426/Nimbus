import { Link } from "react-router-dom";
import DeleteProductButton from "./DeleteProductButton";
import {
  Eye,
  Pencil,
  Package,
  Boxes,
  IndianRupee,
} from "lucide-react";

import type { Product } from "../../types/product";

import { useAuth } from "../../hooks/useAuth";

import Card from "../ui/Card";
import Button from "../ui/Button";

interface Props {
  product: Product;
  onDeleted?: () => void;
}

function ProductCard({
  product,
  onDeleted,
}: Props) {
  const { user } = useAuth();

  return (
    <Card className="group">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg">

          <Package size={28} />

        </div>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          {product.category}
        </span>

      </div>

      {/* Title */}

      <h2 className="mt-6 text-xl font-bold text-slate-900">
        {product.name}
      </h2>

      {/* Description */}

      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
        {product.description}
      </p>

      {/* Information */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">

            <IndianRupee size={17} />

            <span className="text-sm">
              Price
            </span>

          </div>

          <span className="text-lg font-bold text-indigo-600">
            ₹{product.price}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">

            <Boxes size={17} />

            <span className="text-sm">
              Quantity
            </span>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.quantity > 10
                ? "bg-green-100 text-green-700"
                : product.quantity > 0
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.quantity} in stock
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-wrap gap-2">

        <Link
          to={`/products/${product.id}`}
          className="flex-1"
        >
          <Button fullWidth>

            <Eye size={16} />

            <span className="ml-2">
              View
            </span>

          </Button>
        </Link>

        {user?.role === "ADMIN" && (
          <>
            <Link
              to={`/products/edit/${product.id}`}
            >
              <Button variant="secondary">

                <Pencil size={16} />

              </Button>
            </Link>

            <DeleteProductButton
  productId={product.id}
  productName={product.name}
  onDeleted={() => {
    if (onDeleted) {
      onDeleted();
    }
  }}
/>
          </>
        )}

      </div>

    </Card>
  );
}

export default ProductCard;