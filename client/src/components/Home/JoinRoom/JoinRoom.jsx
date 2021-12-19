import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer/FormContainer";
import s from "./JoinRoom.module.css";

function JoinRoom() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.id.value;
    const password = event.target.password.value;
    if (id) {
      axios
        .get(`http://localhost:3001/rooms?id=${id}&password=${password}`)
        .then((response) => response.data)
        .then((data) => {
          if (data.message) {
            navigate({ pathname: `/game/${id}` }, { replace: true });
          }
        });
      event.target.reset();
    }
  };

  return (
    <FormContainer>
      <h2>Join Room</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="ID*" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Join</button>
      </form>
    </FormContainer>
  );
}

export default JoinRoom;
