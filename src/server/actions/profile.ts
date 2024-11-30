import { UpdateProfilePasswordParams } from "@/types/api.types";
import api from "../api";

export const profileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/profile`,
      keepUnusedDataFor: 0,
      transformResponse: (responseData: any) => {
        const profile = responseData?.data;

        return profile;
      },
    }),

    updateProfile: builder.mutation({
      query: (payload: any) => ({
        url: `/profile`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Profile" }] as any,
    }),

    updateProfilePassword: builder.mutation({
      query: (payload: UpdateProfilePasswordParams) => ({
        url: `/profile/update-password`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),

    updateProfilePicture: builder.mutation({
      query: (formData: any) => ({
        url: `/profile`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: () => [{ type: "Profile" }] as any,
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePasswordMutation,
  useUpdateProfilePictureMutation,
} = profileSlice;
