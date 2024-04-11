import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utility/axiosQuery/axiosBaseQuery';
import {Response} from '@store/interfaces';

interface UploadMedia {
  files: string[];
}

export const utilityApi = createApi({
  reducerPath: 'utilityApi',
  baseQuery: axiosBaseQuery({baseHeaders: {}}),
  tagTypes: ['Product'],
  endpoints: build => ({
    uploadMedia: build.mutation<Response, UploadMedia>({
      query: () => ({
        url: '/media/upload',
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {useUploadMediaMutation} = utilityApi;
