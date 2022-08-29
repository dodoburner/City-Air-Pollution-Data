import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Continent from "./components/Continent";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/continent" element={<Continent />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
