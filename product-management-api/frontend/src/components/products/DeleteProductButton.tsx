import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";

import { deleteProduct } from "../../api/productApi";

interface Props {
  productId: number;
  productName: string;
  onDeleted: () => void;
}

function DeleteProductButton({
  productId,
  productName,
  onDeleted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await deleteProduct(productId);

      toast.success(response.message);

      setOpen(false);

      onDeleted();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ??
        "Failed to delete product."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={16} />
      </Button>

      <DeleteConfirmationModal
        open={open}
        loading={loading}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productName}"?`}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteProductButton;