import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const ITEM_WIDTH = 220;
const ITEM_GAP = 60;
const STEP = ITEM_WIDTH + ITEM_GAP;

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [clothes, setClothes] = useState([]);

  const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const containerRef = useRef(null);

  // ✅ FETCH PRODUCTS BY CATEGORY
  useEffect(() => {
    const fetchProducts = async () => {
      const shoesRes = await axios.get("/products?category=shoes");
      const clothesRes = await axios.get("/products?category=clothes");


      setShoes(shoesRes.data);
      setClothes(clothesRes.data);
    };

    fetchProducts();
  }, []);

  // ✅ GSAP ONLY FOR SHOES
  useEffect(() => {
    if (shoes.length === 0) return;

    const track = trackRef.current;
    const totalWidth = shoes.length * STEP;

    animRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: shoes.length * 5,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
      onUpdate: updateScales,
    });

    function updateScales() {
      if (!containerRef.current || !track) return;

      const containerCenter =
        containerRef.current.getBoundingClientRect().left +
        containerRef.current.offsetWidth / 2;

      const items = track.querySelectorAll(".scroll-item");

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;

        const distance = Math.abs(containerCenter - itemCenter);
        const maxDist = containerRef.current.offsetWidth / 2;

        const proximity = Math.max(0, 1 - distance / maxDist);

        const scale = 0.7 + proximity * 0.5;
        const translateY = -proximity * 30;

        gsap.set(item, {
          scale,
          y: translateY,
          opacity: 0.4 + proximity * 0.6,
        });
      });
    }

    return () => animRef.current?.kill();
  }, [shoes]);

  const handleMouseEnter = () => animRef.current?.pause();
  const handleMouseLeave = () => animRef.current?.resume();

  const tripled = [...shoes, ...shoes, ...shoes];

  return (
    <>
      {/* 🔥 SHOES SECTION */}
      <div style={{ background: "#fff", minHeight: "60vh", padding: "60px 0" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "60px",
            fontSize: "2rem",
            letterSpacing: "0.1em",
          }}
        >
          Shoes Collection
        </h1>

        <div
          ref={containerRef}
          style={{ overflow: "hidden", width: "100%", position: "relative" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: `${ITEM_GAP}px`,
              width: "max-content",
              padding: "60px 0",
            }}
          >
            {tripled.map((p, i) => (
              <div
                key={`${p._id}-${i}`}
                className="scroll-item"
                onClick={() => navigate(`/product/${p._id}`)}
                style={{
                  width: `${ITEM_WIDTH}px`,
                  flexShrink: 0,
                  cursor: "pointer",
                  transformOrigin: "center bottom",
                  willChange: "transform",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                    display: "block",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

{/* 🔥 CLOTHES SECTION */}
<div style={{ background: "#fff", minHeight: "100vh"}}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "0px",
    }}
  >
    {clothes.map((p) => (
      <img
        key={p._id}
        src={p.image}
        alt={p.name}
        onClick={() => navigate(`/product/${p._id}`)}
        style={{
          width: "100%",
          height: "500px",
          objectFit: "contain",
          display: "block",
          cursor: "pointer",
          userSelect: "none",
        }}
        draggable={false}
      />
    ))}
  </div>
</div>
    </>
  );
};

export default Home;