import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsersRoom } from "../../utils";
import pencil from "../../assets/imgs/pencil.png";
import s from "./Users.module.css";

function UserCard({ index, name, points }) {
  return (
    <div className={s.cardUser}>
      <span>{index + 1}</span>
      <div className={s.userInfo}>
        <h2>{points}</h2>
        <h2>{name}</h2>
      </div>
      <img src={pencil} alt="pencil" />
    </div>
  );
}

function Users({ socket, id }) {
  const access = useSelector((state) => state.access);
  const name = useSelector((state) => state.name);
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connected) {
      getUsersRoom(id)
        .then((data) => {
          if (data) {
            setUsers(data);
          }
        })
        .catch((err) => console.log("Error getUsersRoom", err));
    }
  }, [id, connected]);

  useEffect(() => {
    if (socket) {
      if (!access) {
        socket.disconnect();
        setRedirect(true);
      }
      socket.on("connect", () => {
        socket.emit("room", id, name);
        socket.emit("user connected", socket.id, id, name);
        setConnected(true);
      });

      socket.on("user connected", (user) => {
        setUsers((prev) => [...prev, user]);
      });

      socket.on("user disconnected", (userId) => {
        setUsers((prev) => {
          return prev.filter((u) => u._id !== userId);
        });
      });
    }
  }, [socket, id, access, name]);

  return (
    <div className={s.container}>
      <h4>Users</h4>
      {users.map((user, index) => (
        <UserCard
          key={`${user._id}_${user.name}`}
          name={user.name}
          points={user.points}
          index={index}
        ></UserCard>
      ))}
      {redirect ? <Navigate to="/" replace={true} /> : null}
    </div>
  );
}

export default Users;
