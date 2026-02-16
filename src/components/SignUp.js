import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role] = useState("user");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [navigate])

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowerCase.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!hasNumber.test(password)) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar.test(password)) {
            return "Password must contain at least one special character.";
        }
        return null;
    };


    const collectData = async () => {
        if (!name || !email || !password) {
            alert("Please enter valid details");
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            alert(passwordError);
            return;
        }

        console.warn(name, email, password, role);
        let result = await fetch(`${BASE_URL}/register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password, role }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();

        if (result.message === "User created successfully. Please verify your email.") {
            console.warn(result);
            alert("Signup Successful! Please check your inbox to verify your email.");
            navigate('/login');
        } else if (result.message === "User already exists") {
            alert("User Already Exists");
            navigate('/login');
        } else {
            alert(result.message || "Signup failed");
        }
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appbutton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp;
