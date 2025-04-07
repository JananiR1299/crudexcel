// Table.js
import React from "react";

const Table = ({ data, handleEdit, handleDelete }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.ID}</td>
            <td>{row.Name}</td>
            <td>{row.Email}</td>
            <td>{row.Phone}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(row)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
