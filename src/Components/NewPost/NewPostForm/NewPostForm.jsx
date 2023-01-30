import './NewPostForm.css';
import { useState } from 'react';
import { APIURL } from '../../../api';

// Component Imports
import About from './Details/About';
import Location from './Location/Location';
import Equipment from './Equipment/Equipment';
import Description from './Description/Description';

export default function NewPostForm() {
  const [details, setDetails] = useState({
    date: new Date().toISOString().slice(0, 10),
    sport: 'surfing',
  });
  const [location, setLocation] = useState({
    name: '',
    coords: [50.57422642679197, -4.915909767150879],
  });
  const [equipment, setEquipment] = useState({
    board: '',
    sail: '',
    kite: '',
    wing: '',
  });
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sessionData = {
      description,
      date: details.date,
      sport: details.sport,
      location,
      equipment,
    };

    try {
      const response = await fetch(`${APIURL}/sessions/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: JSON.stringify(sessionData),
      });

      if (response.status === 200) {
        console.log('Success!');
      } else {
        const data = await response.json();
        console.log('Something has gone wrong here...', data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <About
        details={details}
        setDetails={setDetails}
        setEquipment={setEquipment}
      />
      <Location location={location} setLocation={setLocation} />
      <Equipment
        details={details}
        equipment={equipment}
        setEquipment={setEquipment}
      />
      <Description description={description} setDescription={setDescription} />
      <button className="create-post-btn">Create Post</button>
    </form>
  );
}
