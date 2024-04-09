import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {Carts, CreateCartItemArgs, UpdateCartItemArgs} from './interface';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Cart'],
  endpoints: build => ({
    getCart: build.query<{data: Carts[]}, void>({
      query: () => ({
        url: '/cart',
        method: 'GET',
      }),
    }),
    getCartItem: build.query<Carts, number>({
      query: id => ({
        url: `/cart/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetCartQuery, useGetCartItemQuery} = cartApi;
