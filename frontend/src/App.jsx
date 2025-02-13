import React from "react";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import { HeroSection } from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

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
              {/* Courses */}
            </>
          ),
        },
        { path: "/login", element: <LoginPage /> },
      ],
    },
  ]);

  return (
    <main>
    <RouterProvider router={appRouter}/>
    </main>
  );
};

export default App;
