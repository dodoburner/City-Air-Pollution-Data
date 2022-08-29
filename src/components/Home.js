import { useSelector } from "react-redux";
import Option from "./Option";
import '../styles/Home.css';

export default function Home() {
  const continents = useSelector(state => state.continents)
  
  return (
    <div className="home-container">
      {continents.map((continent, index) => {
        return <Option name={continent.name} index={index} key={continent.id} id={continent.id}/>
      })}
    </div>
  )
}
