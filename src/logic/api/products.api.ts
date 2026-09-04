import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Product } from '@/src/types';
import { Platform } from 'react-native';

/**
 * Component usage: generated hooks subscribe to cached API data and rerender
 * when an endpoint request changes state.
 *
 * const { data: products = [], isLoading, error } = useGetProductsQuery();
 * const { data: product } = useGetProductByIdQuery(productId);
 * const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
 *
 * await updateProduct({ id: productId, changes: { title: 'New title' } }).unwrap();
 *
 * Slice/thunk usage: do not use React hooks outside a component. Dispatch an
 * endpoint instead, then use `unwrap()` for its data or error. To only read
 * cached endpoint state, use the endpoint selector with `getState()`.
 *
 * const product = await dispatch(
 *   productsApi.endpoints.getProductById.initiate(productId),
 * ).unwrap();
 *
 * const cachedProduct = productsApi.endpoints.getProductById
 *   .select(productId)(getState()).data;
 */
export type CreateProduct = Omit<Product, 'id'>;
export type UpdateProduct = {
  id: Product['id'];
  changes: Partial<CreateProduct>;
};

const baseUrl = Platform.select({
  ios: 'http://localhost:8080/',
  android: 'http://10.0.2.2:8080/',
  default: 'http://localhost:8080/'
});

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Product'],

  /**
   * Defines the API endpoints for products, including queries and mutations.
   */
  endpoints: (builder) => ({

    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: (products) =>
        products
          ? [
              ...products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query<Product, Product['id']>({
      query: (id) => `products/${id}`,
      providesTags: (_product, _error, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation<Product, CreateProduct>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<Product, UpdateProduct>({
      query: ({ id, changes }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_product, _error, { id }) => [{ type: 'Product', id }],
    }),

    deleteProduct: builder.mutation<void, Product['id']>({
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
