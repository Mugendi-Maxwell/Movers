import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalInventory: 0,
    });

    useEffect(() => {
        // Simulated API call (Replace with real API calls)
        fetch("/api/admin/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error("Error fetching stats:", err));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-2 gap-6">
                {/* Total Bookings */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Bookings</h2>
                    <p className="text-4xl font-bold text-blue-500">{stats.totalBookings}</p>
                    <Link to="/admin/bookings" className="text-blue-600 hover:underline">
                        Manage Bookings
                    </Link>
                </div>

                {/* Total Inventory */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Inventory</h2>
                    <p className="text-4xl font-bold text-yellow-500">{stats.totalInventory}</p>
                    <Link to="/admin/inventory" className="text-yellow-600 hover:underline">
                        Manage Inventory
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
