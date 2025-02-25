import { useEffect, useState } from "react";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => {
                setInventory(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching inventory:", err));
    }, []);

    const handleDelete = (itemId) => {
        fetch(`/api/inventory/${itemId}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    setInventory(inventory.filter(item => item.id !== itemId));
                }
            })
            .catch(err => console.error("Error deleting item:", err));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
                Add New Item
            </button>

            {loading ? (
                <p>Loading inventory...</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-3">{item.id}</td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">
                                    <button className="text-green-600 mr-3">Edit</button>
                                    <button
                                        className="text-red-600"
                                        onClick={() => handleDelete(item.id)}
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

export default Inventory;
