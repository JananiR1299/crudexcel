import React, { useState } from 'react';
import '../style.css';

const ToBeOrdered = ({ toBeOrderedItems, onOrder }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleBoxClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[item.Name];
      setQuantities(updatedQuantities);
    } else {
      setSelectedItems([...selectedItems, item]);
      setQuantities({ ...quantities, [item.Name]: 1 });
    }
  };

  const handleQuantityChange = (item, value) => {
    const updatedQuantities = {
      ...quantities,
      [item.Name]: parseInt(value) || 1
    };
    setQuantities(updatedQuantities);
  };

  const handleOrder = () => {
    setShowPopup(true);
  };

  const handleConfirmOrder = () => {
    const orderedData = selectedItems.map(item => ({
      ...item,
      Quantity: quantities[item.Name]
    }));
    onOrder(orderedData);
    setSelectedItems([]);
    setQuantities({});
    setShowPopup(false);
  };

  const calculateTotal = () => {
    return selectedItems.reduce((acc, item) => {
      const qty = quantities[item.Name] || 1;
      return acc + qty * item.PurchasePrice;
    }, 0);
  };

  return (
    <div className="tab-page">
      <div className="item-box-grid">
        {toBeOrderedItems.map((item, index) => {
          const isSelected = selectedItems.includes(item);
          return (
            <div
              key={index}
              className={`item-box ${isSelected ? 'selected' : ''}`}
              onClick={() => handleBoxClick(item)}
            >
              <h4>{item.Name}</h4>
              <p>Available: {item.Quantity}</p>
              <p>Purchase: ₹{item.PurchasePrice}</p>
              {isSelected && (
                <div>
                  <label>Qty: </label>
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.Name]}
                    onClick={e => e.stopPropagation()}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedItems.length > 0 && (
        <button className="btn" onClick={handleOrder}>Place Order</button>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>🧾 Order Summary</h3>
            <ul>
              {selectedItems.map((item, index) => {
                const qty = quantities[item.Name] || 1;
                return (
                  <li key={index}>
                    {item.Name} - Qty: {qty} × ₹{item.PurchasePrice} = ₹{qty * item.PurchasePrice}
                  </li>
                );
              })}
            </ul>
            <p><strong>Total: ₹{calculateTotal()}</strong></p>
            <div className="popup-buttons">
              <button onClick={handleConfirmOrder} className="btn">Confirm</button>
              <button onClick={() => setShowPopup(false)} className="btn cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToBeOrdered;
