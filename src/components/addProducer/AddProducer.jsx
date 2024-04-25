import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProducerAsync } from '../../store/producerSlice';

const AddProducer = ({onClose}) => {
  const dispatch = useDispatch();

  const [producerDetails, setProducerDetails] = useState({
    producerName: '',
    gender: '',
    dob: '',
    bio: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(addProducerAsync(producerDetails))
        .then((result) => {
          toast.success('Producer added successfully');
          setProducerDetails({
            producerName: '',
            gender: '',
            dob: '',
            bio: '',
          });
        })
        .catch((error) => {
          toast.error('Failed to add producer', error);
        })
    }
  };

  const handleValidation = () => {
    const { producerName } = producerDetails;
    if (producerName.length < 3) {
      toast.error('ProducerName should be greater than 3 characters', toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className='add-producer-popup'>
      <div className="add-producer-popup-inner">
      <button className="close-btn" onClick={onClose}>x</button>
        <h2>Add Producer</h2>
        <form className='form' onSubmit={handleSubmit}>
          <h3>Add Producer</h3>
          <label>
            Name:
            <input
              type="text"
              name="producerName"
              value={producerDetails.producerName}
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
              value={producerDetails.gender}
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
              value={producerDetails.dob}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Bio:
            <textarea
              name="bio"
              value={producerDetails.bio}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProducer;
