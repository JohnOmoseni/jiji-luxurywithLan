import api from "../api";

export const hotelSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: () => `/stores`,
    }),

    getHotelByID: builder.query({
      query: ({ hotel_id }: { hotel_id: number }) => `/stores/${hotel_id}`,
    }),

    listHotel: builder.mutation({
      query: (data) => ({
        url: `/stores`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Hotels" }] as any,
    }),

    updateHotel: builder.mutation({
      query: ({ hotel_id, ...payload }) => ({
        url: `/stores/${hotel_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Hotels" }] as any,
    }),

    deleteHotel: builder.mutation({
      query: ({ hotel_id }) => ({
        url: `/stores/${hotel_id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Hotels" }] as any,
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIDQuery,

  useListHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelSlice;
