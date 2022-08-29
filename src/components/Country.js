import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function Country() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name } = location.state

  useEffect(() => {
    (async () => {
      const data = await axios.get(`http://api.airvisual.com/v2/states?country=${name}&key=d4281486-c6e5-40f2-a45a-666c2a800bae`);
      const allStates = data.data.data;
      console.log(allStates)
    })()
  })

  return (
    <div>
      HeyyAAA
    </div>
  )
}