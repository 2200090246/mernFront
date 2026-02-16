import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('./signup')
    }
    return (
        <div className="header">
            <Logo className="logo" />

            {
                auth ?

                    <ul className="nav-ul">
                        {
                            JSON.parse(auth).role === 'admin' ?
                                <>
                                    <li><Link to='/events'>All Events</Link></li>
                                    <li><Link to='/add'>Add Event</Link></li>
                                    {/* <li><Link to='/users'>Users</Link></li> */}
                                </>
                                :
                                <>
                                    <li><Link to='/events'>Events</Link></li>
                                    <li><Link to='/my-registrations'>Registered Events</Link></li>
                                </>
                        }
                        <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :

                    <ul className="nav-ul nav-right">
                        <li className="sp"><Link to='/'>Home</Link></li>
                        <li className="sp"><Link to='/signup'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }

        </div>
    )
}

export default Nav;
