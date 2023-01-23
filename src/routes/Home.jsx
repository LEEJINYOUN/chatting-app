import React, { useEffect, useState } from "react";
import { dbService, dbAddDoc, dbCollection, dbGetDocs } from "fbase";

const Home = function Home() {
  const [chatting, setChatting] = useState("");
  const [chatContents, setChatContents] = useState([]);
  const getChatting = async () => {
    const querySnapshot = await dbGetDocs(dbCollection(dbService, "chatting"));
    querySnapshot.forEach((document) => {
      const chatObject = {
        ...document.data(),
        id: document.id,
      };
      setChatContents((prev) => [chatObject, ...prev]);
    });
  };
  useEffect(() => {
    getChatting();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await dbAddDoc(dbCollection(dbService, "chatting"), {
        chatting,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setChatting("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setChatting(value);
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
        <input type="submit" value="제출" />
      </form>
      <div>
        {chatContents.map((item, id) => (
          <div key={id}>
            <h4>{item.chatting}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
