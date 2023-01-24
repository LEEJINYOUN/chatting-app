import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation.jsx";

export default function Router({ isLoggedIn, userObj, refreshUser }) {
  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile userObj={userObj} refreshUser={refreshUser} />}
        ></Route>
        <></>
      </Routes>
    </>
  );
}
