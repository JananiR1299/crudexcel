import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/waterbottle.webp';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Honest Bike Care</h1>
      </div>
      <nav>
        <Link to ="/">Home</Link>
        <Link to="/items">Orders</Link>
        <Link to="/orders">Items</Link>
      </nav>
    </header>
  );
};

export default Header;


// import React from "react";

// const Header = () => {
//   return (
//     <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <img
//           src="/logo192.png"
//           alt="Logo"
//           className="h-8 w-8 object-contain"
//         />
//         <h1 className="text-lg font-bold">Honestboke Shop</h1>
//       </div>
//       <div className="text-sm text-gray-500">Inventory Manager</div>
//     </header>
//   );
// };

// export default Header;
