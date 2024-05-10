import {createApi} from '@reduxjs/toolkit/dist/query/react';

import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Order'],
  endpoints: build => ({
    getOrders: build.query<Response, string>({
      query: (status: string) => ({
        url: `/orders?status=${status}`,
        method: 'GET',
      }),
    }),
    getOrderCode: build.query<Response, string>({
      query: (orderId: string) => ({
        url: `/orders/order-code/${orderId}`,
        method: 'GET',
      }),
    }),
    verifyOrderPayment: build.mutation<Response, string>({
      query: (paymentId: string) => ({
        url: `/orders/verify-payment/${paymentId}`,
        method: 'GET',
      }),
    }),
    createOrder: build.mutation<Response, void>({
      query: () => ({
        url: '/orders/create',
        method: 'POST',
      }),
    }),
    getOrderDetailsRelated: build.query<Response, string>({
      query: id => ({
        url: `/orders/order-details-related/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderCodeQuery,
  useVerifyOrderPaymentMutation,
  useGetOrderDetailsRelatedQuery,
} = orderApi;
