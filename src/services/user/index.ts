import {createApi} from '@reduxjs/toolkit/query/react';
import {Response} from '@store/interfaces';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['userProfile', 'userPassword'],
  endpoints: builder => ({
    getUserProfile: builder.query<Response, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['userProfile'],
    }),
    updateUserPassword: builder.mutation({
      query: data => ({
        url: '/user/update-password',
        method: 'PATCH',
        body: data,
      }),
    }),
    updateUserInfo: builder.mutation({
      query: data => ({
        url: '/user/update',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['userProfile'],
    }),
    getUserSearchHistory: builder.query<Response, string>({
      query: query => ({
        url: `/search-history?keyword=${query}`,
        method: 'GET',
      }),
    }),
    clearUserSearchHistory: builder.mutation<Response, void>({
      query: () => ({
        url: '/search-history/clear',
        method: 'DELETE',
      }),
    }),
  }),
});
export const {
  useGetUserProfileQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserInfoMutation,
  useClearUserSearchHistoryMutation,
  useGetUserSearchHistoryQuery,
} = UserApi;
