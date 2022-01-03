import React, { useEffect, useState } from "react";
import Users from "../../components/Game/Users/Users";
import Whiteboard from "../../components/Game/Whiteboard/Whiteboard";
import Chat from "../../components/Game/Chat/Chat";
import { useParams } from "react-router-dom";
import s from "./Game.module.css";
import { io } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

const URL_CONNECTION = process.env.REACT_APP_API || "http://localhost:3001";

function Game() {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(URL_CONNECTION));
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
