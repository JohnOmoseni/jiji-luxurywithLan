import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN } from "./axios";
import { handleApiError } from "@/lib";

const baseQuery = fetchBaseQuery({
  baseUrl: API_DOMAIN || "",
  prepareHeaders: (headers, { getState }) => {
    const token = sessionStorage.getItem("token");

    token &&
      headers.set("Authorization", `Bearer 6|PusopccWtvcuq1QW8D5UjFjnLnvymIFOseLunPUAc54a1bd9`);

    return headers;
  },
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    const err = error as any;
    const message = err.response?.data?.message || err.message;
    console.error("[REQUEST ERROR RESPONSE]:", message);
    handleApiError(error);

    return Promise.reject(err);
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: ["Market", "Bookings", "Profile", "Complaint", "Listing", "Chat", "Review"],
});

export default api;