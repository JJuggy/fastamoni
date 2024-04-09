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
  }),
});

export const {useGetStoresQuery, useGetStoreQuery} = storeApi;
