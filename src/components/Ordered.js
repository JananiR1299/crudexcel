import React from 'react';
import '../style.css';

const Ordered = ({ orderedItems }) => {
  if (!orderedItems || Object.keys(orderedItems).length === 0) {
    return <div>No orders found.</div>; // Handle the case where there are no orders
  }

  return (
    <div className="tab-page">
      <h2>Ordered Items</h2>
      {Object.keys(orderedItems).map((date) => (
        <div key={date} className="order-date">
          <h3>Order Date: {date}</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderedItems[date].map((item, index) => (
                <tr key={index}>
                  <td>{item.Name}</td>
                  <td>{item.Quantity}</td>
                  <td>₹{item.PurchasePrice}</td>
                  <td>₹{item.Quantity * item.PurchasePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Ordered;
