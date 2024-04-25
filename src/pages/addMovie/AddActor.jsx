import React, { useState } from 'react';
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {addActor} from "../../utils/APIRoutes"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddActor = () => {
    const navigate = useNavigate();
    const [actorDetails, setActorDetails] = useState({
        actorName: '',
        gender: '',
        dob: '',
        bio: '',
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }

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
            const { actorName , gender , dob , bio } = actorDetails;
            const { data } = await axios.post(addActor, {
                actorName,
                gender,
                dob,
                bio
            });
            console.log(data)
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
        }
    };
    const handleValidation = () => {
        const { actorName, gender, dob, bio } = actorDetails;
        if (actorName.length < 3) {
            toast.error(
                "ActorName should be greater than 3 characters",
                toastOptions
            );
            return false;
        }
        else if (gender !== ("male" || "female")) {
            toast.error(
                "Gender should be either male or female",
                toastOptions
            );
            return false;
        } 
        else if (bio === "") {
            toast.error(
                "Bio should not be empty",
                toastOptions
            );
            return false;
        } 
        else if (dob === "") {
            toast.error(
                "DOB should not be empty",
                toastOptions
            );
            return false;
        } 
        return true;
    }
    console.log('Submitted:', actorDetails);
    setActorDetails({
        name: '',
        gender: '',
        dob: '',
        bio: '',
    });

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={actorDetails.name}
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
            </FormContainer>
            <ToastContainer />
        </>

    );
};

const FormContainer = styled.div`
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
`

export default AddActor;
