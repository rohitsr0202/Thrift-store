import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { addToCart } from "../api/cartApi";
import "./ProductDetail.css";

const sizeChart = [
  { size: "S", chest: 44, length: 26.5, sleeve: 31.5 },
  { size: "M", chest: 46, length: 27, sleeve: 32 },
  { size: "L", chest: 48, length: 27.5, sleeve: 32.5 },
  { size: "XL", chest: 50, length: 28, sleeve: 32.5 },
];

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="product-section">
      <button
        onClick={() => setOpen(!open)}
        className="product-section__toggle"
        type="button"
      >
        <span>{title}</span>
        <span className="product-section__icon">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="product-section__content">{children}</div>}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data.product);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || addingToCart) return;

    try {
      setAddingToCart(true);
      await addToCart({
        productId: product._id,
        size: selectedSize,
        quantity,
      });
      navigate("/cart");
    } catch (error) {
      console.error("Unable to add product to cart", error);
      setAddingToCart(false);
    }
  };

  if (!product)
    return (
      <div className="product-loading">
        Loading...
      </div>
    );

  return (
    <main className="product-page">
      <div className="product-detail">
      {/* ── LEFT: Gallery ── */}
      <div className="product-gallery">
        {/* Thumbnail strip */}
        <div className="product-thumbs">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`product-thumb${selectedImage === i ? " is-active" : ""}`}
              type="button"
              aria-label={`Show product image ${i + 1}`}
            >
              <img
                src={img}
                alt={`view ${i + 1}`}
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="product-main-image">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
          />
        </div>
      </div>

      {/* ── RIGHT: Info ── */}
      <div className="product-info">
        {/* Title */}
        <h1 className="product-title">
          {product.name}
        </h1>

        {/* Price */}
        <p className="product-price">
          ₹{product.price.toLocaleString("en-IN")}.00
        </p>

        {/* Size label */}
        <p className="product-label">
          Select Size
        </p>

        {/* Size buttons */}
        <div className="product-size-options">
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`product-size${selectedSize === s ? " is-active" : ""}`}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="product-quantity">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            type="button"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            type="button"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Action buttons */}
        <div className="product-actions">
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="product-action"
            type="button"
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>
          <button
            onClick={() => navigate(`/checkout/${product._id}`)}
            className="product-action product-action--solid"
            type="button"
          >
            Buy It Now
          </button>
        </div>

        {/* Features */}
        <Section title="Features">
          <ul className="product-list">
            {[
              "Button-down shirt with original applique patchwork design",
              "Collared neckline",
              "Front button closure",
              "Relaxed fit",
              "Raglan sleeves with cuffs",
              "Straight hem",
            ].map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Section>

        {/* Wash care */}
        <Section title="Composition and wash care">
          <ul className="product-list">
            <li>100% linen</li>
            <li>Machine wash cold on gentle cycle</li>
            <li>Use mild detergent</li>
            <li>Do not bleach</li>
            <li>Do not tumble dry</li>
          </ul>
        </Section>

        {/* Size chart */}
        <Section title="Size chart">
          <div className="product-table-wrap">
          <table className="product-size-chart">
            <thead>
              <tr>
                {["Size", "Chest", "Length", "Sleeve"].map((h) => (
                  <th key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size}>
                  <td>
                    {row.size}
                  </td>
                  <td>
                    {row.chest}
                  </td>
                  <td>
                    {row.length}
                  </td>
                  <td>
                    {row.sleeve}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Section>

        {/* Notes */}
        <div className="product-notes">
          <p>
            Ready sizes ship immediately. Unavailable sizes will be made to
            order in 10–15 days.
          </p>
          <p>
            M2M orders: Our team will contact you for measurements. Delivery:
            10–15 days.
          </p>
        </div>
      </div>
      </div>
    </main>
  );
};

export default ProductDetail;
