import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendCourseUrl = "http://localhost:3000/api/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Course_Lecture"],
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
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
    createCourseLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/createLecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLectures: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/getLectures`,
        method: "GET",
      }),
      providesTags: ["Refetch_Course_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: {
          lectureTitle,
          videoInfo,
          isPreviewFree,
        },
      }),
    }),
    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Course_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Course_Lecture"],
    }),
  }),
});

export const {
  useCreateNewCourseMutation,
  useGetInstructorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useCreateCourseLectureMutation,
  useGetCourseLecturesQuery,
  useEditLectureMutation,
  useDeleteLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;
