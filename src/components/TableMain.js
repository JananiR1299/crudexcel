// TablePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.sheetbest.com/sheets/f94e82d3-f836-4a3f-94de-3dbff9d78a7e";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({ ID: "", Name: "", Email: "", Phone: "" });
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleEdit = (row) => {
    setEditForm(row);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`${API_URL}/search`, { ID: editForm.ID }, {
        headers: { "Content-Type": "application/json" },
        data: editForm,
      });
      setShowModal(false);
      getData();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`${API_URL}/search?ID=${row.ID}`, {
        headers: { "Content-Type": "application/json" },
      });
      getData();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Data Table</h2>
      <Table data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/")}
      >
        Back to Form
      </button>
      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" name="ID" value={editForm.ID} disabled />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="Name" value={editForm.Name} onChange={handleModalChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="Email" value={editForm.Email} onChange={handleModalChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="Phone" value={editForm.Phone} onChange={handleModalChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TablePage;
