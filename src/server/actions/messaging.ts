import api from "../api";

export const messagingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => `/chats`,
      providesTags: (result) => {
        // Map over the result to provide tags for each chat

        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "Chat", id } as const)),
              { type: "Chat", id: "LIST" }, // Adds a global tag for the entire query
            ]
          : [{ type: "Chat", id: "LIST" }];
      },
    }),

    fetchChatMsgs: builder.query({
      query: ({ chat_id }) => `/chats/${chat_id}/messages`,
      providesTags: (result) => {
        // Map over the result to provide tags for each chat
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "Chat", id } as const)),
              { type: "Chat", id: "LIST" }, // Adds a global tag for the entire query
            ]
          : [{ type: "Chat", id: "LIST" }];
      },
    }),

    getChatByID: builder.query({
      query: ({ chat_id }) => `/chats/${chat_id}`,
    }),

    startChat: builder.mutation({
      query: (message: any) => ({
        url: `/chats`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: () => [{ type: "Chat" }] as any,
    }),

    sendMessageInChat: builder.mutation({
      query: ({ chat_id, ...message }: any) => ({
        url: `/chats/${chat_id}/messages`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: () => [{ type: "Chat" }] as any,
    }),

    updateMessage: builder.mutation({
      query: ({ chat_id, ...message }) => ({
        url: `/chats`,
        method: "PUT",
        body: message,
      }),
      invalidatesTags: () => [{ type: "Chat" }] as any,
    }),

    deleteListing: builder.mutation({
      query: ({ chat_id }) => ({
        url: `/chats/${chat_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { chat_id }) => [
        { type: "Chat", id: chat_id }, // Invalidate the specific listing
        { type: "Chat", id: "LIST" }, // Invalidate the entire query
      ],
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
  useGetChatsQuery,
  useGetChatByIDQuery,
  useFetchChatMsgsQuery,
  useStartChatMutation,
  useSendMessageInChatMutation,
  useUpdateMessageMutation,
  useDeleteListingMutation,
} = messagingSlice;
