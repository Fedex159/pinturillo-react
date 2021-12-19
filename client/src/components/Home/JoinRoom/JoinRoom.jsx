import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer/FormContainer";
import Message from "../Message/Message";
import { joinRoom } from "../../../utils";
import { setAccess } from "../../../state/actions";
// import s from "./JoinRoom.module.css";

function JoinRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.id.value;
    const password = event.target.password.value;

    if (id && name) {
      joinRoom(id, password)
        .then((data) => {
          if (data.message) {
            dispatch(setAccess(true));
            navigate({ pathname: `/game/${id}` }, { replace: true });
          } else {
            setMessage("Id or password is incorrect!!!");
            setShowMessage(true);
          }
        })
        .catch((err) => console.log(err));
    } else if (id) {
      setMessage("Name is required!!!");
      setShowMessage(true);
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
      <Message show={showMessage} error={true}>
        <span>{message}</span>
      </Message>
    </FormContainer>
  );
}

export default JoinRoom;
