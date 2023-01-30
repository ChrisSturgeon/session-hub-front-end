import './CommentCard.css';
import { useState } from 'react';
import { format } from 'date-fns';
import { sanitize } from 'dompurify';
import { Link } from 'react-router-dom';
import LikeForm from '../../LikeForm/LikeForm';

export default function CommentCard({ comment }) {
  const {
    createdDate,
    editedDate,
    sessionID,
    _id: commentID,
    text,
    userID,
    username,
    likesCount,
    hasLiked,
  } = comment;
  const formattedDate = format(new Date(createdDate), 'EEEE do MMM yy pp');
  const profileURL = `/profile/${userID}`;
  const [liked, setLiked] = useState(hasLiked);
  const [totalLikes, setTotalLikes] = useState(likesCount);

  return (
    <div className="comment-card">
      <div className="comment-card-username">
        <Link to={profileURL}>{username}</Link>
      </div>
      <div className="comment-card-date">{formattedDate}</div>
      <div
        className="comment-card-text"
        dangerouslySetInnerHTML={{ __html: sanitize(text) }}
      ></div>
      <div>I'm the ID: {commentID}</div>
      <LikeForm
        type={'comment'}
        sessionID={sessionID}
        commentID={commentID}
        liked={liked}
        setLiked={setLiked}
        totalLikes={totalLikes}
        setTotalLikes={setTotalLikes}
      />
    </div>
  );
}
