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
      providesTags: ["Refetch_Creator_Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNewCourseMutation,
  useGetInstructorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
} = courseApi;
