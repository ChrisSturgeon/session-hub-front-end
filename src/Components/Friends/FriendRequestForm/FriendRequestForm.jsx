import './FriendRequestForm.css';
import { useState } from 'react';

export default function FriendRequestForm({ userID }) {
  const [showForm, setShowForm] = useState(false);
  const [requestSent, setRequestSent] = useState(null);
  const [addButtonText, setAddButtonText] = useState('Add Friend');

  const flip = (event) => {
    if (event) {
      event.preventDefault();
    }
    setShowForm(!showForm);
  };

  // Flips button to show confirmation prompt
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

  // Sends POST request to API route
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting friend request...');
    const url = 'http://localhost:3000/api/friends/request/create';

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: JSON.stringify({
          userID: userID,
        }),
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
            <button onClick={(event) => handleSubmit(event)} type="submit">
              Confirm
            </button>
          </form>
          <button
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
