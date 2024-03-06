import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
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
    getProjectList: builder.query({
      query: () => "/api/projects/get-projects",
      transformResponse: (response) => response.data,
      providesTags: ["api"],
    }),
    updateProject: builder.mutation({
      query: (project) => ({
        url: `/api/projects/update-project`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["api"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/projects/delete-project/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["api"],
    }),
  }),
});

export const {
  useGetProjectListQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
