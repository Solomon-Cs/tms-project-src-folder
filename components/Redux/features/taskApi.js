import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
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
    getTasksList: builder.query({
      query: () => "/api/tasks/get-tasks",
      transformResponse: (response) => response.data,
      providesTags: ["api"],

    }),
    getTask: builder.query({
      query: (id) => `/api/tasks/get-task/${id}`,
      transformResponse: (response) => response,
      providesTags: ["api"],
    }),
    getUserTasks: builder.query({
      query: (id) => `/api/tasks/get-user-tasks/{assigneeId}?userId=${id}`,
      transformResponse: (response) => response.data,
      providesTags: ["api"],
    }),
    getUserProject: builder.query({
      query: (id) => `/api/tasks/get-project-tasks/{userId}?projectId=${id}`,
      transformResponse: (response) => response.data,
      providesTags: ["api"],
    }),
    getUserProjectCount: builder.query({
      query: (id) => `/api/tasks/get-project-tasks/{userId}?projectId=${id}`,
      transformResponse: (response) => response.count,
      providesTags: ["api"],
    }),
    addTask: builder.mutation({
      query: (tasks) => ({
        url: "/api/tasks/create-task",
        method: "POST",
        body: tasks,
      }),
      invalidatesTags: ["api"],
    }),
    updateTask: builder.mutation({
      query: (tasks) => ({
        url: `/api/tasks/update-task`,
        method: "PUT",
        body: tasks,
      }),
      invalidatesTags: ["api"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/tasks/delete-task/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["api"],
    }),
  }),
});

export const {
  useGetTasksListQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useGetUserTasksQuery,
  useDeleteTaskMutation,
  useGetUserProjectQuery,
  useGetUserProjectCountQuery
} = taskApi;
