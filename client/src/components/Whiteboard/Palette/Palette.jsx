import React from "react";
import newPage from "../../../assets/imgs/newPage2.png";
import s from "./Palette.module.css";

const colors = [
  "#fd0002",
  "#ff9700",
  "#fefb01",
  "#2e992f",
  "#0096fc",
  "#0042cf",
  "#fe00ff",
  "#666668",

  "#b90000",
  "#986432",
  "#aca800",
  "#21751f",
  "#0065ab",
  "#003353",
  "#9a319a",
  "#000000",
];

const sizes = [10, 20, 30];

function NewPage() {
  return (
    <div className={s.newPage}>
      <img src={newPage} alt="newPage-icon" />
    </div>
  );
}

function Colors() {
  return (
    <div className={s.colors}>
      {colors.map((c, i) => (
        <div
          key={`${c}_${i}`}
          className={s.color}
          style={{ backgroundColor: c }}
        ></div>
      ))}
    </div>
  );
}

function Circles({ size }) {
  return (
    <div className={s.circleContainer}>
      <div className={s.circle} style={{ width: size, height: size }}></div>
    </div>
  );
}

function Palette() {
  return (
    <div className={s.container}>
      <NewPage />
      <Colors />
      <div className={s.sizes}>
        {sizes.map((s, i) => (
          <Circles key={`${i}_CircleSize`} size={s} />
        ))}
      </div>
    </div>
  );
}

export default Palette;
