import api from "../api";

export const bookingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => `/bookings`,
    }),

    getBookingByID: builder.query({
      query: ({ booking_id }: { booking_id: number }) => `/bookings/${booking_id}`,
    }),

    updateBooking: builder.mutation({
      query: ({ property_id, ...payload }: any) => ({
        url: `/properties/${property_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Bookings" }] as any,
    }),

    updateBookingPublish: builder.mutation({
      query: ({ property_id, is_published }: { property_id: number; is_published: boolean }) => ({
        url: `/properties/${property_id}`,
        method: "PUT",
        body: {
          is_published: is_published,
        },
      }),
      invalidatesTags: () => [{ type: "Bookings" }] as any,
    }),

    deleteBooking: builder.mutation({
      query: ({ property_id }) => ({
        url: `/properties/${property_id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Bookings" }] as any,
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
  useGetAllBookingsQuery,
  useGetBookingByIDQuery,
  useUpdateBookingMutation,
  useUpdateBookingPublishMutation,
  useDeleteBookingMutation,
} = bookingSlice;
