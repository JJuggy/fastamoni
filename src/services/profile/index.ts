import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  endpoints: builder => ({
    getWishList: builder.query<Response, void>({
      query: () => ({
        url: '/wishlist',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetWishListQuery} = profileApi;
