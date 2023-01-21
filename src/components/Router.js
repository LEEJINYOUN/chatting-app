import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

export default function Router({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Auth />}></Route>
      <Route path="/editProfile" element={<EditProfile />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}
