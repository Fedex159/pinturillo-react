import React from "react";
import s from "./NavBar.module.css";

const items = ["Create Room", "Join Room", "Change Name"];

function NavBar() {
  return (
    <div className={s.container}>
      {items.map((item, i) => (
        <div key={`${item}_${i}`}>{item}</div>
      ))}
    </div>
  );
}

export default NavBar;
