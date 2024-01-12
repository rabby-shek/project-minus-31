import React, { useState, useEffect } from "react";

const AllFoodItem = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch food items from the API
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:6060/foodItems");
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);
  let id = 1;
  return (
    <div>
      <h2>All Food Items</h2>
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
          <tbody>
            {foodItems.map((foodItem) => (
              <tr key={foodItem.id}>
                <td>{id++}</td>
                <td>{foodItem.foodName}</td>
                <td>
                  <ul
                    style={{
                      listStyle: "none",
                    }}
                  >
                    {foodItem.varieties.map((variety) => (
                      <li key={variety.name}>
                        {variety.name} - Price: {variety.price}
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
