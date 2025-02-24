import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendCourseUrl = "http://localhost:3000/api/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: backendCourseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createNewCourse: builder.mutation({
      query: (courseData) => ({
        url: "create",
        method: "POST",
        body: {
          title: courseData.courseTitle,
          category: courseData.courseCategory,
        },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getInstructorCourses: builder.query({
      query: () => ({
        url: "getCourses",
        method: "GET",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
  }),
});

export const { useCreateNewCourseMutation, useGetInstructorCoursesQuery } =
  courseApi;
