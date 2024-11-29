import api from "../api";

export const complaintSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllComplaints: builder.query({
      query: () => `/complaints`,
    }),

    getComplaintByID: builder.query({
      query: ({ complaint_id }: { complaint_id: number }) => `/complaints/${complaint_id}`,
    }),

    createComplaint: builder.mutation({
      query: ({ complaint_id, ...payload }: any) => ({
        url: `/complaints/${complaint_id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Complaint" }] as any,
    }),

    updateComplaint: builder.mutation({
      query: ({
        complaint_id,
        ...payload
      }: {
        complaint_id: number;
        title: string;
        category_id: number;
      }) => ({
        url: `/complaints/${complaint_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "Complaint" }] as any,
    }),

    deleteComplaint: builder.mutation({
      query: ({ complaint_id }) => ({
        url: `/complaints/${complaint_id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Complaint" }] as any,
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {} = complaintSlice;
