import { apiSlice } from "./apiSlice";

const CLIENT_URL = "/api/client";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getElectriciansDetails: builder.mutation({
      query: () => ({
        url: `${CLIENT_URL}/getElectricians`,
        method: "GET",
      }),
    }),
    getSingleElectriciansData: builder.mutation({
      query: (params) => ({
        url: `${CLIENT_URL}/getSingleElectriciansData?id=${params.id}`,
        method: "GET",
      }),
    }),
    electricianBooking: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}/electricianBooking`,
        method: "POST",
        body: data,
      }),
    }),
    getScheduledWorks: builder.mutation({
      query: () =>({
        url: `${CLIENT_URL}/getScheduledWorksData`,
        method: "GET",
      })
    })
  }),
});

export const {
  useGetElectriciansDetailsMutation,
  useGetSingleElectriciansDataMutation,
  useElectricianBookingMutation,
  useGetScheduledWorksMutation,
  
} = clientApiSlice;
