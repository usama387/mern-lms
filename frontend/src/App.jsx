import React from "react";
import LoginPage from "./pages/Login";
import { HeroSection } from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyCourses from "./pages/student/MyCourses";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
              <Courses />
            </>
          ),
        },
        { path: "/login", element: <LoginPage /> },
        { path: "/my-courses", element: <MyCourses /> },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

export default App;
