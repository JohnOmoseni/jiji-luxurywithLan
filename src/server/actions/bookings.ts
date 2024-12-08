import api from "../api";

export const bookingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => `/bookings`,
    }),

    getBookingByID: builder.query({
      query: ({ booking_id }: { booking_id: number }) => `/bookings/${booking_id}`,
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Bookings" }] as any,
    }),

    updateBooking: builder.mutation({
      query: ({ booking_id, ...payload }) => ({
        url: `/bookings/${booking_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Bookings" }] as any,
    }),

    deleteBooking: builder.mutation({
      query: ({ booking_id }) => ({
        url: `/bookings/${booking_id}`,
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
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingSlice;
