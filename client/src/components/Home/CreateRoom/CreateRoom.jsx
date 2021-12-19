import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createRoom } from "../../../utils";
import { useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer/FormContainer";
import Message from "../Message/Message";
// import s from "./CreateRoom.module.css";

function CreateRoom() {
  const navigate = useNavigate();
  const name = useSelector((state) => state.name);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const password = event.target.password.value;

    if (title && name) {
      createRoom({ title, password })
        .then((data) => {
          navigate({ pathname: `/game/${data.message}` }, { replace: true });
        })
        .catch((err) => console.log(err));
    } else {
      setShowMessage(true);
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
      <Message show={showMessage} error={true}>
        <span>Name is required!!!</span>
      </Message>
    </FormContainer>
  );
}

export default CreateRoom;
