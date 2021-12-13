import React from "react";
import Users from "../Users/Users";
import Whiteboard from "../Whiteboard/Whiteboard";
import Chat from "../Chat/Chat";
import s from "./Home.module.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");

function Home() {
  return (
    <div className={s.container}>
      <Users />
      <Whiteboard socket={socket} />
      <Chat />
    </div>
  );
}

export default Home;
