import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendRequestForm from './FriendRequestForm';
import userEvent from '@testing-library/user-event';

describe('Friend Request Form', () => {
  it('Displays activation button on render', () => {
    render(<FriendRequestForm />);
    expect(screen.getByRole('button')).toHaveTextContent('Add Friend');
  });

  it('matches snapshot', () => {
    const { container } = render(<FriendRequestForm />);
    expect(container).toMatchSnapshot();
  });

  it('Displays form on button activation click', () => {
    render(<FriendRequestForm />);
    const activationButton = screen.getByRole('button', { name: 'Add Friend' });
    userEvent.click(activationButton);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('Hides form on cancel button click', () => {
    render(<FriendRequestForm />);
    const activationButton = screen.getByRole('button', { name: 'Add Friend' });
    userEvent.click(activationButton);
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });
});
