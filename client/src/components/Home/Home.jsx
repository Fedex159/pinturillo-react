import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Name from "./Name/Name";
import CreateRoom from "./CreateRoom/CreateRoom";
import JoinRoom from "./JoinRoom/JoinRoom";
import s from "./Home.module.css";

const options = {
  name: <Name />,
  create: <CreateRoom />,
  join: <JoinRoom />,
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
