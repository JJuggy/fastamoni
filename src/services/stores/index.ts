import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';
import {ICreateStore} from './interfaces';

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
      query: () => ({
        url: '/store/update',
        method: 'PATCH',
      }),
    }),
  }),
});

export const {useGetStoresQuery, useGetStoreQuery, useCreateStoreMutation} =
  storeApi;
