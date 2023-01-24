import React from "react";
import { dbService, dbDoc, dbDeleteDoc, dbDeleteObject, dbRef } from "fbase";

export default function Chat({ chatObj, isOwner, storage, chatFileUrl }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    const chatDelete = dbDoc(dbService, "chatting", `${chatObj.id}`);
    const urlRef = dbRef(storage, chatObj.chatFileUrl);
    if (ok) {
      await dbDeleteDoc(chatDelete);
      if (chatObj.chatFileUrl !== "") {
        await dbDeleteObject(urlRef);
      }
    }
  };
  return (
    <div key={chatObj.id}>
      <h4>{chatObj.text}</h4>
      {chatObj.chatFileUrl && (
        <img src={chatObj.chatFileUrl} width="50px" height="50px" alt="" />
      )}
      {isOwner && <button onClick={onDeleteClick}>삭제</button>}

      <h6>{new Date(chatObj.createdAt).toLocaleString()}</h6>
    </div>
  );
}
