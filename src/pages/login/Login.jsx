import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png' ; 
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../../utils/APIRoutes';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, email } = values;
            const { data } = await axios.post(loginRoute, {
                email,
                password,
            });
            console.log(data);
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('imdb-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleValidation = () => {
        const { email, password } = values;
        if (password === "") {
            toast.error("email and Password is required", toastOptions);
            return false;
        } else if (email.length === "") {
            toast.error("email and Password is required", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <>
            <div className='form-container'>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                    <button type='submit'>Login</button>
                    <span>
                        Don't have an account ? <Link to='/register'>Register</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
