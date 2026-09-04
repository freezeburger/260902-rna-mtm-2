import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Product } from '@/src/types';

export type CreateProduct = Omit<Product, 'id'>;
export type UpdateProduct = {
  id: Product['id'];
  changes: Partial<CreateProduct>;
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => 'products',
      providesTags: (products) =>
        products
          ? [
              ...products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProductById: build.query<Product, Product['id']>({
      query: (id) => `products/${id}`,
      providesTags: (_product, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: build.mutation<Product, CreateProduct>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: build.mutation<Product, UpdateProduct>({
      query: ({ id, changes }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_product, _error, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: build.mutation<void, Product['id']>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_product, _error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
