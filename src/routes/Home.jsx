import React, { useEffect, useState } from "react";
import {
  dbService,
  dbCollection,
  dbQuery,
  dbOnSnapshot,
  dbOrderBy,
  dbGetStorage,
} from "fbase";
import Chat from "components/Chat";
import HomeForm from "components/HomeForm";

const Home = function Home({ userObj }) {
  const [chatContents, setChatContents] = useState([]);
  useEffect(() => {
    const chatQuery = dbQuery(
      dbCollection(dbService, "chatting"),
      dbOrderBy("createdAt", "asc")
    );
    dbOnSnapshot(chatQuery, (snapshot) => {
      const chatArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setChatContents(chatArr);
    });
  }, []);
  const storage = dbGetStorage();
  return (
    <div>
      <HomeForm userObj={userObj} storage={storage} />
      <div>
        {chatContents.map((item) => (
          <Chat
            key={item.id}
            chatObj={item}
            isOwner={item.creatorId === userObj.uid}
            storage={storage}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
