import './CommentDeleteForm.css';
import { useState } from 'react';
import { APIURL } from '../../../api';

export default function CommentDeleteForm({ commentID, setCommentIsVisible }) {
  const [formVisible, setFormVisible] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const url = `${APIURL}/comments/${commentID}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
      });

      if (response.status === 200) {
        setCommentIsVisible(false);
      } else {
        console.log('An error has occured');
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!formVisible) {
    return (
      <button
        onClick={() => setFormVisible(true)}
        className="comment-delete activate-btn"
      >
        <span>
          <ion-icon name="trash-outline"></ion-icon>
          <div>Remove</div>
        </span>
      </button>
    );
  }

  return (
    <div className="comment-delete confirm-cancel">
      <form onSubmit={(event) => handleSubmit(event)}>
        <button className="confirm-btn">Confirm</button>
      </form>
      <button onClick={() => setFormVisible(false)} className="cancel-btn">
        Cancel
      </button>
    </div>
  );
}
