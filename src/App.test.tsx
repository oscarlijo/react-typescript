import React from 'react';
import { render, screen } from '@testing-library/react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';

test('renders learn react link', () => {
  render(
  <Provider store={store}>
    <App />
  </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
