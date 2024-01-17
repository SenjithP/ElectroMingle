import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/auth'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        clientLogin:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/client_login`,
                method:'POST',
                body:data
            })
        }),
        electricianLogin:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/electrician_login`,
                method:'POST',
                body:data
            })
        }),
        
        register:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data
            })
        }),

        sendOtpToServer:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/sendOtp`,
                method:'POST',
                body:data
            })
        }),

        userLogout:builder.mutation({
            query:()=>({ 
                url:`${USERS_URL}/userLogout`,
                method:"POST",
            })
        }),
        electricianLogout:builder.mutation({
            query:()=>({ 
                url:`${USERS_URL}/electricianLogout`,
                method:"POST",
            })
        }),
        
    })
})

export const {useClientLoginMutation,useElectricianLoginMutation, useRegisterMutation,useSendOtpToServerMutation, useUserLogoutMutation,useElectricianLogoutMutation} = usersApiSlice;