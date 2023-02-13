import './LikeForm.css';
import { useState } from 'react';
import { APIURL } from '../../api';

export default function LikeForm({
  type,
  sessionID,
  commentID,
  liked,
  setLiked,
  totalLikes,
  setTotalLikes,
}) {
  const [btnActive, setBtnActive] = useState(true);

  async function handleLikeSubmit(event) {
    event.preventDefault();
    let URL = '';
    let fetchMethod = '';

    if (type === 'session') {
      URL = `${APIURL}/sessions/${sessionID}/like`;
    }

    if (type === 'comment') {
      URL = `${APIURL}/sessions/${sessionID}/comments/${commentID}/like`;
    }

    if (liked) {
      fetchMethod = 'DELETE';
    } else {
      fetchMethod = 'PUT';
    }

    setBtnActive(false);

    try {
      const response = await fetch(URL, {
        method: fetchMethod,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
      });

      const data = await response.json();

      if (response.status === 404 || response.status === 409) {
        console.log(data.message);
        setBtnActive(true);
        return;
      }

      if (response.status === 201) {
        setLiked((prev) => true);
        setTotalLikes((prev) => prev + 1);
        setBtnActive(true);
      }

      if (response.status === 200) {
        setLiked((prev) => false);
        setTotalLikes((prev) => prev - 1);
        setBtnActive(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form className="like-form" onSubmit={handleLikeSubmit}>
      <button disabled={!btnActive}>
        {liked ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
      </button>
      <div> {totalLikes}</div>
    </form>
  );
}
