export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export interface PaginationResponse {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isLast: boolean;
  products: Product[];
}