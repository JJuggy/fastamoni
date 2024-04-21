import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {UpdateHistoryArgs} from './interface';

export const historyApi = createApi({
  reducerPath: 'historyApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['History'],
  endpoints: build => ({
    getSearchHistoryHistory: build.query<{data: any}, void>({
      query: () => ({
        url: '/search-history',
        method: 'GET',
      }),
    }),
    getHistoryInfo: build.query<{data: any}, void>({
      query: id => ({
        url: `/history/info/${id}`,
        method: 'GET',
      }),
    }),
    createHistory: build.mutation<Response, any>({
      query: body => ({
        url: '/history/create',
        method: 'POST',
        body: body,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      }),
    }),
    updateHistory: build.mutation<Response, any>({
      query: ({id, body}: UpdateHistoryArgs) => ({
        url: `/history/update/${id}`,
        method: 'PUT',
        body: body,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      }),
    }),
    deleteHistory: build.mutation<Response, string>({
      query: id => ({
        url: `/search-history/remove/${id}`,
        method: 'DELETE',
      }),
    }),
    clearHistory: build.mutation<Response, void>({
      query: () => ({
        url: '/search-history/clear',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSearchHistoryHistoryQuery,
  useGetHistoryInfoQuery,
  useCreateHistoryMutation,
  useUpdateHistoryMutation,
  useDeleteHistoryMutation,
  useClearHistoryMutation,
} = historyApi;
