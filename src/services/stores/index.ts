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
    getStoreProducts: build.query<Response, string>({
      query: id => ({
        url: `/store/store-products/${id}`,
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
    updateStore: build.mutation<Store, UpdateStoreArgs>({
      query: body => ({
        url: `/store/update`,
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
        body: body,
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
    markAsPickedUp: build.mutation<
      Response,
      {orderId: any; verificationNo: any}
    >({
      query: ({orderId, verificationNo}) => ({
        url: `/store/orders/mark-picked/${orderId}/${verificationNo}`,
        method: 'PATCH',
      }),
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
  useMarkAsPickedUpMutation,
} = storesApi;
