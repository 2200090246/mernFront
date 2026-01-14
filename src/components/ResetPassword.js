import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            alert("Please enter all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        let result = await fetch(`https://mernback-m52b.onrender.com/reset-password/${params.token}`, {
            method: 'post',
            body: JSON.stringify({ password }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        if (result.message) {
            alert(result.message);
            if (result.message === "Password reset successfully") {
                navigate('/login');
            }
        }
    }

    return (
        <div className="login">
            <h1>Reset Password</h1>
            <input className="inputBox" type="password" placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <input className="inputBox" type="password" placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            <button onClick={handleSubmit} className="appbutton">Reset Password</button>
        </div>
    )
}

export default ResetPassword;
