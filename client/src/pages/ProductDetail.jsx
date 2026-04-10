import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const sizeChart = [
  { size: "S", chest: 44, length: 26.5, sleeve: 31.5 },
  { size: "M", chest: 46, length: 27, sleeve: 32 },
  { size: "L", chest: 48, length: 27.5, sleeve: 32.5 },
  { size: "XL", chest: 50, length: 28, sleeve: 32.5 },
];

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderTop: "1px solid #e5e5e5", padding: "16px 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "#111",
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div style={{ marginTop: 12 }}>{children}</div>}
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

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data.product);
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: 16,
          color: "#888",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#fff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* ── LEFT: Gallery ── */}
      <div
        style={{
          width: "58%",
          display: "flex",
          gap: 12,
          padding: 40,
          position: "sticky",
          top: 0,
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Thumbnail strip */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: 72,
            flexShrink: 0,
          }}
        >
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              style={{
                width: 72,
                height: 88,
                borderRadius: 4,
                overflow: "hidden",
                border: selectedImage === i
                  ? "1.5px solid #000"
                  : "1px solid #e0e0e0",
                opacity: selectedImage === i ? 1 : 0.5,
                cursor: "pointer",
                padding: 0,
                background: "none",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              <img
                src={img}
                alt={`view ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          style={{
            flex: 1,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ── RIGHT: Info ── */}
      <div
        style={{
          width: "42%",
          padding: "40px 40px 40px 40px",
          overflowY: "auto",
          height: "100vh",
          boxSizing: "border-box",
          borderLeft: "1px solid #f0f0f0",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 1.3,
            marginBottom: 16,
            color: "#111",
          }}
        >
          {product.name}
        </h1>

        {/* Price */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 32,
            color: "#111",
          }}
        >
          ₹{product.price.toLocaleString("en-IN")}.00
        </p>

        {/* Size label */}
        <p
          style={{
            fontSize: 13,
            color: "#888",
            marginBottom: 12,
          }}
        >
          Select Size
        </p>

        {/* Size buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: selectedSize === s
                  ? "1.5px solid #111"
                  : "1px solid #ccc",
                background: "transparent",
                fontSize: 13,
                fontWeight: selectedSize === s ? 600 : 400,
                cursor: "pointer",
                color: "#111",
                transition: "all 0.15s",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: 4,
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              width: 48,
              height: 48,
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#555",
            }}
          >
            −
          </button>
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              width: 48,
              height: 48,
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#555",
            }}
          >
            +
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          <button
            style={{
              flex: 1,
              height: 52,
              border: "1.5px solid #111",
              background: "transparent",
              borderRadius: 30,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: "#111",
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate(`/checkout/${product._id}`)}
            style={{
              flex: 1,
              height: 52,
              border: "none",
              background: "#111",
              color: "#fff",
              borderRadius: 30,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Buy It Now
          </button>
        </div>

        {/* Features */}
        <Section title="Features">
          <ul
            style={{
              paddingLeft: 18,
              margin: 0,
              fontSize: 13,
              color: "#555",
              lineHeight: 2,
            }}
          >
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
          <ul
            style={{
              paddingLeft: 18,
              margin: 0,
              fontSize: 13,
              color: "#555",
              lineHeight: 2,
            }}
          >
            <li>100% linen</li>
            <li>Machine wash cold on gentle cycle</li>
            <li>Use mild detergent</li>
            <li>Do not bleach</li>
            <li>Do not tumble dry</li>
          </ul>
        </Section>

        {/* Size chart */}
        <Section title="Size chart">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                {["Size", "Chest", "Length", "Sleeve"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#888",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr
                  key={row.size}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <td style={{ padding: "8px 12px", color: "#111" }}>
                    {row.size}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#555" }}>
                    {row.chest}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#555" }}>
                    {row.length}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#555" }}>
                    {row.sleeve}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Notes */}
        <div
          style={{
            marginTop: 16,
            fontSize: 12,
            color: "#888",
            lineHeight: 1.8,
            paddingBottom: 40,
          }}
        >
          <p>
            Ready sizes ship immediately. Unavailable sizes will be made to
            order in 10–15 days.
          </p>
          <p style={{ marginTop: 6 }}>
            M2M orders: Our team will contact you for measurements. Delivery:
            10–15 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;