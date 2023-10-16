import React, { useState } from "react";
import "./EditForm.css";
const EditForm = ({ currentUserData, saveUserData }) => {
  let [curUserData, SetCurUserData] = useState(currentUserData);
  const validateUser = (userData) => {
    if (!userData.name) {
      return false;
    }
    if (!userData.email) {
      return false;
    }
    if (!userData.role) {
      return false;
    }
    return true;
  };
  const HandleFormSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    if (validateUser(curUserData)) {
      saveUserData({ ...curUserData });
    }
  };
  return (
    <div className="formWindow boxShadow round4 normal">
      <form
        key="editform"
        className="formContainer"
        onSubmit={HandleFormSubmit}
      >
        <h1>Edit User</h1>
        <label htmlFor="name">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          value={curUserData.name}
          name="name"
          required
          onChange={(e) =>
            SetCurUserData({ ...curUserData, name: e.target.value })
          }
        />
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          value={curUserData.email}
          name="email"
          required
          onChange={(e) =>
            SetCurUserData({ ...curUserData, email: e.target.value })
          }
        />
        <label htmlFor="role">
          <b>Role</b>
        </label>
        <input
          type="text"
          placeholder="Enter Role"
          value={curUserData.role}
          name="role"
          required
          onChange={(e) =>
            SetCurUserData({ ...curUserData, role: e.target.value })
          }
        />
        <button type="submit" className="secondary btn">
          Save
        </button>
        <button
          type="button"
          className="error-tag btn"
          onClick={() => saveUserData(null)}
        >
          Close
        </button>
      </form>
    </div>
  );
};
export default EditForm;
