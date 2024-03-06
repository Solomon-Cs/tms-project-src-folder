import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../components/Redux/SearchSlice/SearchSlice";
import { taskApi } from "../components/Redux/features/taskApi";
import { projectApi } from "../components/Redux/features/projectApi";
import { usersApi } from "../components/Redux/features/usersApi";
import filterReducer from "../components/Redux/FilterSlice/FilterSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filters: filterReducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      taskApi.middleware,
      projectApi.middleware,
      usersApi.middleware
    ),
});
