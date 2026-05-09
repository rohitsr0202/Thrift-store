import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { addToCart } from "../api/cartApi";
import "./ProductDetail.css";

const productDetailsByCategory = {
  clothes: {
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Button-down shirt with original applique patchwork design",
      "Collared neckline",
      "Front button closure",
      "Relaxed fit",
      "Raglan sleeves with cuffs",
      "Straight hem",
    ],
    care: [
      "100% linen",
      "Machine wash cold on gentle cycle",
      "Use mild detergent",
      "Do not bleach",
      "Do not tumble dry",
    ],
    sizeChart: {
      headers: ["Size", "Chest", "Length", "Sleeve"],
      rows: [
        { size: "S", chest: 44, length: 26.5, sleeve: 31.5 },
        { size: "M", chest: 46, length: 27, sleeve: 32 },
        { size: "L", chest: 48, length: 27.5, sleeve: 32.5 },
        { size: "XL", chest: 50, length: 28, sleeve: 32.5 },
      ],
    },
    notes: [
      "Ready sizes ship immediately. Unavailable sizes will be made to order in 10-15 days.",
      "M2M orders: Our team will contact you for measurements. Delivery: 10-15 days.",
    ],
  },
  shoes: {
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    features: [
      "Curated pre-loved sneaker pair",
      "Low-top profile",
      "Cushioned footbed",
      "Durable rubber outsole",
      "Cleaned and inspected before dispatch",
    ],
    care: [
      "Wipe gently with a soft dry cloth",
      "Use sneaker cleaner only when needed",
      "Air dry away from direct sunlight",
      "Do not machine wash",
      "Store with shoe trees or paper stuffing",
    ],
    sizeChart: {
      headers: ["UK", "EU", "US", "CM"],
      rows: [
        { uk: "6", eu: "40", us: "7", cm: "25" },
        { uk: "7", eu: "41", us: "8", cm: "26" },
        { uk: "8", eu: "42", us: "9", cm: "27" },
        { uk: "9", eu: "43", us: "10", cm: "28" },
        { uk: "10", eu: "44", us: "11", cm: "29" },
      ],
    },
    notes: [
      "Pre-loved footwear may show minor signs of previous use.",
      "Pairs are dispatched after a final quality check.",
    ],
  },
  cap: {
    sizes: ["OS"],
    features: [
      "Structured six-panel cap",
      "Curved brim",
      "Adjustable back strap",
      "Contrast panel detailing",
      "Everyday streetwear fit",
    ],
    care: [
      "Spot clean only",
      "Use a damp cloth with mild soap",
      "Do not bleach",
      "Do not tumble dry",
      "Air dry in shade",
    ],
    sizeChart: {
      headers: ["Size", "Head Circumference", "Fit"],
      rows: [
        { size: "OS", headCircumference: "54-60 cm", fit: "Adjustable" },
      ],
    },
    notes: [
      "One size fits most with an adjustable strap.",
      "Caps ship ready from available stock.",
    ],
  },
};

const getProductDetails = (category) =>
  productDetailsByCategory[category] || productDetailsByCategory.clothes;

const formatHeaderKey = (header) =>
  header
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, character) => character.toUpperCase());

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

  const detailData = product ? getProductDetails(product.category) : null;
  const activeSize =
    detailData && detailData.sizes.includes(selectedSize)
      ? selectedSize
      : detailData?.sizes[0];

  const handleAddToCart = async () => {
    if (!product || addingToCart) return;

    try {
      setAddingToCart(true);
      await addToCart({
        productId: product._id,
        size: activeSize,
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
          {detailData.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`product-size${activeSize === s ? " is-active" : ""}`}
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
            {detailData.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Section>

        {/* Wash care */}
        <Section title="Composition and wash care">
          <ul className="product-list">
            {detailData.care.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* Size chart */}
        <Section title="Size chart">
          <div className="product-table-wrap">
          <table className="product-size-chart">
            <thead>
              <tr>
                {detailData.sizeChart.headers.map((h) => (
                  <th key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailData.sizeChart.rows.map((row) => (
                <tr key={row.size || row.uk}>
                  {detailData.sizeChart.headers.map((header) => (
                    <td key={header}>
                      {row[formatHeaderKey(header)]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Section>

        {/* Notes */}
        <div className="product-notes">
          {detailData.notes.map((note, i) => (
            <p key={i}>{note}</p>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
};

export default ProductDetail;
