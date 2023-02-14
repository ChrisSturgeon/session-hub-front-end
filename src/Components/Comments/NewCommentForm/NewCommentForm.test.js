import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NewCommentForm from './NewCommentForm';

describe('New Comment Form', () => {
  it('Displays form', () => {
    render(<NewCommentForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('Matches snapshot', () => {
    const { container } = render(<NewCommentForm />);
    expect(container).toMatchSnapshot();
  });

  it('Displays add button', () => {
    render(<NewCommentForm />);
    expect(
      screen.getByRole('button', { name: /Add Comment/i })
    ).toBeInTheDocument();
  });

  it('Displays textarea', () => {
    render(<NewCommentForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Textarea has placeholder', () => {
    render(<NewCommentForm />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Leave a comment!'
    );
  });

  it('Renders with zero character count', () => {
    render(<NewCommentForm />);
    expect(screen.getByTestId('character-count')).toHaveTextContent('0 / 1500');
  });

  it('Textarea updates on typing', () => {
    render(<NewCommentForm />);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'Session Hub');
    expect(textarea).toHaveTextContent('Session Hub');
  });

  it('Character count updates on typing', () => {
    render(<NewCommentForm />);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'Session Hub');
    expect(screen.getByTestId('character-count')).toHaveTextContent(
      '11 / 1500'
    );
  });

  it('Displays minimum character length error', () => {
    render(<NewCommentForm />);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'H');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    expect(screen.getByTestId('validation-error')).toBeInTheDocument();
  });
});
