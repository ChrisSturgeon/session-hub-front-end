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
  const formattedDate = format(new Date(createdDate), 'EEEE do MMM yy');
  const formattedTime = format(new Date(createdDate), "hh:mmaaaaa'm'");
  const profileURL = `/profile/${userID}`;
  const [liked, setLiked] = useState(hasLiked);
  const [totalLikes, setTotalLikes] = useState(likesCount);
  const imgURL = comment.userDetails[0].thumbURL;

  return (
    <div className="comment-card">
      <div className="card-top">
        <div className="comment-card-username">
          <Link to={profileURL}>
            <span>
              {imgURL && <img src={imgURL} alt="profile"></img>}
              <div>{comment.username}</div>
            </span>
          </Link>
        </div>
        <div className="comment-card-date">
          {formattedDate} at {formattedTime}
        </div>
      </div>

      <div className="card-bottom">
        <div
          className="comment-card-text"
          dangerouslySetInnerHTML={{ __html: sanitize(text) }}
        ></div>

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
    </div>
  );
}
