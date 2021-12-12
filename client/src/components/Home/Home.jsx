import React from "react";
import Users from "../Users/Users";
import Whiteboard from "../Whiteboard/Whiteboard";
import Chat from "../Chat/Chat";
import s from "./Home.module.css";

function Home() {
  return (
    <div className={s.container}>
      <Users />
      <Whiteboard />
      <Chat />
    </div>
  );
}

export default Home;
