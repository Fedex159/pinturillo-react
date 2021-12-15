import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./Users.module.css";

function Users({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      axios
        .get("http://localhost:3001/rooms/61b8e426d5c7eb84302b152e")
        .then((response) => response.data)
        .then((data) => setUsers(data.users));
    });

    socket.on("user connected", (id) => {
      setUsers((prev) => [...prev, id]);
    });

    socket.on("user disconnected", (id) => {
      setUsers((prev) => {
        return prev.filter((u) => u !== id);
      });
    });
  }, [socket]);

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
