import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate('./signup')
        setMenuOpen(false);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="header">
            <Logo className="logo" />

            {/* Hamburger Icon */}
            <button className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Backdrop Overlay */}
            <div
                className={`menu-backdrop ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            {
                auth ?

                    <ul className={`nav-ul ${menuOpen ? 'nav-open' : ''}`}>
                        {
                            JSON.parse(auth).role === 'admin' ?
                                <>
                                    <li><Link to='/events' onClick={() => setMenuOpen(false)}>All Events</Link></li>
                                    <li><Link to='/add' onClick={() => setMenuOpen(false)}>Add Event</Link></li>
                                    {/* <li><Link to='/users'>Users</Link></li> */}
                                </>
                                :
                                <>
                                    <li><Link to='/events' onClick={() => setMenuOpen(false)}>Events</Link></li>
                                    <li><Link to='/my-registrations' onClick={() => setMenuOpen(false)}>Registered Events</Link></li>
                                </>
                        }
                        <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :

                    <ul className={`nav-ul nav-right ${menuOpen ? 'nav-open' : ''}`}>
                        <li className="sp"><Link to='/' onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li className="sp"><Link to='/signup' onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
                        <li><Link to='/login' onClick={() => setMenuOpen(false)}>Login</Link></li>
                    </ul>
            }

        </div>
    )
}

export default Nav;
