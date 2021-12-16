import "./App.css";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
