import api from "../api";

export const propertySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => `/properties`,
      providesTags: (result) => {
        const data = result?.data?.data;
        console.log("Result:", result, data);
        // Map over the result to provide tags for each listing

        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "Listing", id } as const)),
              { type: "Listing", id: "LIST" }, // Adds a global tag for the entire query
            ]
          : [{ type: "Listing", id: "LIST" }];
      },
    }),

    getListingByID: builder.query({
      query: ({ listing_id }) => `/properties/${listing_id}`,
    }),

    addListing: builder.mutation({
      query: (data: any) => ({
        url: `/properties`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Listing" }] as any,
    }),

    editListing: builder.mutation({
      query: ({ listing_id, ...payload }: any) => ({
        url: `/properties/${listing_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Listing" }] as any,
    }),

    deleteListing: builder.mutation({
      query: ({ listing_id }) => ({
        url: `/properties/${listing_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { listing_id }) => [
        { type: "Listing", id: listing_id }, // Invalidate the specific listing
        { type: "Listing", id: "LIST" }, // Invalidate the entire query
      ],
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
  useGetAllListingsQuery,
  useGetListingByIDQuery,
  useAddListingMutation,
  useEditListingMutation,
  useDeleteListingMutation,
} = propertySlice;
