import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying...");

    const effectCalled = React.useRef(false);

    useEffect(() => {
        if (effectCalled.current) return;
        effectCalled.current = true;

        const verify = async () => {
            try {
                let result = await fetch(`https://mernback-m52b.onrender.com/verify/${token}`);
                result = await result.json();
                setMessage(result.message);
                if (result.message === "Email verified successfully") {
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            } catch (error) {
                setMessage("Verification failed. Please try again.");
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <div className="verify-email" style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
            <h1>Email Verification</h1>
            <h3>{message}</h3>
        </div>
    );
};

export default VerifyEmail;
