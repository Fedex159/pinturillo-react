import React from "react";
import s from "./CreateRoom.module.css";

function CreateRoom() {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title..." />
        <input type="password" name="password" placeholder="Password..." />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateRoom;
