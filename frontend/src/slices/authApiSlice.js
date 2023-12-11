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
        shopLogin:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/shop_login`,
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
        shopLogout:builder.mutation({
            query:()=>({ 
                url:`${USERS_URL}/shopLogout`,
                method:"POST",
            })
        })
    })
})

export const {useClientLoginMutation,useElectricianLoginMutation,useShopLoginMutation, useRegisterMutation, useUserLogoutMutation,useElectricianLogoutMutation,useShopLogoutMutation} = usersApiSlice;