import React from "react";
import s from "./NavBar.module.css";

const items = [
  { id: "name", text: "Change Name" },
  { id: "create", text: "Create Room" },
  { id: "join", text: "Join Room" },
];

function NavBar({ setOption }) {
  const handleClick = (event) => {
    setOption(event.target.id);
  };

  return (
    <div className={s.container}>
      {items.map((item, i) => (
        <div key={`${item.id}_${i}`} id={item.id} onClick={handleClick}>
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default NavBar;
