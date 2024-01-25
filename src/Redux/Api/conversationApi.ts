import { instance } from '@/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    getConversations: builder.query<any, void>({
      query: () => `/conversation`,
      providesTags: ['Conversation']
    }),
    deleteConversation: builder.mutation({
        query: (id) => ({
            method: "DELETE",
            url: `conversation/${id}`,
        }),
        invalidatesTags: ['Conversation']
    })
  }),
})

export const { useGetConversationsQuery, useDeleteConversationMutation } = conversationApi
