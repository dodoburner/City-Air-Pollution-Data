import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Continent from './components/Continent';
import Country from './components/Country';
import City from './components/City';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/:continent" element={<Continent />} />
          <Route path="/:continent/:country" element={<Country />} />
          <Route path="/:continent/:country/:city" element={<City />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
