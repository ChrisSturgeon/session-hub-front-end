import './CommentCard.css';
import { useState, useContext } from 'react';
import { format, set } from 'date-fns';
import { sanitize } from 'dompurify';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

export default function CommentCard({ comment }) {
  const {
    createdDate,
    editedDate,
    likes,
    sessionID,
    text,
    userID,
    username,
    _id,
    likesCount,
    hasLiked,
  } = comment;
  const formattedDate = format(new Date(createdDate), 'EEEE do MMM yy pp');
  const profileURL = `/profile/${userID}`;
  const [liked, setLiked] = useState(hasLiked);
  const [totalLikes, setTotalLikes] = useState(likesCount);
  const [btnActive, setBtnActive] = useState(true);

  // Updates
  async function handleLikeSubmit(event) {
    event.preventDefault();
    const putURL = `http://localhost:3000/api/sessions/${sessionID}/comments/${_id}/like`;
    setBtnActive(false);

    try {
      let bodyObject;
      if (liked) {
        bodyObject = JSON.stringify({ wantsToLike: 'false' });
      } else {
        bodyObject = JSON.stringify({ wantsToLike: 'true' });
      }
      const response = await fetch(putURL, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: bodyObject,
      });

      const data = await response.json();

      if (response.status === 404 || response.status === 409) {
        console.log(data.message);
        setBtnActive(true);
        return;
      }

      if (response.status === 201) {
        setLiked((prev) => true);
        setBtnActive(true);
      }

      if (response.status === 200) {
        setLiked((prev) => false);
        setBtnActive(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      <div>I'm the ID: {_id}</div>
      <form className="comment-card-like-form" onSubmit={handleLikeSubmit}>
        <button disabled={!btnActive}>
          {liked ? (
            <ion-icon name="heart"></ion-icon>
          ) : (
            <ion-icon name="heart-outline"></ion-icon>
          )}
        </button>
        <div> {totalLikes}</div>
      </form>
    </div>
  );
}
