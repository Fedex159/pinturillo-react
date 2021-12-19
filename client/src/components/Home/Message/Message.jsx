import React from "react";
import s from "./Message.module.css";

function Message({ children, show, error }) {
  return (
    <div
      className={`${s.text} ${error ? s.textError : s.textSuccess} ${
        show ? s.show : s.hide
      }`}
    >
      {show ? children : null}
    </div>
  );
}

export default Message;
