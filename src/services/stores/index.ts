import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {CreateStoreArgs, Store, UpdateStoreArgs} from './interface';

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
    getStore: build.query<Store, number>({
      query: id => ({
        url: `stores/${id}`,
        method: 'GET',
      }),
    }),
    createStore: build.mutation<Store, CreateStoreArgs>({
      query: ({body}) => ({
        url: 'stores',
        method: 'POST',
        body,
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
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storesApi;
