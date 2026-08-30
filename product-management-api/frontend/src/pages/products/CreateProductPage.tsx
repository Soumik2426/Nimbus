import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import ProductForm from "../../components/forms/ProductForm";

import { createProduct } from "../../api/productApi";

import type { ProductRequest } from "../../types/product";

function CreateProductPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    product: ProductRequest
  ) {
    try {
      setLoading(true);

      const response =
        await createProduct(product);

      toast.success(response.message);

      navigate("/products");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mx-auto max-w-4xl space-y-8"
    >
      <div>

        <h1 className="text-4xl font-black">
          Create Product
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new product to your inventory.
        </p>

      </div>

      <ProductForm
        loading={loading}
        onSubmit={handleSubmit}
      />

    </motion.div>
  );
}

export default CreateProductPage;