import React from "react";

const PerItemSaleReport = ({ todaysItemNames , total, discount, varieties}) => {

    const margin =  <div style={{width:"100%",height:"1px",borderBottom:"1px solid black",opacity:"0.3"}}></div>;
  
  return (
    <>
      <h2 className="daily-sale-report-header">Total Items Soled</h2>
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
            return (
              <tr key={index}>
                <td>{perItem}</td>
                <td>
                variety List
                {margin}
                variety List
                {margin}
                variety List
                {margin}
                variety List
                    
                </td>
                <td>
                Variety Price
                {margin}
                Variety Price
                {margin}
                Variety Price
                {margin}
                Variety Price
                    
                </td>
                <td>
                Quantity List
                {margin}
                Quantity List
                {margin}
                Quantity List
                {margin}
                Quantity List
                    
                    
                    
                </td>
                <td>
                subtotal List
                {margin}
                subtotal List
                {margin}
                subtotal List
                {margin}
                subtotal List
                   
                </td>

              </tr>
            );
          })}
           <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Discount</td>
            <td>{discount}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default PerItemSaleReport;
