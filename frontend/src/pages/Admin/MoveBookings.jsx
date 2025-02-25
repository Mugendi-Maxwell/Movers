import { useEffect, useState } from "react";

const MoveBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/bookings")
            .then((res) => res.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching bookings:", err));
    }, []);

    const handleDelete = (bookingId) => {
        fetch(`/api/bookings/${bookingId}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    setBookings(bookings.filter(booking => booking.id !== bookingId));
                }
            })
            .catch(err => console.error("Error deleting booking:", err));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Move Bookings Management</h1>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
                Add New Booking
            </button>

            {loading ? (
                <p>Loading bookings...</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Mover</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="border-b">
                                <td className="p-3">{booking.id}</td>
                                <td className="p-3">{booking.customer_name}</td>
                                <td className="p-3">{booking.mover_name}</td>
                                <td className="p-3">{booking.date}</td>
                                <td className="p-3">
                                    <button className="text-green-600 mr-3">Edit</button>
                                    <button
                                        className="text-red-600"
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MoveBooking;
