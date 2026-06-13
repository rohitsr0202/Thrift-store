import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Mail, Phone, RotateCcw, ShoppingBag, Truck, UserRound } from "lucide-react";
import brandLogo from "../assets/looselyFitIcon.png";
import campaignHero from "../assets/Images/bluoranggroupimg1.webp";
import campaignCap from "../assets/Images/bluorangcapimg1.webp";
import campaignCar from "../assets/Images/bluorangcarimg1.webp";
import ScrollSection from "./ScrollSection"; // ← adjust path as needed
import "./Home.css";

const InstagramMark = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className="site-footer__brand-icon"
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="4.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.7" cy="7.4" r="1.1" fill="currentColor" />
  </svg>
);

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [middle, setMiddle] = useState([]);
  const [cap, setCap] = useState([]);

  const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const containerRef = useRef(null);
  const shoesTitleRef = useRef(null);
  const campaignRef = useRef(null);

  // ✅ FETCH PRODUCTS BY CATEGORY
  useEffect(() => {
    const fetchProducts = async () => {
      const [shoesRes, clothesRes, middleRes, capRes] = await Promise.all([
        axios.get("/products?category=shoes"),
        axios.get("/products?category=clothes"),
        axios.get("/products?category=middle"),
        axios.get("/products?category=cap"),
      ]);
      setShoes(shoesRes.data);
      setClothes(clothesRes.data);
      setMiddle(middleRes.data);
      setCap(capRes.data);
    };
    fetchProducts();
  }, []);

  // ✅ GSAP ONLY FOR SHOES
  useEffect(() => {
    if (shoes.length === 0) return;

    const track = trackRef.current;
    if (!track) return;

    const buildAnimation = () => {
      animRef.current?.kill();
      gsap.set(track, { x: 0 });

      const totalWidth = track.scrollWidth / 3;
      if (!totalWidth) return;

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
    };

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

    buildAnimation();
    window.addEventListener("resize", buildAnimation);

    return () => {
      window.removeEventListener("resize", buildAnimation);
      animRef.current?.kill();
    };
  }, [shoes]);

  const handleMouseEnter = () => animRef.current?.pause();
  const handleMouseLeave = () => animRef.current?.resume();

  const tripled = [...shoes, ...shoes, ...shoes];

  useEffect(() => {
    if (!shoesTitleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".shoes-collection__reveal",
        {
          yPercent: 80,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    }, shoesTitleRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = campaignRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(section.querySelectorAll(".home-campaign-intro__reveal"), {
        clearProps: "all",
        opacity: 1,
        filter: "blur(0px)",
      });
      return undefined;
    }

    const heroImage = section.querySelector(".home-campaign-intro__image");
    const foreground = section.querySelector(".home-campaign-intro__foreground");
    const title = section.querySelector(".home-campaign-intro__title");
    const kicker = section.querySelector(".home-campaign-intro__kicker");
    const frames = section.querySelectorAll(".home-campaign-intro__frame");

    const ctx = gsap.context(() => {
      gsap.set(".home-campaign-intro__media", {
        clipPath: "inset(10% 10% 10% 10%)",
        opacity: 0,
        filter: "blur(16px)",
      });
      gsap.set(".home-campaign-intro__image", { scale: 1.16, opacity: 0 });
      gsap.set(".home-campaign-intro__title span", { yPercent: 110, opacity: 0 });
      gsap.set(".home-campaign-intro__reveal", { y: 26, opacity: 0, filter: "blur(10px)" });
      gsap.set(".home-campaign-intro__frame", { y: 36, opacity: 0, rotate: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(".home-campaign-intro__media", {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.45,
        })
        .to(".home-campaign-intro__image", { scale: 1.02, opacity: 1, duration: 1.7 }, "-=1.18")
        .to(".home-campaign-intro__title span", { yPercent: 0, opacity: 1, duration: 1.08, stagger: 0.11 }, "-=0.78")
        .to(".home-campaign-intro__reveal", { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.82, stagger: 0.08 }, "-=0.78")
        .to(
          ".home-campaign-intro__frame",
          { y: 0, opacity: 1, rotate: (i) => (i === 0 ? -5 : 6), duration: 0.95, stagger: 0.12 },
          "-=0.72"
        );

      gsap.to(heroImage, {
        scale: 1.09,
        duration: 26,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(frames, {
        y: (i) => (i === 0 ? -14 : 16),
        duration: 5.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });
    }, section);

    const heroX = gsap.quickTo(heroImage, "x", { duration: 0.9, ease: "power3.out" });
    const heroY = gsap.quickTo(heroImage, "y", { duration: 0.9, ease: "power3.out" });
    const foregroundX = gsap.quickTo(foreground, "x", { duration: 0.7, ease: "power3.out" });
    const foregroundY = gsap.quickTo(foreground, "y", { duration: 0.7, ease: "power3.out" });
    const titleX = gsap.quickTo(title, "x", { duration: 0.85, ease: "power3.out" });
    const titleY = gsap.quickTo(title, "y", { duration: 0.85, ease: "power3.out" });
    const kickerX = gsap.quickTo(kicker, "x", { duration: 0.6, ease: "power3.out" });

    const handleMove = (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroX(x * 14);
      heroY(y * 10);
      foregroundX(x * -18);
      foregroundY(y * -14);
      titleX(x * 8);
      titleY(y * 6);
      kickerX(x * 12);
    };

    const handleLeave = () => {
      heroX(0);
      heroY(0);
      foregroundX(0);
      foregroundY(0);
      titleX(0);
      titleY(0);
      kickerX(0);
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      ctx.revert();
    };
  }, []);

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

      <section className="campaign-intro home-campaign-intro" ref={campaignRef} aria-label="Bluorang campaign">
        <div className="home-campaign-intro__media" aria-hidden="true">
          <img className="home-campaign-intro__image" src={campaignHero} alt="" draggable={false} />
        </div>

        <div className="home-campaign-intro__foreground" aria-hidden="true">
          <figure className="home-campaign-intro__frame home-campaign-intro__frame--cap">
            <img src={campaignCap} alt="" draggable={false} />
          </figure>
          <figure className="home-campaign-intro__frame home-campaign-intro__frame--car">
            <img src={campaignCar} alt="" draggable={false} />
          </figure>
        </div>

        <div className="home-campaign-intro__content">
          {/* <p className="home-campaign-intro__kicker home-campaign-intro__reveal">Loosely Fit presents</p> */}
          <h1 className="home-campaign-intro__title" aria-label="Bluorang campaign">
            <span>Loosely</span>
            <span>Fit</span>
          </h1>
          <p className="home-campaign-intro__copy home-campaign-intro__reveal">
            Winter pieces, rare rotations, and editorial objects staged for the first entrance.
          </p>
          <button
            className="home-campaign-intro__button home-campaign-intro__reveal"
            type="button"
            onClick={() => document.querySelector(".shoes-collection")?.scrollIntoView({ behavior: "smooth" })}
          >
            Enter the edit
          </button>
        </div>
      </section>

      {/* 🔥 SHOES SECTION */}
      <section className="shoes-collection">
        <div className="shoes-collection__header" ref={shoesTitleRef}>
          <div className="shoes-collection__meta-bar shoes-collection__reveal">
            <span>LF Footwear Archive</span>
            <span>Drop 01</span>
            <span>Pre-loved rotation</span>
          </div>
          <h1 className="shoes-collection__title" aria-label="Soles in rotation">
            <span className="shoes-collection__title-word shoes-collection__title-word--serif shoes-collection__reveal">
              Soles
            </span>
            <span className="shoes-collection__title-word shoes-collection__title-word--subtle shoes-collection__reveal">
              in
            </span>
            <span className="shoes-collection__title-word shoes-collection__reveal">rotation</span>
          </h1>
          <p className="shoes-collection__caption shoes-collection__reveal">
            Rare pairs, second lives, new walks.
          </p>
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
      <ScrollSection middle={middle} cap={cap} />

      {/* 🔥 CLOTHES SECTION */}
      <section className="clothes-collection" aria-label="Clothes collection">
        <div className="clothes-collection__grid">
          {clothes.map((p) => (
            <button
              key={p._id}
              className="clothes-collection__item"
              type="button"
              aria-label={`Open ${p.name}`}
              onClick={() => navigate(`/product/${p._id}`)}
            >
              <img
                src={p.images[0]}
                alt={p.name}
                draggable={false}
              />
            </button>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__service-row" aria-label="Store policies and support">
          <section className="site-footer__service-card">
            <RotateCcw className="site-footer__service-icon" size={44} strokeWidth={1.4} />
            <h2>Returns</h2>
            <p>
              Please read our <a href="/returns-and-refunds">Return &amp; Exchange Policy</a> before
              purchasing.
            </p>
          </section>

          <section className="site-footer__service-card">
            <Phone className="site-footer__service-icon" size={44} strokeWidth={1.4} />
            <h2>Customer Support</h2>
            <p>
              Support hours: <strong>12 PM - 6 PM</strong>
              <strong>Monday to Saturday</strong>
              <strong>+91 8928567504</strong>
            </p>
          </section>

          <section className="site-footer__service-card">
            <Truck className="site-footer__service-icon" size={48} strokeWidth={1.4} />
            <h2>Shipping</h2>
            <p>
              Please review our <a href="/policies/shipping">Shipping Policy</a>.
            </p>
          </section>
        </div>

        <div className="site-footer__bottom">
          <nav className="site-footer__links" aria-label="Quick links">
            <h3>Quick links</h3>
            <a href="/contact-us">Contact Us</a>
            <a href="/returns-and-refunds">Returns and Refunds</a>
            <a href="/policies">Policies</a>
          </nav>

          <div className="site-footer__social">
            <h3>Follow us</h3>
            <a href="https://www.instagram.com/rohitsr_" target="_blank" rel="noreferrer">
              <InstagramMark />
              <span>Instagram</span>
            </a>
            <a href="mailto:rohitsinghsr023@gamil.com">
              <Mail size={17} strokeWidth={2} />
              <span>Email</span>
            </a>
            <a href="tel:+918928567504">
              <Phone size={17} strokeWidth={2} />
              <span>Phone</span>
            </a>
          </div>

          <div className="site-footer__brand" aria-label="Loosely Fit">
            <img src={brandLogo} alt="Loosely Fit" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
