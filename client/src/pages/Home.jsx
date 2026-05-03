import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ShoppingBag, UserRound } from "lucide-react";
import brandLogo from "../assets/looselyFitIcon.png";
import ScrollSection from "./ScrollSection"; // ← adjust path as needed
import "./Home.css";

const ITEM_WIDTH = 250;
const ITEM_GAP = 78;
const STEP = ITEM_WIDTH + ITEM_GAP;

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [middle, setMiddle] = useState([]);

  const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const containerRef = useRef(null);

  // ✅ FETCH PRODUCTS BY CATEGORY
  useEffect(() => {
    const fetchProducts = async () => {
      const [shoesRes, clothesRes, middleRes] = await Promise.all([
        axios.get("/products?category=shoes"),
        axios.get("/products?category=clothes"),
        axios.get("/products?category=middle"),
      ]);
      setShoes(shoesRes.data);
      setClothes(clothesRes.data);
      setMiddle(middleRes.data);
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
        gsap.set(item, {
          scale: 0.7 + proximity * 0.5,
          y: -proximity * 30,
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
      <nav className="home-navbar" aria-label="Primary navigation">
        <button
          className="home-navbar__brand"
          type="button"
          aria-label="Go to home"
          onClick={() => navigate("/home")}
        >
          <img src={brandLogo} alt="Loosely Fit" />
        </button>

        <div className="home-navbar__actions">
          <button
            className="home-navbar__icon-button"
            type="button"
            aria-label="Open cart"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag size={22} strokeWidth={1.8} />
          </button>

          <button className="home-navbar__profile-button" type="button" aria-label="Open profile">
            <UserRound size={20} strokeWidth={1.8} />
            <span>Profile</span>
          </button>
        </div>
      </nav>

      {/* 🔥 SHOES SECTION */}
      <section className="shoes-collection">
        <div className="shoes-collection__header">
          <span className="shoes-collection__eyebrow">Pre-loved edits</span>
          <h1 className="shoes-collection__title">Pre-Loved Soles</h1>
        </div>

        <div
          ref={containerRef}
          className="shoes-collection__viewport"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className="shoes-collection__track"
          >
            {tripled.map((p, i) => (
              <div
                key={`${p._id}-${i}`}
                className="scroll-item"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={p.images[0]} // ✅ fixed
                  alt={p.name}
                  className="shoes-collection__image"
                  draggable={false}
                />
                <div className="shoes-collection__meta">
                  <span>{p.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎬 SCROLL ANIMATION SECTION */}
      <ScrollSection middle={middle} />

      {/* 🔥 CLOTHES SECTION */}
      <div style={{ background: "#fff", minHeight: "100vh" }}>
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
              src={p.images[0]}  // ✅ fixed
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
