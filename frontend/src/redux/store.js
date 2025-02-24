import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

// Create the Redux store with the root reducer (contains combined reducers) and middleware.
export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

// to hit api end points whenever page is refreshed
const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.getUserProfileDetails.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
