import React from "react";

const PrintableContent = ({ selectedFoods, total }) => (
  <div className="printable-content" >
    <table>
      <thead>
        <tr>
          <th>Food</th>
          <th>Variety</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
            
            </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">Total</td>
          <td>{total}</td>
        </tr>
      </tfoot>
    </table>
  </div>
);

export default PrintableContent;
