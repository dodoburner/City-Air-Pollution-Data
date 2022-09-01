import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Continent from '../components/Continent';

const initialState = [
  {
    name: 'Europe',
    countries: [
      {
        name: 'Andorra',
        id: 1,
      },
      {
        name: 'Croatia',
        id: 2,
      },
    ],
  },
];

const reducer = (state) => state;

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

it('renders', () => {
  const continent = render(
    <Provider store={store}>
      <BrowserRouter>
        <Continent />
      </BrowserRouter>
    </Provider>,
  );

  expect(continent).toMatchSnapshot();
});
