import Option from "./Option";
import '../styles/Home.css';

export default function Home() {
  const continents = ['Asia', 'Africa', 'Australia', 'Europe', 'Noth America', 'South America']
  return (
    <div className="home-container">
      {continents.map((continent, index) => {
        return <Option name={continent} index={index}/>
      })}
    </div>
  )
}
