import './NewCommentForm.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import { useParams } from 'react-router-dom';

export default function NewCommentForm() {
  const user = useContext(UserContext);

  const { sessionID } = useParams();
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  function handleChange(event) {
    setText((prev) => event.target.value);
  }

  useEffect(() => {
    setCharacterCount((prev) => text.length);
  }, [text]);

  async function handleSubmit(event) {
    event.preventDefault();
    const sessionURL = `http://localhost:3000/api/sessions/${sessionID}/comments/new`;

    try {
      const commentObj = {
        date: new Date(),
        text: text,
      };
      const response = await fetch(sessionURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: JSON.stringify(commentObj),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log(data.message);
        return;
      }

      if (response.status === 404) {
        console.log(data.message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {show && (
        <form onSubmit={handleSubmit} className="new-comment-form">
          <label>New Comment as {user.username}</label>
          <textarea onChange={handleChange} value={text}></textarea>
          <div className="character-count">{characterCount} / 1500 </div>
          <button>Submit Comment</button>
        </form>
      )}
    </>
  );
}
