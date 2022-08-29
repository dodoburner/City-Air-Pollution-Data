import Option from "./Option";
import '../styles/Home.css';

export default function Home() {
  function createContinent(name, id) {
    return ({
      name,
      id
    })
  }
  const continents = [
    createContinent('Asia', 'mSxk54vkg6'),
    createContinent('Europe', '28HX8qDZHw'),
    createContinent('North America', 'vZNZcahFvu'),
    createContinent('South America', 'ISPUD93Or8'),
    createContinent('Africa', 'X2rEcTJnsE'),
    createContinent('Oceania', 'E6LHZzkHr6'),
    
  ]
  return (
    <div className="home-container">
      {continents.map((continent, index) => {
        return <Option name={continent.name} index={index} key={continent.id} id={continent.id}/>
      })}
    </div>
  )
}
