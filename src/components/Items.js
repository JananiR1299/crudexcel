
// // ItemPage.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ToBeOrdered from './ToBeOrder';
// import Ordered from './Ordered';
// import History from './History';
// import '../styles/Itempage.css';

// const SHEET_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";

// const ItemPage = () => {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [showLowStockOnly, setShowLowStockOnly] = useState(false);
//   const [toBeOrderedItems, setToBeOrderedItems] = useState([]);
//   const [orderedItems, setOrderedItems] = useState({});
//   const [historyItems, setHistoryItems] = useState({});

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get(SHEET_URL);
//       setItems(res.data);
//       setFilteredItems(res.data);
//       const lowStock = res.data.filter(item => parseInt(item.Quantity) < 10);
//       setToBeOrderedItems(lowStock);
//     } catch (err) {
//       console.error("Failed to fetch items", err);
//     }
//   };

//   const handleLowStock = () => {
//     const filtered = items.filter(item => parseInt(item.Quantity) < 10);
//     setFilteredItems(filtered);
//     setShowLowStockOnly(true);
//   };

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category);
//     let filtered = items.filter(item => item.Category === category);
//     if (showLowStockOnly) {
//       filtered = filtered.filter(item => parseInt(item.Quantity) < 10);
//     }
//     setFilteredItems(filtered);
//   };

//   const resetFilters = () => {
//     setFilteredItems(items);
//     setSelectedCategory('');
//     setShowLowStockOnly(false);
//   };

//   const handleOrder = (selectedItems) => {
//     const today = new Date().toLocaleDateString();
//     setOrderedItems(prev => ({
//       ...prev,
//       [today]: [...(prev[today] || []), ...selectedItems]
//     }));

//     const remaining = toBeOrderedItems.filter(item => !selectedItems.includes(item));
//     setToBeOrderedItems(remaining);
//   };

//   const handleUpdateStock = (item) => {
//     const today = new Date().toLocaleDateString();
//     setHistoryItems(prev => ({
//       ...prev,
//       [today]: [...(prev[today] || []), item]
//     }));
//   };

//   return (
//     <div className="item-page">
//       <div className="subheader">
//         <h2> Items </h2>
//         <div className="filter-buttons">
//         <button onClick={handleLowStock} className="btn-rounded">Low Stock</button>
//           <select
//             style={{ borderRadius: '20px', backgroundColor: '#4a90e2' }}
//             value={selectedCategory}
//             onChange={(e) => handleCategoryFilter(e.target.value)}
//           >
//             <option value="">Filter by Category</option>
//             <option value="Softdrink">Softdrink</option>
//             <option value="Fruits">Fruits</option>
//             <option value="Snacks">Snacks</option>
//             <option value="Dairy">Dairy</option>
//           </select>
//           <button onClick={resetFilters} style={{ borderRadius: '20px', backgroundColor: '#4a90e2' }}>Show All</button>
//         </div>
//       </div>

//       <div className="card-grid">
//   {filteredItems.length === 0 ? (
//     <p>No items match your filter.</p>
//   ) : (
//     filteredItems.map((item, idx) => {
//       const quantity = parseInt(item.Quantity);
//       return (
//         <div key={idx} className="item-card">
//           <h3>{item.Name}</h3>
//           <p>Category: {item.Category}</p>
//           <p>Remaining Stock: {quantity}</p>
//           <p>Sales Price: ₹{item.SellingPrice}</p>
//           <p>Purchase Price: ₹{item.PurchasePrice || 'N/A'}</p>
//           {quantity < 10 && (
//             <button
//               style={{
//                 marginTop: '10px',
//                 borderRadius: '10px',
//                 backgroundColor: '#f44336',
//                 color: 'black',
//                 padding: '6px 12px',
//               }}
//               onClick={() => handleOrder([item])}
//             >
//               Order this item
//             </button>
//           )}
//         </div>
//       );
//     })

//   )}
// </div>


//       <div className="add-item-link-wrapper">
//         <Link to="/add-item" className="card-link">➕ Add Item</Link>
//       </div>


//     </div>
//   );
// };

// export default ItemPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/Itempage.css';

const SHEET_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // For the selected item in order modal
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('piece'); // Default unit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(SHEET_URL);
      setItems(res.data);
      setFilteredItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  const handleLowStock = () => {
    const lowStock = items.filter(item => parseInt(item.Quantity) < 10);
    setFilteredItems(lowStock);
    setShowLowStockOnly(true);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    let filtered = items.filter(item => item.Category === category);
    if (showLowStockOnly) {
      filtered = filtered.filter(item => parseInt(item.Quantity) < 10);
    }
    setFilteredItems(filtered);
  };

  const resetFilters = () => {
    setFilteredItems(items);
    setSelectedCategory('');
    setShowLowStockOnly(false);
  };

  const handleOrderClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true); // Open modal when the order button is clicked
  };

  const handleSaveOrder = () => {
    if (selectedItem && quantity > 0) {
      const order = { ...selectedItem, quantity, unit };
      setOrderedItems(prev => [...prev, order]); // Add to orders list
      setIsModalOpen(false);
      setQuantity(0); // Reset quantity
    }
  };

  return (
    <div className="item-page">
      <div className="subheader">
        <h2> Items </h2>
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

      <div className="add-item-link-wrapper">
        <Link to="/add-item" className="card-link">➕ Add Item</Link>
      </div>
    </div>
  );
};

export default ItemPage;
