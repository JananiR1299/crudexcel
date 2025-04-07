import React from "react";

const Form = ({ form, setForm, isEditing, handleSubmit, showSuccess }) => {
  return (
    <div className="container my-4">
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
           User Added successfully!
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">{isEditing ? "Edit User" : "Add User"}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                value={form.Phone}
                onChange={(e) => setForm({ ...form, Phone: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn ${isEditing ? "btn-warning" : "btn-primary"}`}
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
