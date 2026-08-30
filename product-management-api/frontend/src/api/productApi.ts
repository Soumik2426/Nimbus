import api from "./axios";
import type {
    PaginationResponse,
    Product,
    ProductRequest,
} from "../types/product";
import type { ApiResponse } from "../types/api";

export async function getProducts(
  page = 0,
  size = 10,
  sortBy = "id",
  direction = "asc"
) {
  const response = await api.get<
    ApiResponse<PaginationResponse>
  >("/products/getProducts", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
}

export async function getProduct(id: number) {
  const response = await api.get<ApiResponse<Product>>(
    `/products/getProduct/${id}`
  );

  return response.data;
}

export async function searchProducts(
  keyword: string,
  page = 0,
  size = 10
) {
  const response = await api.get<
    ApiResponse<PaginationResponse>
  >("/products/search", {
    params: {
      keyword,
      page,
      size,
    },
  });

  return response.data;
}

export async function getProductsByCategory(
  category: string,
  page = 0,
  size = 10
) {
  const response = await api.get<
    ApiResponse<PaginationResponse>
  >("/products/category", {
    params: {
      category,
      page,
      size,
    },
  });

  return response.data;
}

export async function createProduct(
  product: ProductRequest
) {
  const response = await api.post<
    ApiResponse<Product>
  >("/products/createProduct", product);

  return response.data;
}

export async function updateProduct(
  id: number,
  product: ProductRequest
) {
  const response = await api.put<
    ApiResponse<Product>
  >(`/products/updateProduct/${id}`, product);

  return response.data;
}

export async function deleteProduct(id: number) {
  const response = await api.delete<ApiResponse<string>>(
    `/products/deleteProduct/${id}`
  );

  return response.data;
}