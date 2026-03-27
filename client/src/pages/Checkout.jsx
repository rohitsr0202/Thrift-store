import React from "react";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout Page 💳</h1>
      <p>Product ID: {id}</p>

      <button>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;