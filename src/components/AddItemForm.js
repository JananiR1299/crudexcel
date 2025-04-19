import React, { useState } from 'react';
import '../styles/AddItemForm.css';

const SHEET_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";

const AddItemForm = () => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    PurchasePrice: '',
    SellingPrice: '',
    Quantity: '',
    StockUpdated: today
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(SHEET_URL);
    const existingItems = await res.json();

    const maxId = existingItems.reduce((max, item) => {
      const id = parseInt(item.ID);
      return !isNaN(id) && id > max ? id : max;
    }, 0);

    const newId = maxId + 1;

    const itemWithId = {
      ID: newId.toString(),
      ...formData
    };

    await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemWithId)
    });

    alert("Item added successfully!");

    setFormData({
      Name: '',
      Category: '',
      PurchasePrice: '',
      SellingPrice: '',
      Quantity: '',
      StockUpdated: today
    });
  };

  return (
    <div className="form-container">
      <form className="custom-form" onSubmit={handleSubmit}>
        <h2>Add New Item</h2>

        <input
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />

        <select
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Softdrink">Softdrink</option>
          <option value="Fruits">Fruits</option>
          <option value="Snacks">Snacks</option>
          <option value="Dairy">Dairy</option>
        </select>

        <input
          name="PurchasePrice"
          value={formData.PurchasePrice}
          onChange={handleChange}
          placeholder="Purchase Price"
          required
        />

        <input
          name="SellingPrice"
          value={formData.SellingPrice}
          onChange={handleChange}
          placeholder="Selling Price"
          required
        />

        <input
          name="Quantity"
          value={formData.Quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />

        <input
          name="StockUpdated"
          type="date"
          value={formData.StockUpdated}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
