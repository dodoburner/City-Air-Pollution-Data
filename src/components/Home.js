import { useSelector } from "react-redux";
import Tile from "./Tile";
import "../styles/Home.css";

export default function Home() {
  const continents = useSelector((state) => state.continents);

  return (
    <div className="home-container">
      {continents.map((continent, index) => {
        return (
          <Tile
            name={continent.name}
            index={index}
            key={continent.id}
            id={continent.id}
            type={'isContinent'}
          />
        );
      })}
    </div>
  );
}
