import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {Carts, CreateCartItemArgs, UpdateCartItemArgs} from './interface';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';

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
    createCartItem: build.mutation<Carts, CreateCartItemArgs>({
      query: ({body}) => ({
        url: '/cart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: build.mutation<Response, UpdateCartItemArgs>({
      query: ({body}) => ({
        url: '/cart',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteCartItem: build.mutation<void, number>({
      query: id => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: build.mutation<void, void>({
      query: () => ({
        url: '/cart/clear',
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetCartItemQuery,
  useCreateCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} = cartApi;
