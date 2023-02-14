import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FriendCard from './FriendCard';

const mockFriendData = {
  username: 'Chris Sturgeon',
  _id: '1ab2c3',
  thumbURL: 'https://i.imgur.com/RpjwdOf.png',
};

describe('Friend Card', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <FriendCard friendData={mockFriendData} />
      </BrowserRouter>
    );
  };

  it('renders', () => {
    setup();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <FriendCard friendData={mockFriendData} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('Links to correct user profile', () => {
    setup();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/profile/1ab2c3/posts'
    );
  });

  it('Displays image with correct src from props', () => {
    setup();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://i.imgur.com/RpjwdOf.png'
    );
  });

  it('Displays username from props', () => {
    setup();
    expect(screen.getByTestId('username')).toHaveTextContent('Chris Sturgeon');
  });
});
