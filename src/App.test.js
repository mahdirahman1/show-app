import { render, screen } from '@testing-library/react';
import App from './App';
import Header from "./components/UI/Header"
import AllShows from "./components/Shows/AllShows"

test('renders nav bar', () => {
  const div = document.createElement('div');
  render(<Header/>, div);
});

test('renders All shows without crashing', () => {
  const div = document.createElement('div');
  render(<AllShows></AllShows>, div);
});
