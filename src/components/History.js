import React from 'react';
import '../style.css';

const History = ({ historyItems, onUpdateStock }) => {
  const handleUpdate = (item) => {
    onUpdateStock(item);
  };

  return (
    <div className="tab-page">
      <h2>History</h2>
      {Object.keys(historyItems).map((date) => (
        <div key={date} className="order-date">
          <h3>🗓️ {date}</h3>
          <ul className="item-list">
            {historyItems[date].map((item, index) => (
              <li key={index} className="item">
                <input type="checkbox" onChange={() => handleUpdate(item)} />
                {item.Name} - Qty: {item.Quantity} - Added to stock
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default History;
