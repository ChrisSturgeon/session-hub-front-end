import './WrapUp.css';
import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import SessionValidationError from '../ValidationError/SessionValidationError';
import { useEffect } from 'react';

export default function WrapUp() {
  const navigate = useNavigate();
  const [characterCount, setCharacterCount] = useState(0);
  const [postButtonVisible, setPostButtonVisible] = useState(false);
  const [
    formState,
    setFormState,
    setCompleted,
    handleFormSubmit,
    allSectionsComplete,
  ] = useOutletContext();
  const { wrapUp } = formState;

  function handleChange(event) {
    setFormState({
      ...formState,
      wrapUp: event.target.value,
    });
  }

  // Updates character count on input change
  useEffect(() => {
    setCharacterCount(wrapUp.length);
  }, [wrapUp]);

  function next(event) {
    event.preventDefault();
    window.sessionStorage.setItem(
      'new-session-inputs',
      JSON.stringify(formState)
    );
    setCompleted((prevState) => ({
      ...prevState,
      wrapUp: true,
    }));
    setPostButtonVisible(true);
  }

  function postSession(event) {
    event.preventDefault();
    handleFormSubmit(event);
  }

  function previous(event) {
    event.preventDefault();
    navigate('/new-session/conditions');
  }

  return (
    <div className="wrap-up-input">
      <h3>Wrap Up</h3>
      <textarea
        onChange={handleChange}
        placeholder={'A brief summary of your time on the water...'}
        maxLength={450}
        value={wrapUp}
      ></textarea>
      <span className="character-count">{characterCount}/450 characters</span>
      <div className="next-previous-btns">
        {postButtonVisible ? (
          <button onClick={(event) => postSession(event)}>Post Session</button>
        ) : (
          <button onClick={(event) => next(event)}>Next</button>
        )}
        <button onClick={(event) => previous(event)}>Previous</button>
      </div>

      <SessionValidationError
        isVisible={!allSectionsComplete}
        message="Please complete all sections"
      />
    </div>
  );
}
