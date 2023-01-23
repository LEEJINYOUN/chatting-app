import React from "react";
import { dbService, dbDoc, dbDeleteDoc } from "fbase";

export default function Chat({ chatObj, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    const chatDelete = dbDoc(dbService, "chatting", `${chatObj.id}`);
    if (ok) {
      await dbDeleteDoc(chatDelete);
    }
  };
  return (
    <div key={chatObj.id}>
      <h4>{chatObj.text}</h4>
      {isOwner && <button onClick={onDeleteClick}>삭제</button>}

      <h6>{new Date(chatObj.createdAt).toLocaleString()}</h6>
    </div>
  );
}
