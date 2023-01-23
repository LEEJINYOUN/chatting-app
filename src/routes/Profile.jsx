import React from "react";
import { authService } from "fbase";
import { Link } from "react-router-dom";

export default function Profile() {
  const onLogOutClick = () => authService.signOut();
  return (
    <Link to="/" onClick={onLogOutClick}>
      로그아웃
    </Link>
  );
}
