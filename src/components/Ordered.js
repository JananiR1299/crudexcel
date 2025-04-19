import React from 'react';
import '../style.css';

const Ordered = ({ orderedItems }) => {
  return (
    <div className="tab-page">
      <h2> Ordered Items</h2>
      {Object.keys(orderedItems).map((date) => (
        <div key={date} className="order-date">
          <h3>Order Date: {date}</h3>
          <ul className="item-list">
            {orderedItems[date].map((item, index) => (
              <li key={index} className="item">
                <div><strong>Name:</strong> {item.Name}</div>
                <div><strong>Quantity:</strong> {item.Quantity}</div>
                <div><strong>Purchase Price:</strong> ₹{item.PurchasePrice}</div>
                <div><strong>Total:</strong> ₹{item.Quantity * item.PurchasePrice}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Ordered;
