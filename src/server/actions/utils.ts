import api from "../api";

export const utilsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllStates: builder.query({
      query: () => `/state`,
      transformResponse: (responseData: any) => {
        const data = responseData.data;

        const states =
          data?.map((state: any) => ({
            label: state.name.replace(/\s+State$/, ""), // Remove " State" if it's the last word
            value: String(state.id),
          })) ?? [];

        return states;
      },
    }),

    getAllLGAs: builder.query({
      query: ({ state_id }: { state_id?: string } = {}) => `/state/${state_id}/children`,
      transformResponse: (responseData: any) => {
        const data = responseData.data;

        const lgas = data?.map((lga: any) => ({ label: lga.name, value: String(lga.id) }));
        return lgas;
      },
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetAllStatesQuery, useGetAllLGAsQuery } = utilsSlice;
