import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("z");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            
            navigate('/events')
        }
    }, [navigate])
    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/events')
        }
        else {
            alert("invalid credintials")
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
        </div>
    )
}
export default Login;