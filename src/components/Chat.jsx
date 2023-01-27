import "./css/Chat.css";
import React from "react";
import { dbService, dbDoc, dbDeleteDoc, dbDeleteObject, dbRef } from "fbase";
import { BsFillTrashFill } from "react-icons/bs";

export default function Chat({ chatObj, isOwner, storage }) {
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
    <div
      className={
        isOwner
          ? "chatContainer chatContainerRight"
          : "chatContainer chatContainerLeft"
      }
    >
      <div
        className={isOwner ? "chat chatRight" : "chat chatLeft"}
        key={chatObj.id}
      >
        <h4>&lt;{chatObj.name}&gt;</h4>
        <h4>{chatObj.text}</h4>
        {chatObj.chatFileUrl && <img src={chatObj.chatFileUrl} alt="" />}
        {isOwner && (
          <div className="chatDelete">
            <span onClick={onDeleteClick}>
              <BsFillTrashFill />
            </span>
          </div>
        )}
        <h6>{new Date(chatObj.createdAt).toLocaleString()}</h6>
      </div>
    </div>
  );
}
