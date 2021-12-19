import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../state/actions/index";
import FormContainer from "../FormContainer/FormContainer";
import Message from "../Message/Message";
// import s from "./Name.module.css";

function Name() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.name.value;

    if (value) {
      dispatch(setName(value));
      setShowMessage(true);
    }
  };

  return (
    <FormContainer>
      <h2>Change Name</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" defaultValue={name} />
        <button type="submit">Save</button>
      </form>
      <Message show={showMessage} error={false}>
        <span>Name saved!!!</span>
      </Message>
    </FormContainer>
  );
}

export default Name;
