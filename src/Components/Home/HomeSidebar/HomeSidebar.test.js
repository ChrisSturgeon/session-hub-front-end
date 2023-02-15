import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import HomeSidebar from './HomeSidebar';
import { BrowserRouter } from 'react-router-dom';
import { RequestContext, UserContext } from '../../../App';

const mockUser = {
  ID: '12345',
};

const mockSingleRequest = [
  {
    count: 1,
  },
];

const mockMultipleRequests = [
  {
    count: 5,
  },
];

const mockNoRequests = [
  {
    count: 0,
  },
];

describe('Home Sidebar', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUser}>
          <RequestContext.Provider value={mockSingleRequest}>
            <HomeSidebar />
          </RequestContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  it('Renders to screen', () => {
    setup();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('Displays link to pending friends request when present', () => {
    setup();
    expect(
      screen.getByTestId('friend-request-notification')
    ).toBeInTheDocument();
  });

  it('Informs of friend request as singular when only one present', () => {
    setup();
    expect(screen.getByTestId('friend-request-notification')).toHaveTextContent(
      'You have 1 pending friend request'
    );
  });

  it('Informs of friend requests as plural when multiple present', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUser}>
          <RequestContext.Provider value={mockMultipleRequests}>
            <HomeSidebar />
          </RequestContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('friend-request-notification')).toHaveTextContent(
      'You have 5 pending friends requests'
    );
  });

  it('Does not display link to pending friends request when none present', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUser}>
          <RequestContext.Provider value={mockNoRequests}>
            <HomeSidebar />
          </RequestContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(
      screen.queryByTestId('friend-request-notification')
    ).not.toBeInTheDocument();
  });

  it('Links to users update profile page', () => {
    setup();
    expect(
      screen.getByRole('link', { name: 'Edit my Profile' })
    ).toHaveAttribute('href', '/profile/12345/edit');
  });
});
