// MainPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";

const MainPage = () => {
  const [form, setForm] = useState({ ID: "", Name: "", Email: "", Phone: "" });
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && originalData) {
        // Use PUT with query param and correct headers
        await axios.put(`${API_URL}/search?ID=${originalData.ID}`, form, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer zbjm6rEKHSlX2VS3UbhohWprVJNocM8zpeufSYVi$VOIIy$fB4wwCkc4lLr9Or_D"
          }
        });
  
        setIsEditing(false);
        setOriginalData(null);
      } else {
        const maxId = data.reduce((max, item) => {
          const id = parseInt(item.ID);
          return id > max ? id : max;
        }, 0);
        const newId = maxId + 1;
        const newData = { ...form, ID: newId.toString() };
  
        await axios.post(API_URL, newData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer zbjm6rEKHSlX2VS3UbhohWprVJNocM8zpeufSYVi$VOIIy$fB4wwCkc4lLr9Or_D"
          }
        });
      }
  
      setForm({ ID: "", Name: "", Email: "", Phone: "" });
      getData();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };
  
  
 


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary float-end"
        onClick={() => navigate("/table")}
      >
        Home
      </button>

      <Form
  form={form}
  setForm={setForm}
  isEditing={isEditing}
  handleSubmit={handleSubmit}
  showSuccess={showSuccess}
/>

    </div>
  );
};

export default MainPage;
