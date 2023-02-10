import './FriendRequestForm.css';
import { useState } from 'react';
import { APIURL } from '../../../api';

export default function FriendRequestForm({ userID }) {
  const [showForm, setShowForm] = useState(false);
  const [requestSent, setRequestSent] = useState(null);
  const [addButtonText, setAddButtonText] = useState('Add Friend');

  // Flips button to show confirmation prompt
  const flip = (event) => {
    if (event) {
      event.preventDefault();
    }
    setShowForm(!showForm);
  };

  if (!showForm) {
    return (
      <button
        className="add-btn"
        onClick={(event) => {
          flip(event);
        }}
        disabled={requestSent}
      >
        {addButtonText}
      </button>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${APIURL}/friends/request/${userID}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
      });

      if (response.status === 201) {
        setRequestSent(true);
        setAddButtonText('Request Sent');
        flip();
      }

      if (response.status === 400 || response.status === 404) {
        console.log(response.message);
        setRequestSent(false);
        setAddButtonText('Request Failed');
        flip();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-friend">
      {showForm ? (
        <>
          <form>
            <button
              className="confirm-btn"
              onClick={(event) => handleSubmit(event)}
              type="submit"
            >
              Confirm
            </button>
          </form>
          <button
            className="cancel-btn"
            onClick={(event) => {
              flip(event);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button>Add Friend</button>
      )}
    </div>
  );
}
