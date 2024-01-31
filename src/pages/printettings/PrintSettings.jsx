import React, { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import axios from "axios";
import Notification from "../../components/Notification";
const PrintSettings = () => {
  useTitle("Print Settings");
  const [printData, setPrintData] = useState([]);
  const [formData, setFormData] = useState({
    name: "name",
    phone: "",
    address: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const fetchPrintData = async () => {
    try {
      const response = await axios.get("http://localhost:6060/printDetails");
      const data = await response.data;
      setPrintData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrintData();
  }, []);
  // finding the last object values of the array
  useEffect(() => {
    if (printData.length > 0) {
      const lastPrintData = printData[printData.length - 1];
      setFormData((prevData) => ({
        ...prevData,
        name: lastPrintData.name,
        phone: lastPrintData.phone,
        address: lastPrintData.address,
      }));
    }
  }, [printData]);
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
      setNotification({
        message: "Print Data Added Successfully!",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNotificationClose = () => {
    setNotification({ message: "", type: "" });
  };
  return (
    <div className="print-settings-container">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
      <div className="app-header-title ">Print Settings</div>
      <form className="app-form-container" onSubmit={handleFormSubmit}>
        <div className="app-form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormInputChange}
            placeholder="Enter Organization Name"
          />
        </div>
        <div className="app-form-group">
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleFormInputChange}
            placeholder="Enter Organization Number"
          />
        </div>
        <div className="app-form-group">
          <textarea
            id=""
            cols="30"
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleFormInputChange}
            placeholder="Enter Organization Address"
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
