import './NewCommentForm.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { APIURL } from '../../../api';
import { motion, AnimatePresence } from 'framer-motion';
import SessionValidationError from '../../SessionForm/ValidationError/SessionValidationError';

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

export default function NewCommentForm({ setComments }) {
  const { sessionID } = useParams();
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [showInputError, setShowInputError] = useState(false);

  function handleChange(event) {
    setText((prev) => event.target.value);
  }

  useEffect(() => {
    setCharacterCount((prev) => text.length);
  }, [text]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (characterCount < 2) {
      setShowInputError(true);
      return;
    } else {
      setShowInputError(false);
    }
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
      <AnimatePresence mode="wait" initial={false}>
        {show && (
          <motion.form
            initial={expandDown.initial}
            animate={expandDown.animate}
            exit={expandDown.exit}
            onSubmit={handleSubmit}
            className="new-comment-form"
          >
            <textarea
              onChange={handleChange}
              value={text}
              placeholder="Leave a comment!"
            ></textarea>
            <div className="character-count">{characterCount} / 1500 </div>
            <SessionValidationError
              isVisible={showInputError}
              message={'Min. comment length is 3 characters'}
            />
            <button>Add Comment</button>
          </motion.form>
        )}
      </AnimatePresence>

      {!show && (
        <div style={{ color: 'var(--dark-blue', margin: '0.5em 0' }}>
          Thanks for your comment!
        </div>
      )}
    </>
  );
}
