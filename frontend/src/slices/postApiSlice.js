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
    electricianLikeComment: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/like-comment`,
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
    saveElectricianPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/save-posts`,
        method: "POST",
        body: data,
      }),
    }),
    getSavedPosts: builder.mutation({
      query: (params) => ({
        url: `${POST_URL}/electrician/get-saved-post?id=${params.id}`,
        method: "GET",
      }),
    }),
    getMyPosts: builder.mutation({
      query: (params) => ({
        url: `${POST_URL}/electrician/get-my-post?id=${params.id}`,
        method: "GET",
      }),
    }),
    ReplyCommentPost:builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/reply-comment`,
        method: "POST",
        body: data,
      }),
    }),
    deleteReplyComment:builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/deleteReplyComment`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteComment:builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/deleteComment`,
        method: "DELETE",
        body: data,
      }),
    }),
    deletePost:builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/electrician/deletePost`,
        method: "DELETE",
        body: data,
      }),
    })
  }),
});

export const {
  useElectricianPostingMutation,
  useElectricianViewPostsMutation,
  useElectricianLikePostMutation,
  useElectricianLikeCommentMutation,
  useElectricianCommentPostMutation,
  useElectricianGetCommentPostMutation,
  useSaveElectricianPostMutation,
  useGetSavedPostsMutation,
  useGetMyPostsMutation,
  useReplyCommentPostMutation,
  useDeleteReplyCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation
} = postApiSlice;
