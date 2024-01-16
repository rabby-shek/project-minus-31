import React from "react";

const PrintableContent = ({ selectedFoods, total, discount }) => {
  console.log("selected food items: ", selectedFoods);
  const foodList = selectedFoods.map((foodDetails, index) => {
    const selectedVarietyObj = foodDetails.varieties.find(
      (variety) => variety.name === foodDetails.selectedVariety
    );

    const price = selectedVarietyObj ? selectedVarietyObj.price : "N/A";
    const hyphens = "----------";
    return (
      <li key={index} className="print-food-item">
        <span className="print-food-name">{foodDetails.quantity} {foodDetails.foodName}</span>
        <span className="print-variety">({foodDetails.selectedVariety})</span>
        <span> {hyphens}</span>
        <span className="print-price">Price: {price} TK</span>
      </li>
    );
  });

  return (
    <div className="printable-container">
      <div className="printable-content">
        <h2>Restaurant Name</h2>
        <div className="print-restaurant-info">
          <div className="print-restaurant-address">
            asbdc, Dhaka 1232, Bangladesh
          </div>
          <div className="print-restaurant-number">0172323334</div>
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
