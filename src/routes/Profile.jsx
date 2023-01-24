import React, { useEffect, useState } from "react";
import {
  authService,
  authUpdateProfile,
  dbService,
  dbCollection,
  dbGetDocs,
  dbQuery,
  dbWhere,
  dbOrderBy,
} from "fbase";
import { Link } from "react-router-dom";

export default function Profile({ userObj, refreshUser }) {
  const onLogOutClick = () => authService.signOut();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const getMyChats = async () => {
    const query = dbQuery(
      dbCollection(dbService, "chatting"),
      dbWhere("creatorId", "==", userObj.uid),
      dbOrderBy("createdAt", "asc")
    );
    const querySnapshot = await dbGetDocs(query);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyChats();
  });
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await authUpdateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={newDisplayName} />
        <input type="submit" value="프로필 업데이트" />
      </form>
      <Link to="/" onClick={onLogOutClick}>
        로그아웃
      </Link>
    </>
  );
}
