import './SessionDeleteForm.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../../../api';
import { UserContext } from '../../../App';

export default function SessionDeleteForm({ sessionID }) {
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const url = `${APIURL}/sessions/${sessionID}`;
    const redirectURL = `/profile/${user.ID}/posts`;

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
        navigate(redirectURL);
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
        className="session-delete activate-btn"
      >
        <span>
          <ion-icon name="trash-outline"></ion-icon>
          <div>Delete</div>
        </span>
      </button>
    );
  }

  return (
    <div className="session-delete confirm-cancel">
      <form onSubmit={(event) => handleSubmit(event)}>
        <button className="confirm-btn">Confirm</button>
      </form>
      <button onClick={() => setFormVisible(false)} className="cancel-btn">
        Cancel
      </button>
    </div>
  );
}
