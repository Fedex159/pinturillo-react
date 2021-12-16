import React from "react";
import Users from "../Users/Users";
import Whiteboard from "../Whiteboard/Whiteboard";
import Chat from "../Chat/Chat";
import s from "./Game.module.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");

function Game() {
  return (
    <div className={s.container}>
      <Users socket={socket} />
      <Whiteboard socket={socket} />
      <Chat socket={socket} />
    </div>
  );
}

export default Game;
