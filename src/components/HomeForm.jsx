import "./css/HomeForm.css";
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
    setChatFile("");
  };
  return (
    <div className="homeFormContainer">
      <form onSubmit={onSubmit} className="homeForm">
        <div className="homeFormFile">
          {chatFile ? (
            <div className="homeFormFileUpload">
              <div className="homeFormFileClear" onClick={onClearFile}>
                <span>취소</span>
              </div>
              <div className="homeFormFileImage">
                <img
                  src={chatFile}
                  style={{
                    backgroundImage: chatFile,
                  }}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <label htmlFor="FileUpload" className="homeFormFileInput">
              <span>사진 추가</span>
            </label>
          )}
          <input
            id="FileUpload"
            className="fileInput"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        <div className="homeFormInput">
          <input
            type="text"
            value={chatting}
            onChange={onChange}
            maxLength={120}
          />
        </div>
        <div className="homeFormSubmit">
          <input type="submit" value="입력" />
        </div>
      </form>
    </div>
  );
}
