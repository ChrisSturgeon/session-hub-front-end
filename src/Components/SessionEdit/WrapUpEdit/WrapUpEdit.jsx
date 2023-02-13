import './WrapUpEdit.css';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function WrapUpEdit() {
  const [characterCount, setCharacterCount] = useState(0);
  const [sessionState, setSessionState] = useOutletContext();
  const { wrapUp } = sessionState;

  function handleChange(event) {
    setSessionState({
      ...sessionState,
      wrapUp: event.target.value,
    });
  }

  // Updates character count on input change
  useEffect(() => {
    if (wrapUp) {
      setCharacterCount(wrapUp.length);
    }
  }, [wrapUp]);

  return (
    <div className="wrap-up-input">
      <h3>Editing Wrap Up</h3>
      <textarea
        onChange={handleChange}
        placeholder={'A brief summary of your time on the water...'}
        maxLength={450}
        value={wrapUp}
      ></textarea>
      <span className="character-count">{characterCount}/450 characters</span>
    </div>
  );
}
