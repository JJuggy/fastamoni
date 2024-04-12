import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Store'],
  endpoints: build => ({
    getStores: build.query({
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
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoreQuery,
  useCreateStoreMutation,
  useGetStoreMetricQuery,
  useGetStoreProductsQuery,
} = storeApi;
