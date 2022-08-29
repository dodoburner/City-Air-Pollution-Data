import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// axios.get('http://api.airvisual.com/v2/countries?key=d4281486-c6e5-40f2-a45a-666c2a800bae')
// .then(res => console.log(res.data.data))

// axios.get('https://parseapi.back4app.com/classes/Continentscountriescities_Continent?limit=10&keys=name', {
//   headers: {
//     'X-Parse-Application-Id': 'mfpmjU4NFMM0RudR7jTsImrVvH16ZG7aqJhqWoiZ', // This is your app's application id
//     'X-Parse-REST-API-Key': '5kDXPpyzOXoLdqeid6koqIX7TVKpK97k1GEw33BK', // This is your app's REST API key
//   }}
// )
// .then(res => console.log(res.data.results))
