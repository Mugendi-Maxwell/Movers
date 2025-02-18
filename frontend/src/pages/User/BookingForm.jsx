import React, { useState } from "react";

const BookingForm = () => {
    const [details, setDetails] = useState({ location: "", date: "", mover: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Booking submitted successfully!");
    };

    return (
        <div>
            <h2>Book a Move</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Current Location" onChange={(e) => setDetails({ ...details, location: e.target.value })} required />
                <input type="date" onChange={(e) => setDetails({ ...details, date: e.target.value })} required />
                <input type="text" placeholder="Preferred Mover" onChange={(e) => setDetails({ ...details, mover: e.target.value })} required />
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default BookingForm;
