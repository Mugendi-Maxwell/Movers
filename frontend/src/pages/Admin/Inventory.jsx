import React, { useEffect, useState } from "react";
import { getInventoryItems, createInventoryItem } from "../../services/inventoryService";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ move_type: "", base_price: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch inventory items when the component mounts
    const fetchItems = async () => {
      try {
        const data = await getInventoryItems();
        setItems(data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory.");
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      const addedItem = await createInventoryItem(newItem);
      setItems([...items, addedItem]);
      setNewItem({ move_type: "", base_price: 0 });
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
      {error && <div className="text-red-500 font-bold mb-4">{error}</div>}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Move Type"
          value={newItem.move_type}
          onChange={(e) => setNewItem({ ...newItem, move_type: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Base Price"
          value={newItem.base_price}
          onChange={(e) => setNewItem({ ...newItem, base_price: Number(e.target.value) })}
          className="border p-2 rounded"
        />
        <button onClick={addItem} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Move Type</th>
            <th className="p-2">Base Price</th>
            <th className="p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.move_type}</td>
              <td className="p-2">${item.base_price}</td>
              <td className="p-2">{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// CSS-in-JS Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000", // Black background
    padding: "20px",
    textAlign: "center",
    color: "#FFFFFF", // White text
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#00BFFF", // Neon Blue
    marginBottom: "20px",
  },
  error: {
    color: "#FF4444",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    border: "1px solid #00BFFF", // Neon Blue border
    borderRadius: "5px",
    backgroundColor: "#222222", // Charcoal background
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#00BFFF", // Neon Blue
    color: "#000000", // Black text
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#222222", // Charcoal
    color: "#FFFFFF",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "2px 2px 10px rgba(0, 191, 255, 0.5)", // Neon Blue Glow
  },
  tableHeader: {
    backgroundColor: "#333333", // Dark Gray
    color: "#00BFFF", 
    fontSize: "18px",
    textAlign: "left",
    padding: "12px",
  },
  rowEven: {
    backgroundColor: "#222222", 
    borderBottom: "1px solid #444444",
    textAlign: "left",
    padding: "10px",
  },
  rowOdd: {
    backgroundColor: "#333333", 
    borderBottom: "1px solid #444444",
    textAlign: "left",
    padding: "10px",
  },
};


export default Inventory;
