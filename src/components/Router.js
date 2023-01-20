import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Home /> : <Auth />,
    },
    {
      path: "/edit-profile",
      element: <EditProfile />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return router;
};

export default function Router() {
  const router = AppRouter();
  return <RouterProvider router={router} />;
}
