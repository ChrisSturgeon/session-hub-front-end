import './NewCommentForm.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import { useParams, useNavigate } from 'react-router-dom';
import { APIURL } from '../../../api';
import { motion, AnimatePresence } from 'framer-motion';

const expandDown = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.5,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};

export default function NewCommentForm() {
  const navigate = useNavigate();
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
    const sessionURL = `${APIURL}/comments/${sessionID}`;

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
        setShow(false);
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
      <AnimatePresence mode="wait">
        {show && (
          <motion.form
            initial={expandDown.initial}
            animate={expandDown.animate}
            exit={expandDown.exit}
            onSubmit={handleSubmit}
            className="new-comment-form"
          >
            <label>New Comment as {user.username}</label>
            <textarea onChange={handleChange} value={text}></textarea>
            <div className="character-count">{characterCount} / 1500 </div>
            <button>Submit Comment</button>
          </motion.form>
        )}
      </AnimatePresence>

      {!show && <div>Thanks for your comment!</div>}
    </>
  );
}
