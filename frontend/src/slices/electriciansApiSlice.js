import { apiSlice } from "./apiSlice";
const ELECTRICIANS_URL = '/api/electricians'


export const elecriciansApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        updateElectricianProfile:builder.mutation({
            query:(data) => ({
                url:`${ELECTRICIANS_URL}/updateElectricianProfile`,
                method:'PUT',
                body:data
            })
        }),
        getDataToUpdateElectricianProfile:builder.mutation({
            query:(query)=>({
                url:`${ELECTRICIANS_URL}/getDataToUpdateElectricianProfile?id=${query.id}`,
                method:'GET',
            })
        }),
        getClientScheduledWorks: builder.mutation({
            query: () =>({
              url: `${ELECTRICIANS_URL}/getClientScheduledWorksData`,
              method: "GET",   
            })
        }),
        changeWorkStatus:builder.mutation({
            query:(data)=>({
                url:`${ELECTRICIANS_URL}/changeWorkStatus`,
                method:'POST',
                body:data
            })
        }),
        getElecticianDetails:builder.mutation({
            query:(query)=>({
                url:`${ELECTRICIANS_URL}/getElectricianDetails?id=${query.id}`,
                method:'GET',
            })
        }),
    })
})

export const {useUpdateElectricianProfileMutation, useGetDataToUpdateElectricianProfileMutation, useGetClientScheduledWorksMutation, useChangeWorkStatusMutation,useGetElecticianDetailsMutation} = elecriciansApiSlice;