import React, { useState } from "react";
import NavBar from "../../components/Home/NavBar/NavBar";
import Name from "../../components/Home/Name/Name";
import CreateRoom from "../../components/Home/CreateRoom/CreateRoom";
import JoinRoom from "../../components/Home/JoinRoom/JoinRoom";
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
