import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminLogin`,
        method: "POST",
        body: data,
      }),
    }),
    getClientDetails: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminGetClientDetails`,
        method: "GET",
      }),
    }),
    clientBlockUnblock: builder.mutation({
      query: (clientId) => ({
        url: `${ADMIN_URL}/adminClientBlock_Unblock`,
        method: "POST",
        body: clientId,
      }),
    }),
    getElectricianDetails: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminElectricianDetails`,
        method: "GET",
      }),
    }),
    adminDashboardData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminDashboardData`,
        method: "GET",
      }),
    }),
    electricianBlockUnblock: builder.mutation({
      query: (electricianId) => ({
        url: `${ADMIN_URL}/adminElectricianBlock_Unblock`,
        method: "POST",
        body: electricianId,
      }),
    }),
    adminLogout:builder.mutation({
        query:()=>({ 
            url:`${ADMIN_URL}/adminLogout`,
            method:"POST",
        })
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetClientDetailsMutation,
  useClientBlockUnblockMutation,
  useGetElectricianDetailsMutation,
  useElectricianBlockUnblockMutation,
  useAdminDashboardDataMutation,
  useAdminLogoutMutation
} = adminApiSlice;
