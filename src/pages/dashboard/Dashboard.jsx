import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import PrintableContent from "../../components/PrintableContent ";
import useTitle from "../../hooks/useTitle";
import fetchFoodItems from "./fetchFoodItems";
import calculatetotal from "./calculatetotal";
import { RiDeleteBin6Line } from "react-icons/ri";
const Dashboard = () => {
  useTitle("Dashbord");
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [varites, setVarities] = useState({});
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // fething food items list
  useEffect(() => {
    fetchFoodItems(setFoodItems, setIsLoading);
  }, []);
  const handleFoodItemClick = (foodItem) => {
    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      { ...foodItem, selectedVariety: foodItem.varieties[0].name, quantity: 1 },
    ]);
  };

  useEffect(() => {
    if (selectedFoods.length > 0) {
      setVarities(selectedFoods[0].varieties[0].name);
    }
  }, [selectedFoods]);

  useEffect(() => {
    // Calculate the total based on selectedFoods and apply the discount
    calculatetotal(selectedFoods, discount, setTotal);
  }, [selectedFoods, discount]);

  const handleVaritesChange = (e, foodIndex) => {
    const selectedVariety = e.target.value;

    setSelectedFoods((prevSelectedFoods) => {
      const updatedSelectedFoods = [...prevSelectedFoods];
      updatedSelectedFoods[foodIndex] = {
        ...updatedSelectedFoods[foodIndex],
        selectedVariety: selectedVariety,
      };
      return updatedSelectedFoods;
    });

    setVarities(selectedVariety);
  };

  const handleQuantityChange = (foodIndex, newQuantity) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedSelectedFoods = [...prevSelectedFoods];
      updatedSelectedFoods[foodIndex] = {
        ...updatedSelectedFoods[foodIndex],
        quantity: newQuantity,
      };
      return updatedSelectedFoods;
    });
  };

  const handleDiscountChange = (e) => {
    const newDiscount = parseFloat(e.target.value);
    setDiscount(isNaN(newDiscount) ? 0 : newDiscount);
  };
  const handleDeleteFoodItem = (foodIndex) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedSelectedFoods = [...prevSelectedFoods];
      updatedSelectedFoods.splice(foodIndex, 1);
      return updatedSelectedFoods;
    });
  };

  const componentRef = useRef();
  const currentDate = new Date();
  const formatDate = currentDate.toISOString().split("T")[0];
  const handlePostSelectedFoodDetails = async () => {
    try {
      const response = await fetch("http://localhost:6060/dailyFoodDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedFoods,
          total,
          discount,
          formatDate,
        }),
      });

      if (response.ok) {
        console.log("Selected food details posted successfully.");
      } else {
        console.error("Failed to post selected food details.");
      }
    } catch (error) {
      console.error("Error posting selected food details:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header">
        <h2 className="brand-name">Cube 270 Degree Restaurant, Dhaka</h2>
      </div> */}
      {isLoading && <div className="custom-loader"></div>}
      <div className="dashboard-body">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="food-item"
            onClick={() => handleFoodItemClick(item)}
          >
            <div>{item.foodName}</div>
          </div>
        ))}
      </div>

      {selectedFoods.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Variety</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedFoods.map((foodDetail, foodIndex) => {
                const variety = foodDetail.varieties.find(
                  (v) => v.name === foodDetail.selectedVariety
                );
                const subtotal = variety
                  ? variety.price * foodDetail.quantity
                  : 0;

                return (
                  <tr key={foodIndex}>
                    <td>{foodDetail.foodName}</td>
                    <td>
                      <select
                        value={foodDetail.selectedVariety || varites}
                        onChange={(e) => handleVaritesChange(e, foodIndex)}
                      >
                        {foodDetail.varieties.map(
                          (varietiesName, varietiesIndex) => (
                            <option
                              key={varietiesIndex}
                              value={varietiesName.name}
                            >
                              {varietiesName.name}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td>{variety?.price || ""}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            foodIndex,
                            Math.max(1, foodDetail.quantity - 1)
                          )
                        }
                      >
                        <AiOutlineMinus />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={foodDetail.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            foodIndex,
                            Math.max(1, parseInt(e.target.value, 10))
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            foodIndex,
                            foodDetail.quantity + 1
                          )
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </td>
                    <td>{subtotal}</td>
                    <td>
                      <button onClick={() => handleDeleteFoodItem(foodIndex)}>
                        <RiDeleteBin6Line className="delete-icon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4">Discount</td>
                <td>
                  <input
                    type="number"
                    id="discountInput"
                    value={discount === 0 ? "" : discount}
                    onChange={handleDiscountChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="4">Total</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td colSpan="4">Total</td>
                <td>
                  {" "}
                  <ReactToPrint
                    trigger={() => <button>Print</button>}
                    content={() => componentRef.current}
                    onAfterPrint={() => handlePostSelectedFoodDetails()}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div ref={componentRef}>
            <PrintableContent
              selectedFoods={selectedFoods}
              total={total}
              discount={discount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
