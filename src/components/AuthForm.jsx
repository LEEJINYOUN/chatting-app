import "./css/AuthForm.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";

export default function AuthForm({ newAccount }) {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입이 되었습니다.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 되었습니다. 환영합니다.");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("존재하는 이메일입니다.");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("비밀번호가 일치하지 않습니다.");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("비밀번호는 6자 이상이어야 합니다.");
      }
    }
  };
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <>
      <div className="mainIconBox">
        <AiOutlineMessage className="mainIcon" />
      </div>
      <form onSubmit={onSubmit} className="authForm">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authSubmit"
          value={newAccount ? "회원가입" : "로그인"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
    </>
  );
}
