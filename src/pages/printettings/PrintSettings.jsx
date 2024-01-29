import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";
import axios from "axios";
const PrintSettings = () => {
  useTitle("Print Settings");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        "http://localhost:6060/printDetails",
        formData
      );
      console.log(response);
      setFormData({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="print-settings-container">
      <div className="app-header-title ">Print Settings</div>
      <form className="app-form-container" onSubmit={handleFormSubmit}>
        <div className="app-form-group">
          <label htmlFor="" className="app-form-label">
            Oranization Name :{" "}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormInputChange}
          />
        </div>
        <div className="app-form-group">
          <label htmlFor="" className="app-form-label">
            Oranization Phone :{" "}
          </label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleFormInputChange}
          />
        </div>
        <div className="app-form-group">
          <label htmlFor="" className="app-form-label">
            Oranization Address :{" "}
          </label>
          <textarea
            id=""
            cols="30"
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleFormInputChange}
          ></textarea>
        </div>
        <div className="app-form-group">
          <button className="app-submit-button ">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PrintSettings;
