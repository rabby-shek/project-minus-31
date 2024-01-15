import React, { useState, useEffect } from "react";
import axios from "axios";

const AllFoodItem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editableItem, setEditableItem] = useState(null);

  useEffect(() => {
    // Fetch food items from the API
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:6060/foodItems");
        const data = await response.json();
        setFoodItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleDoubleClick = (item) => {
    setEditableItem(item.id);
  };

  const handleBlur = (foodItem) => {
    setEditableItem(null);
    updateDataOnServer(foodItem);
  };

  const handleFoodNameChange = (event, item) => {
    const updatedFoodItems = foodItems.map((foodItem) => {
      if (foodItem.id === item.id) {
        return { ...foodItem, foodName: event.target.value };
      } else {
        return foodItem;
      }
    });

    setFoodItems(updatedFoodItems);
  };

  const handleVarietyNameChange = (event, foodItem, variety) => {
    const updatedFoodItems = foodItems.map((item) => {
      if (item.id === foodItem.id) {
        const updatedVarieties = item.varieties.map((v) => {
          if (v.name === variety.name) {
            return { ...v, name: event.target.value };
          } else {
            return v;
          }
        });

        return { ...item, varieties: updatedVarieties };
      } else {
        return item;
      }
    });

    setFoodItems(updatedFoodItems);
  };

  const handleVarietyPriceChange = (event, foodItem, variety) => {
    const updatedFoodItems = foodItems.map((item) => {
      if (item.id === foodItem.id) {
        const updatedVarieties = item.varieties.map((v) => {
          if (v.name === variety.name) {
            return { ...v, price: event.target.value };
          } else {
            return v;
          }
        });

        return { ...item, varieties: updatedVarieties };
      } else {
        return item;
      }
    });

    setFoodItems(updatedFoodItems);
  };

  const updateDataOnServer = async (updatedFoodItem) => {
    console.log("Updated Food Item:", updatedFoodItem);
    try {
      const response = await axios.put(`http://localhost:6060/foodItems/${updatedFoodItem.id}`, updatedFoodItem);

      if (response.status === 200) {
        console.log(`Data for food item with ID ${updatedFoodItem.id} updated successfully on the server`);
      } else {
        console.error('Failed to update data on the server');
      }
    } catch (error) {
      console.error('Error updating data on the server:', error);
    }
  };

  let id = 1;

  return (
    <div style={{ marginBottom: "100px" }}>
      <h2>All Food Items</h2>
      {isLoading && <div className="custom-loader"></div>}
      {foodItems.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Name</th>
              <th>Varieties</th>
              {/* Add more table headers based on your data structure */}
            </tr>
          </thead>
          <tbody >
            {foodItems.map((foodItem) => (
              <tr key={foodItem.id} onBlur={() => handleBlur(foodItem)}>
                <td>{id++}</td>
                <td
                  onDoubleClick={() => handleDoubleClick(foodItem)}
                >
                  {editableItem === foodItem.id ? (
                    <input
                      type="text"
                      value={foodItem.foodName}
                      onChange={(e) => handleFoodNameChange(e, foodItem)}
                    />
                  ) : (
                    foodItem.foodName
                  )}
                </td>
                <td>
                  <ul
                    style={{
                      listStyle: "none",
                    }}
                  >
                    {foodItem.varieties.map((variety) => (
                      <li
                      onDoubleClick={() => handleDoubleClick(foodItem)}
                      >
                        {editableItem === foodItem.id ? (
                          <div>
                            <input
                              type="text"
                              value={variety.name}
                              onChange={(e) =>
                                handleVarietyNameChange(e, foodItem, variety)
                              }
                            />
                            <input
                              type="text"
                              value={variety.price}
                              onChange={(e) =>
                                handleVarietyPriceChange(e, foodItem, variety)
                              }
                            />
                          </div>
                        ) : (
                          `${variety.name} - Price: ${variety.price}`
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllFoodItem;
