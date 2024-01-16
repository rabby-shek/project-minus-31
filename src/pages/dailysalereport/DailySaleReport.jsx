import React, { useEffect, useState } from "react";

const DailySaleReport = () => {
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
  console.log(todaysDate);

  const todaysSaleData = dailySaleReportData.filter((items) => items.formatDate === todaysDate);

  return (
    <div className="daily-sale-report-container">
      <h2 className="daily-sale-report-header">Daily Sale Report</h2>
      {isLoading && <div className="custom-loader"></div>}
      {todaysSaleData.length > 0 &&
      dailySaleReportData.some((item) => item.formatDate === todaysDate) ? (
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
                    <div>{Array(23).fill("-").join("")}</div>
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
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          No data avaialble
        </div>
      )}
    </div>
  );
};

export default DailySaleReport;
