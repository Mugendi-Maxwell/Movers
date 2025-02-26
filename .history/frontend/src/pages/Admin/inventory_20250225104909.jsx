import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  const addItem = async () => {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const addedItem = await response.json();
      setItems([...items, addedItem]);
      setNewItem({ name: "", quantity: 0, price: 0 });
    } else {
      alert("Failed to add item");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: +e.target.value })}
          className="border p-2 mr-2"
        />
        <Button onClick={addItem} className="bg-blue-500 hover:bg-blue-600">Add Item</Button>
      </div>
      
      <table className="w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Item</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
