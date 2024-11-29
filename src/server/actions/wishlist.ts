import api from "../api";

export const wishlistSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserFavorites: builder.query({
      query: () => `/favourite-properties`,
    }),

    getUserFavoriteByID: builder.query({
      query: ({ listing_id }) => `/favourite-properties/${listing_id}`,
    }),

    getFavorite: builder.query({
      query: ({ listing_id, action }) =>
        action === "add"
          ? `/market/properties/${listing_id}/add-to-favourite`
          : `/favourite-properties/${listing_id}/unlike`,
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetAllUserFavoritesQuery, useGetUserFavoriteByIDQuery, useLazyGetFavoriteQuery } =
  wishlistSlice;
