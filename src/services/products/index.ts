import {createApi} from '@reduxjs/toolkit/query/react';
import {Product} from './interface';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';

interface UpdateProductArgs {
  id: number;
  body: Partial<Product>;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Product'],
  endpoints: build => ({
    getProducts: build.query<{data: Product[]}, void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    getProduct: build.query<Product, number>({
      query: id => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    createProduct: build.mutation<Response, any>({
      query: body => ({
        url: '/products/create',
        method: 'POST',
        body: body,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation<Product, UpdateProductArgs>({
      query: ({id, body}) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation<void, number>({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
