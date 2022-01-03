import React, { useState } from "react";
import newPage from "../../../../assets/imgs/newPage2.png";
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
  const [selected, setSelected] = useState("#000000");

  const handleClick = (event) => {
    changeColor(event.target.id);
    setSelected(event.target.id);
  };

  return (
    <div className={s.colors}>
      {colors.map((c, i) => (
        <div
          id={c}
          key={`${c}_${i}`}
          className={`${s.color} ${selected === c ? s.colorSelected : null}`}
          style={{ backgroundColor: c }}
          onClick={handleClick}
        ></div>
      ))}
    </div>
  );
}

function Brushes({ changeBrush }) {
  const [selected, setSelected] = useState("10");

  const handleClick = (event) => {
    const value = event.target.id.split("brush_")[1];
    changeBrush(value);
    setSelected(value);
  };

  return (
    <div className={s.brushes}>
      {brushSizes.map((size, i) => (
        <div
          key={`${i}_CircleSize`}
          className={`${s.brush} ${
            selected === String(size) ? s.brushSelected : null
          }`}
        >
          <div
            id={"brush_" + size}
            className={s.circle}
            onClick={handleClick}
            style={{ width: size, height: size }}
          ></div>
        </div>
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
