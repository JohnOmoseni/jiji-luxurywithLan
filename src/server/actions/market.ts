import api from "../api";

export const marketSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMarketItems: builder.query({
      query: () => `/market/properties`,
      keepUnusedDataFor: 0,
    }),

    getItemByID: builder.query({
      query: ({ id }: { id: string | number }) => `/market/properties/${id}`,
    }),

    requestCallback: builder.mutation({
      query: ({ property_id, ...data }) => ({
        url: `/market/properties/${property_id}/request-a-call`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Market" }] as any,
    }),

    bookProperty: builder.mutation({
      query: ({ property_id, ...payload }) => ({
        url: `/market/properties/${property_id}/book`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Market" }] as any,
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetMarketItemsQuery, useGetItemByIDQuery, useRequestCallbackMutation } =
  marketSlice;
