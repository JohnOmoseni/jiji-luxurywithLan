import api from "../api";

export const propertySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({ property_id }) => `/properties/${property_id}/reviews`,
      providesTags: (result) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "Review", id } as const)),
              { type: "Review", id: "LIST" }, // Adds a global tag for the entire query
            ]
          : [{ type: "Review", id: "LIST" }];
      },
    }),

    getReviewByID: builder.query({
      query: ({ property_id, review_id }) => `/properties/${property_id}/reviews/${review_id}`,
    }),

    addReview: builder.mutation({
      query: ({ property_id, ...data }: any) => ({
        url: `/properties/${property_id}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Review" }] as any,
    }),

    editReview: builder.mutation({
      query: ({ property_id, review_id, ...payload }: any) => ({
        url: `/properties/${property_id}/reviews/${review_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Review" }] as any,
    }),

    deleteReview: builder.mutation({
      query: ({ property_id, review_id }) => ({
        url: `/properties/${property_id}/reviews/${review_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { property_id }) => [
        { type: "Review", id: property_id }, // Invalidate the specific listing
        { type: "Review", id: "LIST" }, // Invalidate the entire query
      ],
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetAllReviewsQuery, useAddReviewMutation, useGetReviewByIDQuery } = propertySlice;
