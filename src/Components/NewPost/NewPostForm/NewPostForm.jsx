import './NewPostForm.css';
import { useState } from 'react';
import Map from '../Map/Map';
import NewPostDetails from './NewPostDetails/NewPostDetails';

export default function NewPostForm() {
  const [location, setLocation] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const [details, setDetails] = useState({
    date: null,
    sport: null,
    gear: null,
    conditions: null,
    description: null,
  });

  const handleDetailsChange = (event, param, value) => {
    if (!param) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [event.target.name]: event.target.value,
      }));
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [param]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting...');
    console.log(details);
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <label>Details</label>
      <NewPostDetails handleDetailsChange={handleDetailsChange} />
      <label>Location</label>

      {showMap && <Map />}
      <button>Create Post</button>
    </form>
  );
}
// Needs to have:

// 1. Sports category
// 2. Location map
// 3.
