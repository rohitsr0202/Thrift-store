import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Our Products 🛍️</h1>

      <div style={styles.grid}>
        {products.map((p) => (
          <div
            key={p._id}
            style={styles.card}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img src={p.image} alt={p.name} style={styles.image} />

            <h3>{p.name}</h3>
            <p style={styles.price}>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    cursor: "pointer",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  price: {
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Home;