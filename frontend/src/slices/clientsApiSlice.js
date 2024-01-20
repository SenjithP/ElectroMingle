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
    }),
    electricianReview: builder.mutation({
      query: (data) =>({
        url: `${CLIENT_URL}/clientElectricianReview`,
        method: "POST",
        body: data,

      })
    }),
    getElectriciansReviews: builder.mutation({
      query: (params) => ({
        url: `${CLIENT_URL}/getElectriciansReviews?id=${params.id}`,
        method: "GET",
      }),
    }),

    getClientDetail: builder.mutation({
      query: (params) => ({
        url: `${CLIENT_URL}/getClientDetail?id=${params.id}`,
        method: "GET",
      }),
    }),
    updateClientProfile:builder.mutation({
      query: (data) =>({
        url: `${CLIENT_URL}/updateClientProfile`,
        method: "POST",
        body: data,

      })
    }),
  }),
});

export const {
  useGetElectriciansDetailsMutation,
  useGetSingleElectriciansDataMutation,
  useElectricianBookingMutation,
  useGetScheduledWorksMutation,
  useElectricianReviewMutation,
  useGetClientDetailMutation,
  useGetElectriciansReviewsMutation,
  useUpdateClientProfileMutation
} = clientApiSlice;
