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

const brushSizes = [10, 20, 30];

function NewPage({ clearPage }) {
  return (
    <div className={s.newPage} onClick={() => clearPage()}>
      <img src={newPage} alt="newPage-icon" />
    </div>
  );
}

function Colors({ changeColor }) {
  const handleClick = (event) => {
    changeColor(event.target.id);
  };

  return (
    <div className={s.colors}>
      {colors.map((c, i) => (
        <div
          id={c}
          key={`${c}_${i}`}
          className={s.color}
          style={{ backgroundColor: c }}
          onClick={handleClick}
        ></div>
      ))}
    </div>
  );
}

function Brush({ size, changeBrush }) {
  return (
    <div className={s.brush} onClick={() => changeBrush(size)}>
      <div className={s.circle} style={{ width: size, height: size }}></div>
    </div>
  );
}

function Brushes({ changeBrush }) {
  return (
    <div className={s.brushes}>
      {brushSizes.map((s, i) => (
        <Brush key={`${i}_CircleSize`} size={s} changeBrush={changeBrush} />
      ))}
    </div>
  );
}

function Palette({ clearPage, changeColor, changeBrush }) {
  return (
    <div className={s.container}>
      <NewPage clearPage={clearPage} />
      <Colors changeColor={changeColor} />
      <Brushes changeBrush={changeBrush} />
    </div>
  );
}

export default Palette;
