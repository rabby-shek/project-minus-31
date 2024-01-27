import React, { useEffect, useState } from "react";
import DailySaleReportChart from "./DailySaleReportChart";
import useTitle from "../../hooks/useTitle";

const DailySaleReport = () => {
  useTitle("Daily Sale Report");
  const [dailySaleReportData, setDailySaleReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDailySaleReportData = async () => {
    try {
      const response = await fetch("http://localhost:6060/dailyFoodDetails");
      const data = await response.json();
      setDailySaleReportData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDailySaleReportData();
  }, []);

  let dailySaleReport = 0;
  let dailyDiscountReport = 0;
  const currentDate = new Date();
  const todaysDate = currentDate.toISOString().split("T")[0];

  const todaysSaleData = dailySaleReportData.filter(
    (items) => items.formatDate === todaysDate
  );
  console.log(todaysSaleData);
  const groupedData = {};
  todaysSaleData.forEach((item) => {
    item.selectedFoods.forEach((food) => {
      const key = `${food.foodName}_${food.selectedVariety}`;
      if (!groupedData[key]) {
        groupedData[key] = { ...food, totalQuantity: food.quantity };
      } else {
        groupedData[key].totalQuantity += food.quantity;
      }
    });
  });

  const groupedItems = Object.values(groupedData);
  return (
    <div className="daily-sale-report-container">
      <h2 className="daily-sale-report-header">Daily Sale Report</h2>
      {isLoading && <div className="custom-loader"></div>}
      {todaysSaleData.length > 0 &&
      dailySaleReportData.some((item) => item.formatDate === todaysDate) ? (
        <div>
          <DailySaleReportChart />
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sales Report</th>
              </tr>
            </thead>
            <tbody>
              {todaysSaleData.map((item) => {
                dailySaleReport += item.total;
                dailyDiscountReport += item.discount;

                return (
                  <tr key={item.id}>
                    <td>{item.formatDate}</td>
                    <td>
                      {item.selectedFoods.map((food) => (
                        <div
                          key={food.id}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <span> {food.quantity}</span>
                          <span> {food.foodName}</span>
                          <span> ({food.selectedVariety})</span>
                          <span>
                            {" "}
                            {food.varieties
                              ? food.varieties.find(
                                  (v) => v.name === food.selectedVariety
                                ).price
                              : ""}{" "}
                            TK
                          </span>
                        </div>
                      ))}
                      <div>{Array(40).fill("-").join(" ")}</div>
                      <div>Discount : {item.discount} TK</div>
                      <div>Total : {item.total} TK</div>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Given Discount :</td>
                <td>{dailyDiscountReport} TK</td>
              </tr>
              <tr>
                <td>Daily Total Sale :</td>
                <td>{dailySaleReport} TK</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          No data avaialble
        </div>
      )}

      <table>
        <thead>
          <th>Food Item</th>
          <th>Variety</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </thead>
        {groupedItems.map((food, index) => {
          const selectedVarietyPrice =
            food.varieties &&
            food.varieties.find((v) => v.name === food.selectedVariety)?.price;

          const subtotal = selectedVarietyPrice
            ? selectedVarietyPrice * food.totalQuantity
            : 0;

          return (
            <tr key={index}>
              <td>{food.foodName}</td>
              <td>{food.selectedVariety}</td>
              <td>
                {selectedVarietyPrice ? `${selectedVarietyPrice} TK` : ""}
              </td>
              <td>{food.totalQuantity}</td>
              <td>{subtotal} TK</td>
            </tr>
          );
        })}
        <tr>
          <td colSpan="4" style={{ textAlign: "right" }}>
            Total :
          </td>
          <td>
            {/* Calculate and display total here */}
            {groupedItems.reduce(
              (total, food) =>
                ((food.varieties &&
                  food.varieties.find((v) => v.name === food.selectedVariety)
                    ?.price) ||
                  0) *
                  food.totalQuantity +
                total,
              0
            )}{" "}
            TK
          </td>
        </tr>
      </table>
    </div>
  );
};

export default DailySaleReport;
