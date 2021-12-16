import React from "react";
import { createRoom } from "../../../utils";
import { useNavigate } from "react-router-dom";
import s from "./CreateRoom.module.css";

function CreateRoom() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const password = event.target.password.value;

    if (title && password) {
      createRoom({ title, password })
        .then((data) => {
          event.target.reset();
          navigate(`/game/${data.message}`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title*" required />
        <input
          type="password"
          name="password"
          placeholder="Password*"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateRoom;
