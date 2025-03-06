import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../../services/inventoryService";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ move_type: "", base_price: 0 });
  const [error, setError] = useState("");
  // editingId is null when adding a new item; otherwise, it holds the id of the item being edited.
  const [editingId, setEditingId] = useState(null);

  // Fetch inventory items when the component mounts.
  useEffect(() => {
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

  const handleSubmit = async () => {
    if (editingId) {
      try {
        const updatedItem = await updateInventoryItem(editingId, newItem);
        setItems(items.map((item) => (item.id === editingId ? updatedItem : item)));
        setEditingId(null);
        setNewItem({ move_type: "", base_price: 0 });
      } catch (err) {
        console.error("Error updating item:", err);
        alert("Failed to update item");
      }
    } else {
      try {
        const addedItem = await createInventoryItem(newItem);
        setItems([...items, addedItem]);
        setNewItem({ move_type: "", base_price: 0 });
      } catch (err) {
        console.error("Error adding item:", err);
        alert("Failed to add item");
      }
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteInventoryItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setNewItem({ move_type: item.move_type, base_price: item.base_price });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Inventory Management</h1>
      <Link to="/admin/dashboard" style={styles.link}>
        ← Back to Dashboard
      </Link>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Move Type"
          value={newItem.move_type}
          onChange={(e) =>
            setNewItem({ ...newItem, move_type: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Base Price"
          value={newItem.base_price}
          onChange={(e) =>
            setNewItem({ ...newItem, base_price: Number(e.target.value) })
          }
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          {editingId ? "Update Item" : "Add Item"}
        </button>
      </div>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.th}>Move Type</th>
              <th style={styles.th}>Base Price</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={styles.tr}>
                <td style={styles.td}>{item.move_type}</td>
                <td style={styles.td}>${item.base_price}</td>
                <td style={styles.td}>
                  {item.created_at ? new Date(item.created_at).toLocaleString() : "-"}
                </td>
                <td style={styles.td}>
                  <button onClick={() => handleEditClick(item)} style={styles.actionButton}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    padding: "20px",
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: "20px",
  },
  link: {
    display: "inline-block",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#00BFFF",
    textDecoration: "none",
    fontWeight: "bold",
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
    border: "1px solid #00BFFF",
    borderRadius: "5px",
    backgroundColor: "#222222",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#00BFFF",
    color: "#000000",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#222222",
    color: "#FFFFFF",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "2px 2px 10px rgba(0, 191, 255, 0.5)",
  },
  tableHeader: {
    backgroundColor: "#333333",
    color: "#00BFFF",
    fontSize: "18px",
    textAlign: "left",
    padding: "12px",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    fontSize: "16px",
    borderBottom: "2px solid #444444",
  },
  tr: {
    borderBottom: "1px solid #444444",
  },
  td: {
    padding: "10px 15px",
    textAlign: "left",
    fontSize: "14px",
  },
  actionButton: {
    backgroundColor: "#00BFFF",
    color: "#121212",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
    transition: "background 0.3s",
  },
  deleteButton: {
    backgroundColor: "#FF4444",
    color: "#FFFFFF",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Inventory;
