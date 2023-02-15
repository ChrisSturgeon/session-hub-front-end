import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserCard from './UserCard';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../../App';

describe('User Card', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <UserContext.Provider></UserContext.Provider>
      </BrowserRouter>
    );
  };

  it('Renders', () => {
    expect(2 === 3).toBeTruthy();
  });
});
