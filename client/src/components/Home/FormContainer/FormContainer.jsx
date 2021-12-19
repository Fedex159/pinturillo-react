import React from "react";
import s from "./FormContainer.module.css";

function FormContainer({ children }) {
  return <div className={s.container}>{children}</div>;
}

export default FormContainer;
