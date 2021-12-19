import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsersRoom } from "../../utils";
import s from "./Users.module.css";

function Users({ socket, id }) {
  const access = useSelector((state) => state.access);
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (socket) {
      if (!access) {
        socket.disconnect();
        setRedirect(true);
      }
      socket.on("connect", () => {
        socket.emit("room", id);
        socket.emit("user connected", socket.id, id);
        getUsersRoom(id).then((data) => {
          if (data) {
            setUsers(data);
            return;
          }
        });
      });

      socket.on("user connected", (userId) => {
        setUsers((prev) => [...prev, userId]);
      });

      socket.on("message", (data) => {
        console.log(data);
      });

      socket.on("user disconnected", (id) => {
        setUsers((prev) => {
          return prev.filter((u) => u !== id);
        });
      });
    }
  }, [socket, id, access]);

  return (
    <div className={s.container}>
      Users
      {users.map((user) => (
        <h2 key={user}>{user}</h2>
      ))}
      {redirect ? <Navigate to="/" replace={true} /> : null}
    </div>
  );
}

export default Users;
