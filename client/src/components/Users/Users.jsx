import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./Users.module.css";

function Users({ socket, id }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("room", id);
        socket.emit("user connected", socket.id, id);
        axios
          .get(`http://localhost:3001/rooms/${id}`)
          .then((response) => response.data)
          .then((data) => setUsers(data.users));
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
    </div>
  );
}

export default Users;
