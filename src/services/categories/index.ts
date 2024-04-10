import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {Category, CreateCategoryArgs, UpdateCategoryArgs} from './interface';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Category'],
  endpoints: build => ({
    getCategories: build.query<{data: Category[]}, void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
    }),
    getCategory: build.query<Category, number>({
      query: id => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
    }),
    getCategoryGroups: build.query<{data: Category[]}, void>({
      query: () => ({
        url: '/categories/groups',
        method: 'GET',
      }),
    }),
    createCategory: build.mutation<Category, CreateCategoryArgs>({
      query: ({body}) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: build.mutation<Category, UpdateCategoryArgs>({
      query: ({id, body}) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: build.mutation<void, number>({
      query: id => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
