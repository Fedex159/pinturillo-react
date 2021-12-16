import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Name from "./Name/Name";
import CreateRoom from "./CreateRoom/CreateRoom";
import s from "./Home.module.css";

const options = {
  name: <Name />,
  create: <CreateRoom />,
};

function Home() {
  const [option, setOption] = useState("name");

  return (
    <div className={s.container}>
      <NavBar setOption={setOption} />
      {options[option]}
    </div>
  );
}

export default Home;
