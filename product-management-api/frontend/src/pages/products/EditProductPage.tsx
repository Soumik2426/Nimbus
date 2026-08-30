import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import ProductForm from "../../components/forms/ProductForm";

import {
  getProduct,
  updateProduct,
} from "../../api/productApi";

import type {
  Product,
  ProductRequest,
} from "../../types/product";

function EditProductPage() {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [product, setProduct] =
    useState<Product | null>(null);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!productId) return;

        const response =
          await getProduct(Number(productId));

        setProduct(response.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Failed to load product."
        );
      } finally {
        setPageLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  async function handleSubmit(
    data: ProductRequest
  ) {
    try {
      if (!productId) return;

      setLoading(true);

      const response =
        await updateProduct(
          Number(productId),
          data
        );

      toast.success(response.message);

      navigate("/products");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="py-20 text-center text-lg text-slate-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center text-red-500">
        Product not found.
      </div>
    );
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
          Edit Product
        </h1>

        <p className="mt-2 text-slate-500">
          Update your product information.
        </p>

      </div>

      <ProductForm
        loading={loading}
        initialValues={{
          name: product.name,
          description:
            product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
        }}
        onSubmit={handleSubmit}
      />

    </motion.div>
  );
}

export default EditProductPage;