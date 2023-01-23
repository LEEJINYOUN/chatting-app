import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation.js";

export default function Router({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <></>
      </Routes>
    </>
  );
}
