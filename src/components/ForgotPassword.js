import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { BASE_URL } from '../config';
=======
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }
<<<<<<< HEAD
        let result = await fetch(`${BASE_URL}/forgot-password`, {
=======
        let result = await fetch('https://mernback-m52b.onrender.com/forgot-password', {
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
            method: 'post',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        if (result.message) {
            alert(result.message);
            if (result.message === "Password reset link sent to your email") {
                navigate('/login');
            }
        }
    }

    return (
        <div className="login">
            <h1>Forgot Password</h1>
            <input className="inputBox" type="text" placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <button onClick={handleSubmit} className="appbutton">Send Reset Link</button>
        </div>
    )
}

export default ForgotPassword;
