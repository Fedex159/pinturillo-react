import React from "react";
import s from "./Header.module.css";

function Header({ counter, room, round, word, onClick }) {
  return (
    <div className={s.container}>
      <div className={s.counter}>
        <span>{counter}</span>
      </div>
      <div className={s.data}>
        <div className={s.info}>
          <h4>Room ID: {room}</h4>
          <h4>Round: {round}</h4>
        </div>
        <h3>{word}</h3>
      </div>
      <button onClick={onClick}>x</button>
    </div>
  );
}

export default Header;
