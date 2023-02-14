import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentCard from './CommentCard';
import { BrowserRouter } from 'react-router-dom';

const mockComment = {
  createdDate: new Date('February 14, 2023 03:24:00'),
  sessionID: '523452345',
  _id: '234234',
  text: 'This is just a test comment',
  userID: '234q34',
  likesCount: 72,
  hasLiked: true,
  userDetails: [{ thumbURL: 'https://i.imgur.com/RpjwdOf.png' }],
  username: 'Chris Sturgeon',
};

describe('Comment Card', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <CommentCard comment={mockComment} />
      </BrowserRouter>
    );
  };

  it('renders', () => {
    setup();
    expect(screen.getByTestId('comment-card')).toBeInTheDocument();
  });

  it('Displays correctly formatted activity date and time', () => {
    setup();
    expect(
      screen.getByText('Tuesday 14th Feb 23 at 03:24am')
    ).toBeInTheDocument();
  });

  it('Links to correct user profile', () => {
    setup();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/profile/234q34');
  });

  it('Displays user img src from props', () => {
    setup();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://i.imgur.com/RpjwdOf.png'
    );
  });

  it('Displays comment text from props', () => {
    setup();
    expect(screen.getByText('This is just a test comment')).toBeInTheDocument();
  });
});
