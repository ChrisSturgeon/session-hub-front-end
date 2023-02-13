import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CommentCard from './CommentCard';
import { BrowserRouter } from 'react-router-dom';

describe('Comment Card', () => {
  it('renders', () => {
    const mockComment = {
      createdDate: new Date(),
      sessionID: '523452345',
      _id: '234234',
      text: 'This is just a test comment',
      userID: '234q34',
      likesCount: 1,
      hasLiked: true,
      userDetails: ['http:www.asdf'],
    };
    render(
      <BrowserRouter>
        <CommentCard comment={mockComment} />
      </BrowserRouter>
    );
    expect(screen.getByTestId('comment-card')).toBeInTheDocument();
  });
});
