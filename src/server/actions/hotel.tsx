import api from "../api";

export const hotelSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: () => `/stores`,
      providesTags: (result) => {
        console.log("RESULT", result);
        return [
          { type: "Hotels", id: "LIST" },
          ...(result?.data?.data?.map(({ id }: { id: number }) => ({ type: "Hotels", id })) || []),
        ];
      },
    }),

    getHotelByID: builder.query({
      query: ({ hotel_id }) => `/stores/${hotel_id}`,
      // @ts-ignore
      providesTags: (result, error, arg) => [{ type: "Hotels", id: arg.hotel_id }],
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
