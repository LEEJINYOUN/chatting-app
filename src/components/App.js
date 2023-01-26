import "./css/App.css";
import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        let userObject = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        localStorage.setItem("userInformation", JSON.stringify(userObject));
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
    });
  }, []);
  return <Router isLoggedIn={isLoggedIn} userObj={userObj} />;
}

export default App;
