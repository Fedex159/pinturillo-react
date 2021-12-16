import React from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../../state/actions/index";
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
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Nick:
          <input name="name" placeholder="Name..." />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Name;
