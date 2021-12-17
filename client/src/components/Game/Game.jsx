import React, { useEffect, useState } from "react";
import Users from "../Users/Users";
import Whiteboard from "../Whiteboard/Whiteboard";
import Chat from "../Chat/Chat";
import { useParams } from "react-router-dom";
import s from "./Game.module.css";
import { io } from "socket.io-client";

function Game() {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3001/"));
  }, []);

  return (
    <div className={s.container}>
      <Users socket={socket} id={id} />
      <Whiteboard socket={socket} id={id} />
      <Chat socket={socket} id={id} />
    </div>
  );
}

export default Game;
