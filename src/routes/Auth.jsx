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
    <div>
      <AuthForm newAccount={newAccount} />
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
      <div>
        <button onClick={onSocialClick} name="google">
          구글로 로그인
        </button>
        <button onClick={onSocialClick} name="github">
          깃허브로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
