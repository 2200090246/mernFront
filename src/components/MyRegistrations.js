import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { BASE_URL } from '../config';
=======
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461

const MyRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
        if (user && user._id) {
=======
        if (user) {
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
            getRegistrations(user._id);
        }
    }, []);

    const getRegistrations = async (userId) => {
<<<<<<< HEAD
        if (!userId) return;
        let result = await fetch(`${BASE_URL}/my-registrations/${userId}`);
        result = await result.json();
        if (Array.isArray(result)) {
            setRegistrations(result);
        } else {
            setRegistrations([]);
        }
=======
        let result = await fetch(`https://mernback-m52b.onrender.com/my-registrations/${userId}`);
        result = await result.json();
        setRegistrations(result);
>>>>>>> a2198b0c47e7c561079d1d6a3121ed462549c461
    }

    const unregisterEvent = async (eventId) => {
        const user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
        if (!user || !user._id) return;
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
                getRegistrations(user._id);
            } else {
                alert(result.message);
            }
        }
    }

    return (
        <div className="event-list">
            <h3>My Registered Events</h3>
            {registrations.length > 0 ? (
                <div className="event-grid">
                    {registrations.map((reg) => (
                        <div className="event-card" key={reg._id}>
                            <div className="card-header">
                                <span className="event-date">{reg.eventId.date}</span>
                                <span className="event-category">{reg.eventId.category}</span>
                            </div>
                            <h2 className="event-title">{reg.eventId.name}</h2>
                            <div className="card-body">
                                <p><strong>Venue:</strong> {reg.eventId.venue}</p>
                                <p><strong>Time:</strong> {reg.eventId.time}</p>
                                <p><strong>Club:</strong> {reg.eventId.club}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => unregisterEvent(reg.eventId._id)} className="unregister-btn">Unregister</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 style={{ textAlign: 'center', color: 'white' }}>No registrations found.</h2>
            )}
        </div>
    );
};

export default MyRegistrations;
