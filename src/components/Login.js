import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showResend, setShowResend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/events')
        }
    }, [navigate])

    const handleLogin = async () => {
        let result = await fetch("https://mernback-m52b.onrender.com/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.result === "invalid credentials") {
            alert("Invalid Credentials");
        } else if (result.result === "Email not verified. Please check your inbox.") {
            alert("Email not verified. Please check your inbox.");
            setShowResend(true);
        } else if (result.result === "no user found") {
            alert("No User Found");
        } else {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        }
    }

    const handleResend = async () => {
        try {
            let result = await fetch("https://mernback-m52b.onrender.com/resend-verification", {
                method: 'post',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            alert(result.message);
            setShowResend(false);
        } catch (error) {
            alert("Error sending verification email");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="inputBox" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} type="button" className="appbutton">Login</button>
            {showResend && (
                <button onClick={handleResend} type="button" className="appbutton" style={{ marginTop: '10px', backgroundColor: '#ff9800' }}>
                    Resend Verification Email
                </button>
            )}
            <div style={{ marginTop: '15px' }}>
                <a href="/forgot-password" style={{ color: '#6366f1', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
        </div>
    )
}
export default Login;
