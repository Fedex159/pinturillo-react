import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Game from "./containers/Game/Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/game/:id" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
