import "./css/Profile.css";
import React from "react";
import { authService } from "fbase";
import { Link } from "react-router-dom";

export default function Profile() {
  const onLogOutClick = () => {
    authService.signOut();
    window.localStorage.clear();
  };
  const userInformation = JSON.parse(localStorage.getItem("userInformation"));

  return (
    <div className="profileContainer">
      <div className="profileImage">
        {userInformation.photo === null ? (
          <img
            src="https://audition.hanbiton.com/images/common/img_default.jpg"
            alt=""
          />
        ) : (
          <img src={userInformation.photo} alt="" />
        )}
      </div>
      <div className="profileTitle">
        <h3>{userInformation.name}</h3>
        <span>안녕하세요. 환영합니다!</span>
        <span>{userInformation.email}</span>
      </div>
      <div className="profileLogout">
        <Link to="/" className="profileLogoutBtn" onClick={onLogOutClick}>
          로그아웃
        </Link>
      </div>
    </div>
  );
}
