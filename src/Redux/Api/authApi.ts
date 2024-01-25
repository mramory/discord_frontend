import { instance } from '@/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    refreshToken: builder.query<any, void>({
      query: () => `auth/refresh`,
    }),
    test: builder.query<any, void>({
      query: () => `auth/test`,
    }),
  }),
})

export const { useRefreshTokenQuery, useTestQuery } = authApi
