import React, { useState, useEffect } from "react";
import axios from "axios";
import useTitle from "../../hooks/useTitle";

const UpdateFoodItem = () => {
  useTitle("Update Food Details");
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [updatedFoodItem, setUpdatedFoodItem] = useState({
    foodName: "",
    varieties: [],
  });
  const [newVariety, setNewVariety] = useState({
    name: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:6060/foodItems");
        setFoodItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleFoodItemClick = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setUpdatedFoodItem({
      foodName: foodItem.foodName,
      varieties: foodItem.varieties.map(({ name, price }) => ({ name, price })),
    });
  };

  const handleUpdateFoodItem = async () => {
    try {
      if (selectedFoodItem) {
        await axios.put(
          `http://localhost:6060/foodItems/${selectedFoodItem.id}`,
          updatedFoodItem
        );

        const response = await axios.get("http://localhost:6060/foodItems");
        setFoodItems(response.data);

        setSelectedFoodItem(null);
        setUpdatedFoodItem({ foodName: "", varieties: [] });
      }
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const handleDeleteFoodItem = async () => {
    try {
      if (selectedFoodItem) {
        await axios.delete(
          `http://localhost:6060/foodItems/${selectedFoodItem.id}`
        );

        const response = await axios.get("http://localhost:6060/foodItems");
        setFoodItems(response.data);

        setSelectedFoodItem(null);
        setUpdatedFoodItem({ foodName: "", varieties: [] });
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleAddVariety = () => {
    setUpdatedFoodItem((prevFoodItem) => ({
      ...prevFoodItem,
      varieties: [...prevFoodItem.varieties, { ...newVariety }],
    }));
    setNewVariety({ name: "", price: "" });
  };
  const handleDeleteVariety = (index) => {
    setUpdatedFoodItem((prevFoodItem) => {
      const updatedVarieties = [...prevFoodItem.varieties];
      updatedVarieties.splice(index, 1); // Remove the variety at the specified index
      return { ...prevFoodItem, varieties: updatedVarieties };
    });
  };
  return (
    <div className="update-food-item-container">
      <div className="app-header-title"> Food Items</div>
      {isLoading && <div className="custom-loader"></div>}
      <div className="food-items-list">
        <select>
          {foodItems.map((item) => (
            <option key={item.id} onClick={() => handleFoodItemClick(item)}>
              {item.foodName}
            </option>
          ))}
        </select>
      </div>
      {selectedFoodItem && (
        <div className="update-form">
          <label>
            New Food Name:
            <input
              type="text"
              value={updatedFoodItem.foodName}
              onChange={(e) =>
                setUpdatedFoodItem({
                  ...updatedFoodItem,
                  foodName: e.target.value,
                })
              }
            />
          </label>
          <label>
            Varieties:
            <ul>
              {updatedFoodItem.varieties.map((variety, index) => (
                <li key={index}>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={variety.name}
                      onChange={(e) => {
                        const updatedVarieties = [...updatedFoodItem.varieties];
                        updatedVarieties[index].name = e.target.value;
                        setUpdatedFoodItem({
                          ...updatedFoodItem,
                          varieties: updatedVarieties,
                        });
                      }}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="text"
                      value={variety.price}
                      onChange={(e) => {
                        const updatedVarieties = [...updatedFoodItem.varieties];
                        updatedVarieties[index].price = e.target.value;
                        setUpdatedFoodItem({
                          ...updatedFoodItem,
                          varieties: updatedVarieties,
                        });
                      }}
                    />
                  </label>
                  <button onClick={() => handleDeleteVariety(index)}>
                    Delete Variety
                  </button>
                </li>
              ))}
            </ul>
          </label>
          <label>
            New Variety:
            <input
              type="text"
              value={newVariety.name}
              onChange={(e) =>
                setNewVariety({ ...newVariety, name: e.target.value })
              }
              placeholder="Variety Name"
            />
            <input
              type="text"
              value={newVariety.price}
              onChange={(e) =>
                setNewVariety({ ...newVariety, price: e.target.value })
              }
              placeholder="Variety Price"
            />
            <button onClick={handleAddVariety}>Add Variety</button>
          </label>
          <button onClick={handleUpdateFoodItem}>Update</button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={handleDeleteFoodItem}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateFoodItem;
