import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/Itempage.css';

const SHEET_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";

const ItemPage = () => {
  const [items, setItems] = useState([]); // To store all items
  const [filteredItems, setFilteredItems] = useState([]); // To store filtered items based on user selection
  const [selectedCategory, setSelectedCategory] = useState(''); // Category filter
  const [showLowStockOnly, setShowLowStockOnly] = useState(false); // Filter for low stock items
  const [selectedItem, setSelectedItem] = useState(null); // The item selected for ordering
  const [quantity, setQuantity] = useState(0); // Quantity input for ordering
  const [unit, setUnit] = useState('piece'); // Unit input for ordering
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [orderedItems, setOrderedItems] = useState([]); // Orders state to store orders

  useEffect(() => {
    fetchItems(); // Fetch items from the sheet when the component mounts
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(SHEET_URL);
      setItems(res.data);
      setFilteredItems(res.data); // Set both filtered and all items to the fetched data initially
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  const handleLowStock = () => {
    const lowStock = items.filter(item => parseInt(item.Quantity) < 10); // Filter items with stock less than 10
    setFilteredItems(lowStock);
    setShowLowStockOnly(true); // Set the filter state to low stock
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category); // Set selected category
    let filtered = items.filter(item => item.Category === category);
    if (showLowStockOnly) {
      filtered = filtered.filter(item => parseInt(item.Quantity) < 10); // Apply low stock filter if enabled
    }
    setFilteredItems(filtered); // Set filtered items based on category and stock
  };

  const resetFilters = () => {
    setFilteredItems(items); // Reset filters and show all items
    setSelectedCategory('');
    setShowLowStockOnly(false);
  };

  const handleOrderClick = (item) => {
    setSelectedItem(item); // Set selected item for ordering
    setIsModalOpen(true); // Open modal
  };

  const handleSaveOrder = () => {
    if (selectedItem && quantity > 0) {
      const order = { ...selectedItem, quantity, unit }; // Prepare the order details
      setOrderedItems(prev => [...prev, order]); // Add new order to the list of orders
      setIsModalOpen(false); // Close the modal
      setQuantity(0); // Reset quantity input
    }
  };

  return (
    <div className="item-page">
      <div className="subheader">
        <h2>Items</h2>
        <div className="filter-buttons">
          <button onClick={handleLowStock} className="btn-rounded">Low Stock</button>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            style={{ borderRadius: '20px', backgroundColor: '#4a90e2' }}
          >
            <option value="">Filter by Category</option>
            <option value="Softdrink">Softdrink</option>
            <option value="Fruits">Fruits</option>
            <option value="Snacks">Snacks</option>
            <option value="Dairy">Dairy</option>
          </select>
          <button onClick={resetFilters} style={{ borderRadius: '20px', backgroundColor: '#4a90e2' }}>Show All</button>
        </div>
      </div>

      {/* Table layout */}
      <div className="item-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Remaining Stock</th>
              <th>Sales Price</th>
              <th>Purchase Price</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr><td colSpan="6">No items match your filter.</td></tr>
            ) : (
              filteredItems.map((item, idx) => {
                const quantity = parseInt(item.Quantity);
                return (
                  <tr key={idx}>
                    <td>{item.Name}</td>
                    <td>{item.Category}</td>
                    <td>{quantity}</td>
                    <td>₹{item.SellingPrice}</td>
                    <td>₹{item.PurchasePrice || 'N/A'}</td>
                    <td>
                      {parseInt(item.Quantity, 10) < 50 && (
                        <button
                          onClick={() => handleOrderClick(item)}
                          style={{
                            backgroundColor: '#4caf50',
                            padding: '6px 12px',
                            borderRadius: '10px',
                            color: 'black'
                          }}
                        >
                          Order
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for ordering */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Order Item"
      >
        <h2>Order {selectedItem?.Name}</h2>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </label>
        <label>
          Unit:
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="piece">Piece</option>
            <option value="box">Box</option>
          </select>
        </label>
        <button onClick={handleSaveOrder} style={{ backgroundColor: '#4caf50' }}>Save Order</button>
        <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: '#f44336' }}>Cancel</button>
      </Modal>

      {/* Link to add item */}
      <div className="add-item-link-wrapper">
        <Link to="/add-item" className="card-link">➕ Add Item</Link>
      </div>

      {/* Show ordered items in the "Ordered" section */}
      <div className="ordered-items">
        <h3>Ordered Items</h3>
        {orderedItems.length > 0 ? (
          <ul>
            {orderedItems.map((order, idx) => (
              <li key={idx}>
                <div><strong>Name:</strong> {order.Name}</div>
                <div><strong>Quantity:</strong> {order.quantity}</div>
                <div><strong>Unit:</strong> {order.unit}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
