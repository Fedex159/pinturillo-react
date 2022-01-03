import React from "react";
import pencil from "../../../../assets/imgs/pencil.png";
import s from "./UserCard.module.css";

function UserCard({ index, name, points }) {
  return (
    <div className={s.container}>
      <span>{index + 1}</span>
      <div className={s.info}>
        <h2>{points}</h2>
        <h2>{name}</h2>
      </div>
      <img src={pencil} alt="pencil" />
    </div>
  );
}

export default UserCard;
