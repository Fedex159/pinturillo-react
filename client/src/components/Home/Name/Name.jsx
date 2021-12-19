import React from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../../state/actions/index";
import FormContainer from "../FormContainer/FormContainer";
import s from "./Name.module.css";

function Name() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.name.value;

    if (value) {
      dispatch(setName(value));
      event.target.reset();
    }
  };

  return (
    <FormContainer>
      <h2>Change Name</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" />
        <button type="submit">Save</button>
      </form>
    </FormContainer>
  );
}

export default Name;
