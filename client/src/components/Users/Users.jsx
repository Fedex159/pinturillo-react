import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import s from "./Users.module.css";

function Users({ socket, id }) {
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("room", id);
        socket.emit("user connected", socket.id, id);
        axios
          .get(`http://localhost:3001/rooms/${id}`)
          .then((response) => response.data)
          .then((data) => {
            if (data) {
              setUsers(data.users);
              return;
            }
            socket.disconnect();
            setRedirect(true);
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
  }, [socket, id]);

  return (
    <div className={s.container}>
      Users
      {users.map((user) => (
        <h2 key={user}>{user}</h2>
      ))}
      {redirect ? <Navigate to="/" /> : null}
    </div>
  );
}

export default Users;
