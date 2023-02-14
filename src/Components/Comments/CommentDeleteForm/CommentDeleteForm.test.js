import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CommentDeleteForm from './CommentDeleteForm';

describe('Comment Delete Form', () => {
  render(<CommentDeleteForm />);
  it('Activation button renders', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Displays form on activation button click', () => {
    render(<CommentDeleteForm />);
    const activationButton = screen.getByRole('button');
    userEvent.click(activationButton);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('Cancel button hides form', () => {
    render(<CommentDeleteForm />);
    const activationButton = screen.getByRole('button');
    userEvent.click(activationButton);
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    userEvent.click(cancelButton);

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });
});
