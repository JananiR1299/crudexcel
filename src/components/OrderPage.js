import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SHEET_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";
const CATEGORY_OPTIONS = ['Softdrink', 'Fruits', 'Snacks', 'Dairy'];

const OrderPage = () => {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(SHEET_URL);
      setItems(response.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setEditData(item);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${SHEET_URL}/search?ID=${editData.ID}`,
        editData
      );
      alert("Item updated successfully!");
      setEditIndex(null);
      fetchData();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const deleteItem = async (index) => {
    const row = items[index];
    try {
      await axios.delete(
        `${SHEET_URL}/search?ID=${row.ID}`
      );
      alert("Item deleted successfully!");
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="orders p-6">
      <h2 className="text-xl font-semibold mb-4">Orders List</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Purchase Price</th>
            <th className="border px-2 py-1">Selling Price</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Stock Updated</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-center">
              {editIndex === idx ? (
                <>
                  <td className="border px-2 py-1">{item.ID}</td>
                  <td className="border px-2 py-1">
                    <input
                      name="Name"
                      value={editData.Name}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <select
                      name="Category"
                      value={editData.Category}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="PurchasePrice"
                      value={editData.PurchasePrice}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="SellingPrice"
                      value={editData.SellingPrice}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="Quantity"
                      value={editData.Quantity}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="date"
                      name="StockUpdated"
                      value={editData.StockUpdated}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="border px-2 py-1 space-x-1">
                    <button onClick={handleUpdate} className="bg-green-500 px-2 text-white rounded">Save</button>
                    <button onClick={() => setEditIndex(null)} className="bg-gray-400 px-2 text-white rounded">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-2 py-1">{item.ID}</td>
                  <td className="border px-2 py-1">{item.Name}</td>
                  <td className="border px-2 py-1">{item.Category}</td>
                  <td className="border px-2 py-1">{item.PurchasePrice}</td>
                  <td className="border px-2 py-1">{item.SellingPrice}</td>
                  <td className="border px-2 py-1">{item.Quantity}</td>
                  <td className="border px-2 py-1">{item.StockUpdated}</td>
                  <td className="border px-2 py-1 space-x-1">
                    <button
                      onClick={() => handleEdit(item, idx)}
                      className="px-2 text-white rounded"
                      style={{ backgroundColor: '#4caf50', marginRight: '10px'}}
                    >
                      <FaEdit />
                    </button>

                    <button onClick={() => deleteItem(idx)} className=" px-2 text-white rounded" style={{ backgroundColor: ' #f44336' }}><FaTrash /></button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
