import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { instance } from '@/api'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    refreshToken: builder.query<{ accessToken: string }, void>({
      query: () => `auth/refresh`,
    }),
    test: builder.query<{ message: string }, void>({
      query: () => `auth/test`,
    }),
  }),
})

export const { useRefreshTokenQuery, useTestQuery } = authApi
