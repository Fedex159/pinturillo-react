import React from "react";
import { createRoom } from "../../../utils";
import { useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer/FormContainer";
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
    <FormContainer>
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title*" required />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Create</button>
      </form>
    </FormContainer>
  );
}

export default CreateRoom;
