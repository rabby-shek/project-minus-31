import React, { useState } from "react";
import axios from "axios";
import Notification from "../../components/Notification";
import useTitle from "../../hooks/useTitle";
const AddFoodItem = () => {
  useTitle("Add New Food Item")
  const [foodName, setFoodName] = useState("");
  const [varieties, setVarieties] = useState([]);
  const [newVariety, setNewVariety] = useState({ name: "", price: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const handleAddVariety = () => {
    if (newVariety.name && newVariety.price) {
      setVarieties((prevVarieties) => [...prevVarieties, newVariety]);
      setNewVariety({ name: "", price: "" });
    }
  };

  const handleAddFoodItem = async () => {
    try {
      if (foodName && varieties.length > 0) {
        const newFoodItem = { foodName, varieties };
        const response = await axios.post(
          "http://localhost:6060/foodItems",
          newFoodItem
        );
        const addedFoodItem = response.data;
        setFoodName("");
        setVarieties([]);
        setNewVariety({ name: "", price: "" });
        setNotification({
          message: "Food item added successfully!",
          type: "success",
        });
        console.log("success:", addedFoodItem);
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      setNotification({
        message: "Error adding food item. Please try again.",
        type: "error",
      });
    }
  };
  const handleNotificationClose = () => {
    setNotification({ message: "", type: "" });
  };
  return (
    <div className="add-food-item-container">
      <h2>Add Food Item</h2>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
      <div className="form-container">
        <label>
          Food Name:
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </label>
        <div className="varieties-section">
          {
            varieties.length> 0 && <label>
            Varieties:
            <ul>
              {varieties.map((variety, index) => (
                <li key={index}>
                  {variety.name} - Price: {variety.price}
                </li>
              ))}
            </ul>
          </label>
          }
          <div className="new-variety-section">
            <label>
              Variety Name:
              <input
                type="text"
                value={newVariety.name}
                onChange={(e) =>
                  setNewVariety({ ...newVariety, name: e.target.value })
                }
              />
            </label>
            <label>
              Variety Price:
              <input
                type="text"
                value={newVariety.price}
                onChange={(e) =>
                  setNewVariety({ ...newVariety, price: e.target.value })
                }
              />
            </label>
            <button onClick={handleAddVariety}>Add Variety</button>
          </div>
        </div>
        <button onClick={handleAddFoodItem}>Add Food Item</button>
      </div>
    </div>
  );
};

export default AddFoodItem;
