import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addActorAsync } from '../../store/actorSlice';

const AddActor = () => {
  const dispatch = useDispatch();

  const [actorDetails, setActorDetails] = useState({
    actorName: '',
    gender: '',
    dob: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        dispatch(addActorAsync(actorDetails));
        toast.success('Actor added successfully');
        setActorDetails({
          actorName: '',
          gender: '',
          dob: '',
          bio: '',
        });
      } catch (error) {
        toast.error('Failed to add actor');
      }
    }
  };

  const handleValidation = () => {
    const { actorName, gender, dob, bio } = actorDetails;
    if (actorName.length < 3) {
      toast.error('ActorName should be greater than 3 characters');
      return false;
    } else if (!(gender === 'male' || gender === 'female')) {
      toast.error('Gender should be either male or female');
      return false;
    } else if (bio.trim() === '') {
      toast.error('Bio should not be empty');
      return false;
    } else if (!dob) {
      toast.error('DOB should not be empty');
      return false;
    }
    return true;
  };

  return (
    <div className='add-actor-page'>
      <div className="add-actor-form">
        <form className='form' onSubmit={handleSubmit}>
          <h3>Add Actor</h3>
          <label>
            Name:
            <input
              type="text"
              name="actorName"
              value={actorDetails.actorName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={actorDetails.gender}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={actorDetails.dob}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Bio:
            <textarea
              name="bio"
              value={actorDetails.bio}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};


export default AddActor;
