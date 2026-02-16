import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { BASE_URL } from '../config';
=======
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [showStudents, setShowStudents] = useState(null); // eventId to show students for
    const [studentsList, setStudentsList] = useState([]);

    useEffect(() => {
        getEvents();
        const user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
        if (user && user._id && user.role !== 'admin') {
            getUserRegistrations(user._id);
        } else if (user && !user._id) {
            console.error("User object missing _id in localStorage");
=======
        if (user && user.role !== 'admin') {
            getUserRegistrations(user._id);
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
        }
    }, []);

    const getEvents = async () => {
<<<<<<< HEAD
        let result = await fetch(`${BASE_URL}/events`);
=======
        let result = await fetch('https://mernback-m52b.onrender.com/events');
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
        result = await result.json();
        setEvents(result);
    }

    const getUserRegistrations = async (userId) => {
<<<<<<< HEAD
        try {
            let result = await fetch(`${BASE_URL}/my-registrations/${userId}`);
            result = await result.json();
            if (Array.isArray(result)) {
                setUserRegistrations(result.map(reg => reg.eventId._id));
            } else {
                console.error("Expected array but got:", result);
                setUserRegistrations([]);
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
            setUserRegistrations([]);
        }
=======
        let result = await fetch(`https://mernback-m52b.onrender.com/my-registrations/${userId}`);
        result = await result.json();
        setUserRegistrations(result.map(reg => reg.eventId._id));
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
    }

    const registerEvent = async (eventId) => {
        const user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
        if (!user || !user._id) {
            alert("Please login again. User data missing.");
            return;
        }
        let result = await fetch(`${BASE_URL}/register-event`, {
=======
        let result = await fetch('https://mernback-m52b.onrender.com/register-event', {
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
            method: 'post',
            body: JSON.stringify({ userId: user._id, eventId }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        if (result.message === "Registered successfully") {
            alert("Registered Successfully");
            getUserRegistrations(user._id);
        } else {
            alert(result.message);
        }
    }

    const unregisterEvent = async (eventId) => {
        const user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
        if (!user || !user._id) {
            alert("Please login again. User data missing.");
            return;
        }
        if (window.confirm("Are you sure you want to unregister from this event?")) {
            let result = await fetch(`${BASE_URL}/unregister-event`, {
=======
        if (window.confirm("Are you sure you want to unregister from this event?")) {
            let result = await fetch('https://mernback-m52b.onrender.com/unregister-event', {
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
                method: 'post',
                body: JSON.stringify({ userId: user._id, eventId }),
                headers: { 'Content-Type': 'application/json' }
            });
            result = await result.json();
            if (result.message === "Unregistered successfully") {
                alert("Unregistered Successfully");
                getUserRegistrations(user._id);
            } else {
                alert(result.message);
            }
        }
    }

    const viewStudents = async (eventId) => {
        if (showStudents === eventId) {
            setShowStudents(null);
            return;
        }
<<<<<<< HEAD
        let result = await fetch(`${BASE_URL}/event-registrations/${eventId}`);
=======
        let result = await fetch(`https://mernback-m52b.onrender.com/event-registrations/${eventId}`);
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
        result = await result.json();
        setStudentsList(result);
        setShowStudents(eventId);
    }

    const deleteEvent = async (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
        let result = await fetch(`${BASE_URL}/event/${id}`, {
=======
        let result = await fetch(`https://mernback-m52b.onrender.com/event/${id}`, {
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
            method: "Delete",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user._id, userRole: user.role })
        });
        result = await result.json();
        if (result) {
            alert("Event deleted");
            getEvents()
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
<<<<<<< HEAD
            let result = await fetch(`${BASE_URL}/search/${key}`);
=======
            let result = await fetch(`https://mernback-m52b.onrender.com/search/${key}`);
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
            result = await result.json()
            if (result) {
                setEvents(result)
            }
        }
        else {
            getEvents();
        }

    }
    return (
        <div className="event-list">
            <h3>Event List</h3>
            <input type="" className="search-event-box" placeholder="Search Event" onChange={searchHandle} />
            <div className="event-grid">
                {
                    events.length > 0 ? events.map((item) =>
                        <div className="event-card" key={item._id}>
                            <div className="card-header">
                                <span className="event-date">{item.date}</span>
                                <span className="event-category">{item.category}</span>
                            </div>
                            <h2 className="event-title">{item.name}</h2>
                            <div className="card-body">
                                <p><strong>Venue:</strong> {item.venue}</p>
                                <p><strong>Time:</strong> {item.time}</p>
                                <p><strong>Club:</strong> {item.club}</p>
                            </div>

                            {/* Admin View: Registered Students List */}
                            {showStudents === item._id && (
                                <div className="students-list">
                                    <h4>Registered Students:</h4>
                                    {studentsList.length > 0 ? (
                                        <ul>
                                            {studentsList.map(reg => (
                                                <li key={reg._id}>{reg.userId.name} ({reg.userId.email})</li>
                                            ))}
                                        </ul>
                                    ) : <p>No registrations yet.</p>}
                                </div>
                            )}

                            <div className="card-actions">
                                {
                                    (JSON.parse(localStorage.getItem('user')).role === 'admin' || JSON.parse(localStorage.getItem('user'))._id === item.userId) &&
                                    <button onClick={() => deleteEvent(item._id)} className="delete-btn">Delete</button>
                                }
                                {
                                    JSON.parse(localStorage.getItem('user')).role === 'admin' ? (
                                        <>
                                            <Link to={"/update/" + item._id} className="update-btn">Update</Link>
                                            <button onClick={() => viewStudents(item._id)} className="view-students-btn">
                                                {showStudents === item._id ? "Hide Students" : "View Students"}
                                            </button>
                                        </>
                                    ) : (
                                        // User View: Register / Unregister Button
                                        !userRegistrations.includes(item._id) ? (
                                            <button onClick={() => registerEvent(item._id)} className="register-btn">Register</button>
                                        ) : (
                                            <button onClick={() => unregisterEvent(item._id)} className="unregister-btn">Unregister</button>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    )
                        : <h1>Loading....</h1>
                }
            </div>
        </div>
    )
}
export default EventList;
