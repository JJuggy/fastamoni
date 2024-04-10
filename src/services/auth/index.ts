import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {LoginRequest, SignUpRequest} from './interface';
import {Response} from '@store/interfaces';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  endpoints: builder => ({
    login: builder.mutation<Response, LoginRequest>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<Response, SignUpRequest>({
      query: credentials => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
export const {useLoginMutation, useSignUpMutation} = authApi;
