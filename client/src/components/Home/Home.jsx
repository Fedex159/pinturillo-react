import React from "react";
import NavBar from "./NavBar/NavBar";
import Name from "./Name/Name";
import s from "./Home.module.css";

function Home() {
  return (
    <div className={s.container}>
      <NavBar />
      <Name />
    </div>
  );
}

export default Home;
