import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

export default function Navigation({ userObj }) {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <AiFillHome />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <BiUser />
            {userObj.displayName
              ? `${userObj.displayName}님의 프로필`
              : "프로필"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
