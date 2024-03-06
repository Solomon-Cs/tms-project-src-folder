import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-management-opll.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => "/api/users/get-users",
      transformResponse: (response) => response.data,
      providesTags: ["api"],
    }),
    getUser: builder.query({
      query: (id) => `/api/users/get-user/${id}`,
      transformResponse: (response) => response,
      providesTags: ["api"],
    }),
    getUserCount: builder.query({
      query: (id) => `/api/users/get-user/${id}`,
      transformResponse: (response) => response.count,
      providesTags: ["api"],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/create-user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["api"],
    }),
    updateUser: builder.mutation({
      query: (project) => ({
        url: `/api/users/update-user`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["api"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/delete-user/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["api"],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserCountQuery,
} = usersApi;
