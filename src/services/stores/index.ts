import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';
import {Store, UpdateStoreArgs} from './interface';

export const storesApi = createApi({
  reducerPath: 'storesApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Store'],
  endpoints: build => ({
    getTopStores: build.query<{data: Store[]}, void>({
      query: () => ({
        url: '/store/top-stores',
        method: 'GET',
      }),
    }),
    getStores: build.query<Response, void>({
      query: () => ({
        url: '/store',
        method: 'GET',
      }),
    }),
    getStore: build.query<Response, string>({
      query: id => ({
        url: `/store/store-info/${id}`,
        method: 'GET',
      }),
    }),
    createStore: build.mutation<Response, FormData>({
      query: body => ({
        url: '/store/update',
        method: 'PATCH',
        body: body,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      }),
    }),
    getStoreMetric: build.query<Response, void>({
      query: () => ({
        url: '/store/performance',
        method: 'GET',
      }),
    }),
    getStoreProducts: build.query<Response, string>({
      query: id => ({
        url: `/store/store-products/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Store'],
    }),
    updateStore: build.mutation<Store, UpdateStoreArgs>({
      query: ({id, body}) => ({
        url: `/stores/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Store'],
    }),
    deleteStore: build.mutation<void, number>({
      query: id => ({
        url: `/stores/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Store'],
    }),
  }),
});
export const {
  useGetTopStoresQuery,
  useGetStoreQuery,
  useGetStoresQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
  useGetStoreMetricQuery,
  useGetStoreProductsQuery,
} = storesApi;
