import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../config';

const UpdateEvent = () => {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [venue, setVenue] = React.useState('');
    const [time, setTime] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [club, setClub] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch event details when component mounts
        const getEventDetails = async () => {
            console.warn(params);
            let result = await fetch(`${BASE_URL}/event/${params.id}`);
            result = await result.json();

            setName(result.name);
            setDate(result.date);
            setVenue(result.venue);
            setTime(result.time);
            setCategory(result.category);
            setClub(result.club)
        }
        getEventDetails();
    }, [params])
    const updateEvent = async () => {
        console.warn(name, date, venue, time, category, club)
        let result = await fetch(`${BASE_URL}/event/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, date, venue, time, category, club }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json()
        if (result) {
            alert("Event updated successfully");
            navigate('/events')
        }
    }
    return (
        <div className="event">
            <h1>Update Event</h1>
            <input className="inputBox" type="text" placeholder="Enter Event Name"
                value={name} onChange={(e) => setName(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Event Date"
                value={date} onChange={(e) => setDate(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Event Venue"
                value={venue} onChange={(e) => setVenue(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Event Time"
                value={time} onChange={(e) => setTime(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Event Category"
                value={category} onChange={(e) => setCategory(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Club Name"
                value={club} onChange={(e) => setClub(e.target.value)} />

            <button onClick={updateEvent} className="appbutton">Update Event</button>
        </div>
    )
}

export default UpdateEvent;
