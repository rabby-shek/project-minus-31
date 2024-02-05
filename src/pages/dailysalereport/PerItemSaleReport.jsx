import React from "react";

const PerItemSaleReport = ({ todaysSaleData }) => {
  const todaysItemNames = [];
  todaysSaleData.forEach((item) => {
    item.selectedFoods.forEach((food) => {
      if (!todaysItemNames.includes(food.foodName)) {
        todaysItemNames.push(food.foodName);
      }
    });
  });

  const total = todaysSaleData.map((item) => item.total);
  const discount = todaysSaleData.map((item) => item.discount);

  const calculateTotalDiscount = discount.reduce((acc, val) => acc + val, 0);
  const calculateTotal = total.reduce((acc, val) => acc + val, 0);

  const margin = (
    <div
      style={{
        width: "100%",
        height: "1px",
        borderBottom: "1px solid black",
        opacity: "0.3",
      }}
    ></div>
  );

  const varietyQuantitiesMap = {};

  return (
    <>
      <h2 className="daily-sale-report-header">Total Items Sold</h2>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Variety</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {todaysItemNames.map((perItem, index) => {
            const matchingFoods = todaysSaleData
              .flatMap((item) =>
                item.selectedFoods.filter((food) => food.foodName === perItem)
              )
              .reduce((acc, food) => {
                const key = `${food.foodName}-${food.selectedVariety}`;
                const quantity = varietyQuantitiesMap[key] || 0;

                varietyQuantitiesMap[key] = quantity + food.quantity;

                if (
                  !acc.find(
                    (item) => item.selectedVariety === food.selectedVariety
                  )
                ) {
                  acc.push(food);
                }

                return acc;
              }, []);

            return (
              <tr key={index}>
                <td>{perItem}</td>
                <td>
                  {matchingFoods.map((matchingFood, foodIndex) => (
                    <React.Fragment key={foodIndex}>
                      {matchingFood.selectedVariety}
                      {margin}
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  {matchingFoods.map((matchingFood, foodIndex) => (
                    <React.Fragment key={foodIndex}>
                      {matchingFood.varieties
                        ? matchingFood.varieties.find(
                            (v) => v.name === matchingFood.selectedVariety
                          ).price
                        : ""}
                      {margin}
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  {matchingFoods.map((matchingFood, foodIndex) => (
                    <React.Fragment key={foodIndex}>
                      {
                        varietyQuantitiesMap[
                          `${matchingFood.foodName}-${matchingFood.selectedVariety}`
                        ]
                      }
                      {margin}
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  {matchingFoods.map((matchingFood, foodIndex) => (
                    <React.Fragment key={foodIndex}>
                      {varietyQuantitiesMap[
                        `${matchingFood.foodName}-${matchingFood.selectedVariety}`
                      ] *
                        (matchingFood.varieties
                          ? matchingFood.varieties.find(
                              (v) => v.name === matchingFood.selectedVariety
                            ).price
                          : "")}
                      {margin}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Discount</td>
            <td>{calculateTotalDiscount}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>{calculateTotal}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PerItemSaleReport;
