import {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {store} from '../../store';
import {Auth, setCredential} from '../../store/auth';
import appEnvironment from '../../../environ';

export const axiosBaseQuery =
  ({
    baseUrl = appEnvironment().baseUrl,
    baseHeaders = {},
  }: {
    baseUrl?: string;
    baseHeaders?: AxiosRequestConfig['headers'];
  }): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  ({url, method = 'GET', body, headers = {}}) => {
    return new Promise(async (resolve, reject) => {
      console.log(body, 'body');
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data: body,
          headers: {...baseHeaders, ...headers},
        });

        resolve({data: result.data, error: null});
      } catch (axiosError) {
        console.log(axiosError, 'this is the axios erro ooooo');
        let err = axiosError as AxiosError;
        if (err) {
          // console.log(err.response, 'another errorr');
          if (err.response?.status === 401) {
            store.dispatch(setCredential({} as Auth));
          }
          reject({
            error: {data: err.response?.data},
            data: null,
          });
        }
      }
    });

    // try {
    //   const result = await axios({
    //     url: baseUrl + url,
    //     method,
    //     data: body,
    //     headers: {...baseHeaders, ...headers},
    //   });
    //   return {data: result.data, error: null};
    // } catch (axiosError) {
    //   console.log(axiosError, 'this is the axios erro ooooo');
    //   let err = axiosError as AxiosError;
    //   if (err) {
    //     // console.log(err.response, 'another errorr');
    //     if (err.response?.status === 401) {
    //       store.dispatch(setCredential({} as Auth));
    //     }
    //     return {
    //       error: {data: err.response?.data},
    //       data: null,
    //     };
    //   }
    // }
  };
