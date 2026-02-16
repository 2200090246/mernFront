import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../config';

const AddEvent = () => {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [venue, setVenue] = React.useState('');
    const [time, setTime] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [club, setClub] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate()


    const addEvent = async () => {

        if (!name || !date || !venue || !time || !category || !club) {
            setError(true);
            return false
        }
        console.warn(name, date, venue, time, category, club);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
        let result = await fetch(`${BASE_URL}/add-event`, {
            method: "post",
            body: JSON.stringify({ name, date, venue, time, category, club, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        alert(result.message)
        navigate('/events')
    }
    return (
        <div className="event">
            <h1>Add Event</h1>
            <input className="inputBox" type="text" placeholder="Enter Event Name"
                value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className="invalid-input">Enter a valid name</span>}
            <input className="inputBox" type="text" placeholder="Enter Event Date"
                value={date} onChange={(e) => setDate(e.target.value)} />
            {error && !date && <span className="invalid-input">Enter a valid date</span>}
            <input className="inputBox" type="text" placeholder="Enter Event Venue"
                value={venue} onChange={(e) => setVenue(e.target.value)} />
            {error && !venue && <span className="invalid-input">Enter a valid venue</span>}
            <input className="inputBox" type="text" placeholder="Enter Event Time"
                value={time} onChange={(e) => setTime(e.target.value)} />
            {error && !time && <span className="invalid-input">Enter a valid time</span>}
            <input className="inputBox" type="text" placeholder="Enter Event Category"
                value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className="invalid-input">Enter a valid category</span>}
            <input className="inputBox" type="text" placeholder="Enter Club Name"
                value={club} onChange={(e) => setClub(e.target.value)} />
            {error && !club && <span className="invalid-input">Enter a valid club</span>}
            <button onClick={addEvent} className="appbutton">Add Event</button>
        </div>
    )
}

export default AddEvent;
