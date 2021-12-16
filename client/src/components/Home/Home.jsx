import React from "react";
import Name from "./Name/Name";
import s from "./Home.module.css";

function Home() {
  return (
    <div className={s.container}>
      <Name />
    </div>
  );
}

export default Home;
