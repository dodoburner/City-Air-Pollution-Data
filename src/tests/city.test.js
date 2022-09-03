import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import City from '../components/City';

const initialState = [];

const reducer = (state) => state;

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

it('renders', () => {
  const city = render(
    <Provider store={store}>
      <BrowserRouter>
        <City />
      </BrowserRouter>
    </Provider>,
  );

  expect(city).toMatchSnapshot();
});
