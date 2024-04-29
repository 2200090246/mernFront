import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('./signup')
    }
    return (
        <div className="header">
            <img src=":https://static.vecteezy.com/system/resources/previews/009/029/391/non_2x/mws-logo-mws-letter-mws-letter-logo-design-initials-mws-logo-linked-with-circle-and-uppercase-monogram-logo-mws-typography-for-technology-business-and-real-estate-brand-vector.jpg." alt="logo" className="logo" />
           
            {
                auth ?

                    <ul className="nav-ul">
                        
                        
                        <li><Link to='/events'>Events</Link></li>
                        <li><Link to='/add'>Add Events</Link></li>
                        <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    
                    <ul className="nav-ul nav-right">
                       <li className="sp"><Link to ='/'>Home</Link></li>
                        <li className="sp"><Link to='/signup'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }

        </div>
    )
}

export default Nav;
