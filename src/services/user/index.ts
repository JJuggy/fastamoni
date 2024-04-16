import {createApi} from '@reduxjs/toolkit/query/react';
import {Response} from '@store/interfaces';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  endpoints: builder => ({
    getUserProfile: builder.query<Response, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
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
    }),
  }),
});
export const {
  useGetUserProfileQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserInfoMutation,
} = UserApi;
