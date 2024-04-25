import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addActorAsync } from '../../store/actorSlice';

const AddActor = ({onClose}) => {

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
      dispatch(addActorAsync(actorDetails))
      .then((result) => {
        toast.success('Actor added successfully');
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to add actor',error );
      });
    }
  }

  const handleValidation = () => {
    const { actorName } = actorDetails;
    if (actorName.length < 3) {
      toast.error('ActorName should be greater than 3 characters');
      return false;
    }
    return true;
  };

  return (
    <div className='add-actor-popup'>
      <div className="add-actor-popup-inner">
        <button className="close-btn" onClick={onClose}>x</button>
        <h2>AddActor</h2>
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
              min="3"
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
