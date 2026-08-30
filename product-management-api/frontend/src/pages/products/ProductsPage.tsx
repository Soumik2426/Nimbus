import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "../../api/productApi";

import type { Product } from "../../types/product";

import { useAuth } from "../../hooks/useAuth";

import Button from "../../components/ui/Button";

import ProductCard from "../../components/products/ProductCard";
import ProductSearch from "../../components/products/ProductSearch";
import ProductPagination from "../../components/products/ProductPagination";
import ProductCategoryFilter from "../../components/products/ProductCategoryFilter";
import EmptyProducts from "../../components/products/EmptyProducts";

function ProductsPage() {
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);

      let response;

      if (search.trim()) {
        response = await searchProducts(search, page);
      } else if (category !== "All") {
        response = await getProductsByCategory(
          category,
          page
        );
      } else {
        response = await getProducts(page);
      }

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [page, search, category]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black text-slate-900">
            Products
          </h1>

          <p className="mt-2 text-slate-500">
            Browse and manage your products.
          </p>

        </div>

        {user?.role === "ADMIN" && (
          <Link to="/products/create">
            <Button>

              <Plus size={18} />

              Add Product

            </Button>
          </Link>
        )}

      </div>

      {/* Search & Filters */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <ProductSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />

        <div className="flex flex-wrap gap-3">

          <ProductCategoryFilter
            value={category}
            onChange={(value) => {
              setCategory(value);
              setPage(0);
            }}
          />

          <Button
            variant="outline"
            onClick={loadProducts}
          >
            <RefreshCw
              size={18}
              className="mr-2"
            />

            Refresh

          </Button>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-3xl bg-white py-20 text-center text-lg text-slate-500 shadow-sm">
          Loading Products...
        </div>
      )}

      {/* Empty State */}

      {!loading &&
        products.length === 0 && (
          <EmptyProducts />
        )}

      {/* Product Info */}

      {!loading &&
        products.length > 0 && (

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

            <p className="text-sm text-slate-500">

              Showing{" "}

              <span className="font-semibold text-slate-800">
                {products.length}
              </span>{" "}

              product{products.length !== 1 ? "s" : ""}

            </p>

            <p className="text-sm text-slate-500">

              Page{" "}

              <span className="font-semibold text-slate-800">
                {page + 1}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-slate-800">
                {totalPages}
              </span>

            </p>

          </div>

        )}

      {/* Products Grid */}

      {!loading &&
        products.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDeleted={loadProducts}
            />
            ))}
          </motion.div>
        )}

      {/* Pagination */}

      {!loading &&
        products.length > 0 && (
          <ProductPagination
            page={page}
            totalPages={totalPages}
            onPrevious={() =>
              setPage((prev) =>
                Math.max(prev - 1, 0)
              )
            }
            onNext={() =>
              setPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages - 1
                )
              )
            }
          />
        )}

    </div>
  );
}

export default ProductsPage;