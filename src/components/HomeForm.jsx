import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbRef,
  dbUploadString,
  dbGetDownloadURL,
} from "fbase";

export default function HomeForm({ userObj, storage }) {
  const [chatting, setChatting] = useState("");
  const [chatFile, setChatFile] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    let chatFileUrl = "";
    if (chatFile !== "") {
      const fileRef = dbRef(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await dbUploadString(fileRef, chatFile, "data_url");
      chatFileUrl = await dbGetDownloadURL(response.ref);
    }
    const chattingObj = {
      text: chatting,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      chatFileUrl,
    };
    await dbAddDoc(dbCollection(dbService, "chatting"), chattingObj);
    setChatting("");
    setChatFile("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setChatting(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setChatFile(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearFile = () => {
    setChatFile(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={chatting}
        onChange={onChange}
        placeholder="오늘 기분"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="제출" />
      {chatFile && (
        <div>
          <img src={chatFile} width="50px" height="50px" alt="" />
          <button onClick={onClearFile}>취소</button>
        </div>
      )}
    </form>
  );
}
