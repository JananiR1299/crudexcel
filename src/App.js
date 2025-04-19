import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/HomePage';
import AddItem from './components/AddItemForm';
import Orders from './components/OrderPage';
import './style.css';
import ItemPage from './components/Items';
import Ordered from './components/Ordered';
import History from './components/History';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/ordered" element={<Ordered />} />
          <Route path="/history" element={<History />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

// // App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// // You can import other pages later like:
// // import OrderedPage from "./pages/OrderedPage";
// // import HistoryPage from "./pages/HistoryPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* Future routes */}
//         {/* <Route path="/ordered" element={<OrderedPage />} /> */}
//         {/* <Route path="/history" element={<HistoryPage />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
