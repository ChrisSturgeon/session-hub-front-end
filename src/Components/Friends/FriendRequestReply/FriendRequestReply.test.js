import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendRequestReply from './FriendRequestReply';
import { BrowserRouter } from 'react-router-dom';

const mockRequestData = {
  _id: '56789',
  requesterDetails: [
    { thumbURL: '42342224', username: 'Chris Sturgeon', _id: '123456' },
  ],
};

describe('Friend Request Reply', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <FriendRequestReply requestData={mockRequestData} />
      </BrowserRouter>
    );
  };
  it('Renders', () => {
    setup();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Has correct link to requesters profile', () => {
    setup();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/profile/123456/posts'
    );
  });

  it('Displays username from props', () => {
    setup();
    expect(
      screen.getByText('Chris Sturgeon wants to be your friend!')
    ).toBeInTheDocument();
  });
});
