import React, { useEffect, useState } from "react";
import DailySaleReportChart from "./DailySaleReportChart";
import useTitle from "../../hooks/useTitle";
import PerItemSaleReport from "./PerItemSaleReport";
const DailySaleReport = () => {
  // setting up title for this
  useTitle("Daily Sale Report");
  let dailySaleReport = 0;
  let dailyDiscountReport = 0;
  let countItem = 1;
  const currentDate = new Date();
  const todaysDate = currentDate.toISOString().split("T")[0];
  const [dailySaleReportData, setDailySaleReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSaleDate, setSelectedSaleDate] = useState(todaysDate);

  // fetch daily sales report data
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
  const todaysSaleData = dailySaleReportData.filter(
    (items) => items.formatDate === selectedSaleDate
  );

  // get total value of soled items

  // console.log(todaysSaleData);
  //  console.log(todaysSaleData);

  return (
    <div className="daily-sale-report-container">
      <h2 className="daily-sale-report-header">Sales Report</h2>
      <div>
        <span>Select a Date : </span>
        <input
          style={{
            width: "150px",
          }}
          type="date"
          value={selectedSaleDate}
          onChange={(e) => setSelectedSaleDate(e.target.value)}
        />
      </div>
      {isLoading && <div className="custom-loader"></div>}
      {todaysSaleData.length > 0 &&
      dailySaleReportData.some(
        (item) => item.formatDate === selectedSaleDate
      ) ? (
        <div>
          <DailySaleReportChart />
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Date</th>
                <th>Sales Report</th>
              </tr>
            </thead>
            <tbody>
              {todaysSaleData.map((item, index) => {
                dailySaleReport += item.total;
                dailyDiscountReport += item.discount;

                return (
                  <tr key={index}>
                    <td>{countItem++}</td>
                    <td>{item.formatDate}</td>
                    <td>
                      {item.selectedFoods.map((food, index) => (
                        <div
                          key={index}
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
                                ).price * food.quantity
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
                <td></td>
                <td>Given Discount :</td>
                <td>{dailyDiscountReport} TK</td>
              </tr>
              <tr>
                <td></td>
                <td>Daily Total Sale :</td>
                <td>{dailySaleReport} TK</td>
              </tr>
            </tbody>
          </table>
          {/* food item sales report  */}
          <PerItemSaleReport
            todaysSaleData={todaysSaleData}
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          No data available
        </div>
      )}
    </div>
  );
};

export default DailySaleReport;
