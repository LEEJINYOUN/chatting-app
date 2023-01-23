import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbQuery,
  dbOnSnapshot,
  storageService,
} from "fbase";
import { getStorage, ref, uploadString } from "firebase/storage";
import Chat from "components/Chat";

const Home = function Home({ userObj }) {
  const [chatting, setChatting] = useState("");
  const [chatContents, setChatContents] = useState([]);
  const [chatFile, setChatFile] = useState();
  useEffect(() => {
    const chatQuery = dbQuery(dbCollection(dbService, "chatting"));
    dbOnSnapshot(chatQuery, (snapshot) => {
      const chatArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setChatContents(chatArr);
    });
  }, []);
  const storage = getStorage();
  const onSubmit = async (e) => {
    e.preventDefault();
    const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    const response = uploadString(fileRef, chatFile, "data_url");
    console.log(response);
    // try {
    //   await dbAddDoc(dbCollection(dbService, "chatting"), {
    //     text: chatting,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
    setChatting("");
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
    <div>
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
      <div>
        {chatContents.map((item) => (
          <Chat
            key={item.id}
            chatObj={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
