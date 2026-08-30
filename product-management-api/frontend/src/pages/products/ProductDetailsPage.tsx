import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Calendar,
  Boxes,
  IndianRupee,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  deleteProduct,
  getProduct,
} from "../../api/productApi";

import type { Product } from "../../types/product";

import { useAuth } from "../../hooks/useAuth";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

function ProductDetailsPage() {
    console.log("PRODUCT DETAILS PAGE RENDERED");
  const { productId } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] =
    useState<Product | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [deleting, setDeleting] =
    useState(false);


  useEffect(() => {
    async function loadProduct() {
      try {
        if (!productId) return;

        const response = await getProduct(
          Number(productId)
        );

        setProduct(response.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  async function handleDelete() {
    if (!product) return;

    try {
      setDeleting(true);

      const response = await deleteProduct(
        product.id
      );

      toast.success(response.message);

      navigate("/products");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete product."
      );
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) {
    return (
      <div className="py-24 text-center text-lg text-slate-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="space-y-8"
      >
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <Card>
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

            <div className="flex-1">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <Package size={40} />
              </div>

              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                {product.category}
              </span>

              <h1 className="mt-6 text-4xl font-black">
                {product.name}
              </h1>

              <p className="mt-6 leading-8 text-slate-600">
                {product.description}
              </p>

            </div>

            <div className="space-y-5 lg:w-80">

              <Card>

                <div className="flex items-center gap-3">

                  <IndianRupee className="text-indigo-600" />

                  <div>

                    <p className="text-sm text-slate-500">
                      Price
                    </p>

                    <h2 className="text-3xl font-bold text-indigo-600">
                      ₹{product.price.toLocaleString()}
                    </h2>

                  </div>

                </div>

              </Card>

              <Card>

                <div className="flex items-center gap-3">

                  <Boxes className="text-green-600" />

                  <div>

                    <p className="text-sm text-slate-500">
                      Quantity
                    </p>

                    <h2 className="text-2xl font-bold">
                      {product.quantity}
                    </h2>

                  </div>

                </div>

              </Card>

            </div>

          </div>
        </Card>

        <Card>

          <h2 className="mb-6 text-2xl font-bold">
            Product Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <p className="text-sm text-slate-500">
                Created At
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Calendar size={18} />

                {new Date(
                  product.createdAt
                ).toLocaleString()}

              </div>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Updated At
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Calendar size={18} />

                {new Date(
                  product.updatedAt
                ).toLocaleString()}

              </div>

            </div>

          </div>

        </Card>

        {user?.role === "ADMIN" && (

          <div className="flex flex-wrap gap-4">

            <Button
              onClick={() =>
                navigate(
                  `/products/edit/${product.id}`
                )
              }
            >

              <Pencil size={18} />

              <span className="ml-2">
                Edit Product
              </span>

            </Button>

            <Button
              variant="danger"
              onClick={() =>
                setShowDeleteModal(true)
              }
            >

              <Trash2 size={18} />

              <span className="ml-2">
                Delete Product
              </span>

            </Button>

          </div>

        )}

      </motion.div>

      <DeleteConfirmationModal
        open={showDeleteModal}
        loading={deleting}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${product.name}"? This action cannot be undone.`}
        onCancel={() =>
          setShowDeleteModal(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}

export default ProductDetailsPage;