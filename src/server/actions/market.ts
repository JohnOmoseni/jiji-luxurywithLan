import api from "../api";

export const marketSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get current URL search params
    getMarketItems: builder.query({
      query: () => {
        const searchParams = new URLSearchParams(window.location.search);
        return `/market/properties?${searchParams.toString()}`;
      },
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
