import { apiSlice } from "./apiSlice";

const POST_URL = "/api/electriciansPosts";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    electricianPosting: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/create-post`,
        method: "POST",
        body: data,
      }),
    }),
    electricianViewPosts: builder.mutation({
      query: () => ({
        url: `${POST_URL}/electrician/view-post`,
        method: "GET",
      }),
    }),
    electricianLikePost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/like-post`,
        method: "POST",
        body: data,
      }),
    }),
    electricianCommentPost: builder.mutation({
      query: (data) => ({      
        url: `${POST_URL}/electrician/comment-post`,
        method: "POST",
        body: data,
      }),
    }),
    electricianGetCommentPost: builder.mutation({
      query: (params) => ({
        url: `${POST_URL}/electrician/get-post-comments?id=${params.id}`,
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useElectricianPostingMutation,
  useElectricianViewPostsMutation,
  useElectricianLikePostMutation,
  useElectricianCommentPostMutation,
  useElectricianGetCommentPostMutation
} = postApiSlice;
