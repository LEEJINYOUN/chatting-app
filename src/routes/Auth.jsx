import "./css/Auth.css";
import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { useState } from "react";

const Auth = function Auth() {
  const [newAccount, setNewAccount] = useState(true);
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <>
      <AuthForm newAccount={newAccount} />
      <div className="authSwitchContainer">
        {newAccount ? (
          <>
            <span className="authQuestion">회원인가요?</span>
            <span onClick={toggleAccount} className="authSwitch">
              로그인
            </span>
          </>
        ) : (
          <>
            <span className="authQuestion">처음인가요?</span>
            <span onClick={toggleAccount} className="authSwitch">
              회원가입
            </span>
          </>
        )}
      </div>
      <div className="authOtherWay">
        <button
          onClick={onSocialClick}
          name="google"
          className="otherWayBtn googleBtn"
        >
          구글 로그인
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="otherWayBtn githubBtn"
        >
          깃허브 로그인
        </button>
      </div>
    </>
  );
};

export default Auth;
