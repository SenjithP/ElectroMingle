import { apiSlice } from "./apiSlice";
const AUTH_URL = '/api/auth'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        clientLogin:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/client_login`,
                method:'POST',
                body:data
            })
        }),
        electricianLogin:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/electrician_login`,
                method:'POST',
                body:data
            })
        }),
        
        register:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/register`,
                method:'POST',
                body:data
            })
        }),

        electricianFP:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/electricianForgotPassword`,
                method:'POST',
                body:data
            })
        }),

        ClientFP:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/clientForgotPassword`,
                method:'POST',
                body:data
            })
        }),

        sendOtpToServer:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/sendOtp`,
                method:'POST',
                body:data
            })
        }),

        userLogout:builder.mutation({
            query:()=>({ 
                url:`${AUTH_URL}/userLogout`,
                method:"POST",
            })
        }),
        electricianLogout:builder.mutation({
            query:()=>({ 
                url:`${AUTH_URL}/electricianLogout`,
                method:"POST",
            })
        }),
        
    })
})

export const {useClientLoginMutation,useElectricianLoginMutation, useRegisterMutation,useElectricianFPMutation,useClientFPMutation,useSendOtpToServerMutation, useUserLogoutMutation,useElectricianLogoutMutation} = usersApiSlice;