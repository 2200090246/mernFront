import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [showStudents, setShowStudents] = useState(null); // eventId to show students for
    const [studentsList, setStudentsList] = useState([]);

    useEffect(() => {
        getEvents();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role !== 'admin') {
            getUserRegistrations(user._id);
        }
    }, []);

    const getEvents = async () => {
        let result = await fetch('https://mernback-m52b.onrender.com/events');
        result = await result.json();
        setEvents(result);
    }

    const getUserRegistrations = async (userId) => {
        let result = await fetch(`https://mernback-m52b.onrender.com/my-registrations/${userId}`);
        result = await result.json();
        setUserRegistrations(result.map(reg => reg.eventId._id));
    }

    const registerEvent = async (eventId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        let result = await fetch('https://mernback-m52b.onrender.com/register-event', {
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
        if (window.confirm("Are you sure you want to unregister from this event?")) {
            let result = await fetch('https://mernback-m52b.onrender.com/unregister-event', {
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
        let result = await fetch(`https://mernback-m52b.onrender.com/event-registrations/${eventId}`);
        result = await result.json();
        setStudentsList(result);
        setShowStudents(eventId);
    }

    const deleteEvent = async (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        let result = await fetch(`https://mernback-m52b.onrender.com/event/${id}`, {
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
            let result = await fetch(`https://mernback-m52b.onrender.com/search/${key}`);
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
