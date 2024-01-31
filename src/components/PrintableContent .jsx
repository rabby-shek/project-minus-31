import React, { useState, useEffect } from "react";
import axios from "axios";
const PrintableContent = ({ selectedFoods, total, discount }) => {
  const [printData, setPrintData] = useState([]);
  const [formData, setFormData] = useState({
    name: "name",
    phone: "",
    address: "",
  });
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
  const foodList = selectedFoods.map((foodDetails, index) => {
    const selectedVarietyObj = foodDetails.varieties.find(
      (variety) => variety.name === foodDetails.selectedVariety
    );

    const price = selectedVarietyObj ? selectedVarietyObj.price : "N/A";
    const hyphens = "----------";
    return (
      <li key={index} className="print-food-item">
        <span className="print-food-name">
          {foodDetails.quantity} {foodDetails.foodName}
        </span>
        <span className="print-variety">({foodDetails.selectedVariety})</span>
        <span> {hyphens}</span>
        <span className="print-price">Price: {price} TK</span>
      </li>
    );
  });

  return (
    <div className="printable-container">
      <div className="printable-content">
        <h2>{formData.name}</h2>
        <div className="print-restaurant-info">
          <div className="print-restaurant-address">{formData.address}</div>
          <div className="print-restaurant-number">{formData.phone}</div>
        </div>
        <ul className="print-food-list">{foodList}</ul>
        <hr className="divider" />
        <div>Discount : {discount}</div>
        <div className="print-total">Total Price: {total} TK</div>
      </div>
    </div>
  );
};

export default PrintableContent;
