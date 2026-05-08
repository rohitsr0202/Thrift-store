import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import Flip from "gsap/Flip.js";
import Lenis from "lenis";
// Inline styles replace the external CSS
const styles = `
  @import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");

  .scroll-section-root {
    --light: #EBEBED;
    --dark: #101010;
    font-family: "PP Neue Montreal", sans-serif;
  }

  .scroll-section-root h1 {
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.075rem;
    line-height: 1.125;
  }

  .scroll-section-root h3 {
    font-size: 2.25rem;
    font-weight: 500;
    letter-spacing: -0.025rem;
    line-height: 1.125;
  }

  .scroll-section-root img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ss-slide-image-button {
    position: relative;
    display: block;
    width: 75%;
    height: 75%;
    padding: 0;
    border: 0;
    border-radius: 14px;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
  }

  .ss-slide-image-button::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.08) 0%,
      rgba(0, 0, 0, 0.34) 48%,
      rgba(0, 0, 0, 0.18) 100%
    );
    content: "";
    pointer-events: none;
  }

  .ss-slide-image-button img {
    display: block;
    transition: transform 420ms ease, filter 420ms ease;
  }

  .ss-slide-image-button:hover img {
    transform: scale(1.025);
    filter: contrast(1.04);
  }

  .ss-slide-label {
    position: absolute;
    bottom: 20%;
    left: 50%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 900;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .ss-slide-label__title {
    font-size: clamp(1.45rem, 3vw, 2.75rem);
    letter-spacing: 0.01em;
  }

  .ss-slide-label__action {
    font-size: clamp(0.78rem, 1vw, 1rem);
    letter-spacing: 0;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
    transition: text-decoration-color 180ms ease;
  }

  .ss-slide-image-button:hover .ss-slide-label__action {
    text-decoration-color: currentColor;
  }

  .ss-container {
    position: relative;
    width: 100%;
    background-color: var(--light);
    will-change: background-color;
  }

  .ss-hero,
  .ss-outro {
    position: relative;
    width: 100%;
    height: 100svh;
    padding: 2rem;
    align-content: center;
    text-align: center;
  }

  .ss-hero {
    min-height: 520px;
  }

  .ss-hero img {
    object-position: center;
  }

  .ss-hero h1,
  .ss-outro h1 {
    width: 75%;
    margin: 0 auto;
  }

  .ss-outro {
    background-color: var(--dark);
    color: var(--light);
    overflow: hidden;
    isolation: isolate;
  }

  .ss-outro::before {
    position: absolute;
    inset: 0;
    z-index: -3;
    background:
      linear-gradient(rgba(235, 235, 237, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(235, 235, 237, 0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(circle at center, #000 0 44%, transparent 78%);
    content: "";
  }

  .ss-outro::after {
    position: absolute;
    inset: 18% 10%;
    z-index: -2;
    border: 1px solid rgba(235, 235, 237, 0.14);
    content: "";
    transform: skewY(-4deg);
  }

  .ss-outro__marquee {
    position: absolute;
    left: 50%;
    z-index: -2;
    width: 120vw;
    overflow: hidden;
    color: rgba(235, 235, 237, 0.08);
    font-family: "PP Neue Montreal", Arial, sans-serif;
    font-size: clamp(4.2rem, 11vw, 13rem);
    font-weight: 800;
    letter-spacing: -0.075em;
    line-height: 0.82;
    text-transform: uppercase;
    white-space: nowrap;
    pointer-events: none;
  }

  .ss-outro__marquee--top {
    top: 9%;
    transform: translateX(-50%) rotate(-5deg);
  }

  .ss-outro__marquee--bottom {
    bottom: 6%;
    transform: translateX(-50%) rotate(4deg);
  }

  .ss-outro__marquee-track {
    display: inline-flex;
    gap: 0.18em;
    will-change: transform;
  }

  .ss-outro__media {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .ss-outro__frame {
    position: absolute;
    width: clamp(110px, 13vw, 220px);
    aspect-ratio: 3 / 4;
    border: 1px solid rgba(235, 235, 237, 0.18);
    border-radius: 10px;
    opacity: 0.46;
    overflow: hidden;
    transform: rotate(var(--tilt));
    will-change: transform, opacity;
  }

  .ss-outro__frame::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(16, 16, 16, 0.16), rgba(16, 16, 16, 0.52));
    content: "";
  }

  .ss-outro__frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.16);
    transform: scale(1.08);
  }

  .ss-outro__frame:nth-child(1) {
    top: 17%;
    left: 7%;
    --tilt: -10deg;
  }

  .ss-outro__frame:nth-child(2) {
    right: 8%;
    top: 15%;
    --tilt: 8deg;
  }

  .ss-outro__frame:nth-child(3) {
    left: 15%;
    bottom: 12%;
    --tilt: 7deg;
  }

  .ss-outro__frame:nth-child(4) {
    right: 18%;
    bottom: 10%;
    --tilt: -8deg;
  }

  .ss-outro__center {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-height: min(640px, 78svh);
  }

  .ss-outro__kicker {
    position: absolute;
    top: calc(50% - clamp(8rem, 13vw, 13rem));
    left: 50%;
    color: rgba(235, 235, 237, 0.48);
    font-size: clamp(0.68rem, 1vw, 0.92rem);
    font-weight: 800;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .ss-outro__line {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    gap: 0 0.28em;
    width: min(1120px, 92vw);
    margin: 0 auto;
    color: rgba(235, 235, 237, 0.94);
    font-family: "PP Neue Montreal", Arial, sans-serif;
    font-size: clamp(2.4rem, 6vw, 6.8rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 0.92;
    text-align: center;
  }

  .ss-outro .ss-outro__line {
    width: min(1120px, 92vw);
  }

  .ss-outro__brand {
    font-family: "Bodoni 72", Didot, "Playfair Display", Georgia, serif;
    font-style: italic;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  .ss-outro__dash {
    color: rgba(235, 235, 237, 0.36);
    font-weight: 300;
  }

  .ss-outro__word {
    display: inline-block;
    will-change: transform, opacity, filter;
  }

  .ss-outro__subtle {
    color: rgba(235, 235, 237, 0.72);
  }

  .ss-outro__spark {
    position: absolute;
    left: 50%;
    bottom: calc(50% - clamp(8.8rem, 14vw, 14rem));
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(235, 235, 237, 0.54);
    font-size: clamp(0.68rem, 0.9vw, 0.8rem);
    font-weight: 800;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .ss-outro__spark::before,
  .ss-outro__spark::after {
    width: clamp(34px, 6vw, 96px);
    height: 1px;
    background: rgba(235, 235, 237, 0.26);
    content: "";
  }

  .ss-marquee {
    position: relative;
    width: 100%;
    height: 50svh;
    overflow: hidden;
  }

  .ss-marquee-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-5deg);
    width: 150%;
    height: 100%;
  }

  .ss-marquee-images {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-75%, -50%);
    width: 200%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    will-change: transform;
  }

  .ss-marquee-img {
    flex: 1;
    width: 100%;
    aspect-ratio: 5/3;
  }

  .ss-horizontal-scroll {
    position: relative;
    width: 100%;
    height: 100svh;
    overflow: hidden;
  }

  .ss-horizontal-scroll-wrapper {
    position: relative;
    width: 300%;
    height: 100svh;
    display: flex;
    will-change: transform;
  }

  .ss-horizontal-slide {
    flex: 1;
    height: 100%;
    display: flex;
    gap: 2rem;
    padding: 2rem;
  }

  .ss-horizontal-slide:not(.ss-horizontal-spacer) {
    background-color: var(--dark);
    color: var(--light);
  }

  .ss-horizontal-slide .ss-col:nth-child(1) { flex: 3; }
  .ss-horizontal-slide .ss-col:nth-child(2) { flex: 2; }

  .ss-horizontal-scroll .ss-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ss-horizontal-slide .ss-col h3 {
    width: 75%;
  }

  @media (max-width: 1000px) {
    .scroll-section-root h1 {
      font-size: 2.25rem;
      letter-spacing: -0.05rem;
    }
    .scroll-section-root h3 { font-size: 1.5rem; }
    .ss-hero h1, .ss-outro h1 { width: 100%; }
    .ss-marquee-wrapper { width: 300%; }
    .ss-horizontal-slide {
      padding: 4rem;
      flex-direction: column-reverse;
      gap: 2rem;
    }
    .ss-horizontal-slide .ss-col:nth-child(1) { align-items: flex-start; }
    .ss-horizontal-slide .ss-col h3 { width: 100%; }
    .ss-slide-image-button { width: 100%; height: 100%; }
  }

  @media (max-width: 720px) {
    .scroll-section-root h1 {
      font-size: clamp(2rem, 11vw, 3.1rem);
      line-height: 1.05;
    }

    .scroll-section-root h3 {
      font-size: clamp(1.15rem, 5.8vw, 1.65rem);
      line-height: 1.18;
    }

    .ss-hero {
      height: 72svh;
      min-height: 460px;
    }

    .ss-hero img {
      object-position: center top;
    }

    .ss-outro {
      min-height: 72svh;
      height: auto;
      padding: 32px 18px;
    }

    .ss-outro::after {
      inset: 18% 6%;
    }

    .ss-outro__marquee {
      font-size: clamp(4.4rem, 22vw, 9rem);
    }

    .ss-outro__frame {
      width: clamp(82px, 25vw, 140px);
      opacity: 0.32;
    }

    .ss-outro__frame:nth-child(1) {
      top: 14%;
      left: -6%;
    }

    .ss-outro__frame:nth-child(2) {
      right: -7%;
      top: 16%;
    }

    .ss-outro__frame:nth-child(3) {
      left: 3%;
      bottom: 8%;
    }

    .ss-outro__frame:nth-child(4) {
      right: 4%;
      bottom: 7%;
    }

    .ss-outro__center {
      min-height: 66svh;
    }

    .ss-outro__kicker {
      top: calc(50% - 9rem);
      letter-spacing: 0.28em;
    }

    .ss-outro__line {
      font-size: clamp(2.15rem, 13vw, 4.4rem);
      letter-spacing: -0.045em;
      line-height: 0.96;
    }

    .ss-outro__spark {
      bottom: calc(50% - 9rem);
      letter-spacing: 0.16em;
    }

    .ss-marquee {
      height: 38svh;
      min-height: 250px;
    }

    .ss-marquee-wrapper {
      width: 430%;
    }

    .ss-marquee-images {
      gap: 0.65rem;
    }

    .ss-horizontal-scroll,
    .ss-horizontal-scroll-wrapper {
      height: 100svh;
      min-height: 620px;
    }

    .ss-horizontal-slide {
      padding: 24px 18px 32px;
      gap: 18px;
    }

    .ss-horizontal-slide .ss-col:nth-child(1),
    .ss-horizontal-slide .ss-col:nth-child(2) {
      flex: 1;
      width: 100%;
    }

    .ss-horizontal-slide .ss-col:nth-child(1) {
      align-items: flex-start;
      justify-content: flex-end;
      min-height: 180px;
    }

    .ss-horizontal-slide .ss-col:nth-child(2) {
      align-items: flex-end;
      min-height: 320px;
    }

    .ss-slide-image-button {
      max-height: 58svh;
      aspect-ratio: 4 / 5;
      height: auto;
    }

    .ss-slide-label {
      gap: 8px;
    }

    .ss-slide-label__title {
      font-size: clamp(1.55rem, 8vw, 2.6rem);
    }

    .ss-slide-label__action {
      font-size: clamp(0.78rem, 3.5vw, 0.98rem);
    }
  }

  @media (max-width: 420px) {
    .ss-hero {
      min-height: 420px;
    }

    .ss-horizontal-scroll,
    .ss-horizontal-scroll-wrapper {
      min-height: 580px;
    }

    .ss-horizontal-slide .ss-col:nth-child(2) {
      min-height: 280px;
    }
  }
`;

// ── Props ──────────────────────────────────────────────────────────────────
// middle       : products from /products?category=middle
// cap          : products from /products?category=cap
// outroText    : text for the outro h1
// ──────────────────────────────────────────────────────────────────────────
const ScrollSection = ({
  middle = [],
  cap = [],
  outroText = "Loosely Fit - made for the ones who never fit in.",
}) => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const marqueeCount = 8;
  const slidesToRender = cap.filter((product) => product.images?.[0]);
  const horizontalPanelCount = slidesToRender.length + 1;
  const horizontalWrapperWidth = `${horizontalPanelCount * 100}%`;
  const horizontalTranslateX =
    horizontalPanelCount > 1
      ? -(((horizontalPanelCount - 1) / horizontalPanelCount) * 100)
      : 0;
  const middleProductImages = middle
    .map((product) => product.images?.[0])
    .filter(Boolean);
  const marqueeImagesToRender = middleProductImages.length
    ? Array.from(
        { length: marqueeCount },
        (_, index) => middleProductImages[index % middleProductImages.length]
      )
    : [];
  const outroImagesToRender = [...cap, ...middle]
    .map((product) => product.images?.[0])
    .filter(Boolean)
    .slice(0, 4);


  useEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger, Flip);

    let lenis = null;
    const updateLenis = (time) => {
      lenis?.raf(time * 1000);
    };
    let removeActiveClone = () => {};

    const ctx = gsap.context(() => {
    const root = rootRef.current;

    const container = root.querySelector(".ss-container");
    const marqueeImages = root.querySelector(".ss-marquee-images");
    const pinImg = root.querySelector(".ss-marquee-img.pin img");
    const wrapper = root.querySelector(".ss-horizontal-scroll-wrapper");
    const hScroll = root.querySelector(".ss-horizontal-scroll");
    const marqueeSection = root.querySelector(".ss-marquee");
    const outroWords = gsap.utils.toArray(".ss-outro__word", root);
    const outroFrames = gsap.utils.toArray(".ss-outro__frame", root);
    const outroTopMarquee = root.querySelector(".ss-outro__marquee--top .ss-outro__marquee-track");
    const outroBottomMarquee = root.querySelector(
      ".ss-outro__marquee--bottom .ss-outro__marquee-track"
    );

    const lightColor = "#EBEBED";
    const darkColor = "#101010";

      // ✅ LENIS SETUP
      lenis = new Lenis();

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add(updateLenis);

      gsap.ticker.lagSmoothing(0);

    // ── ¸ scroll ─────────────────────────
    gsap.to(marqueeImages, {
      scrollTrigger: {
        trigger: marqueeSection,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const xPosition = -75 + self.progress * 25;
          gsap.set(marqueeImages, { x: `${xPosition}%` });
        },
      },
    });

    // ── Clone logic ───────────────────────────
    let clone = null;
    let cloneActive = false;

    const createClone = () => {
      if (cloneActive || !pinImg) return;

      const rect = pinImg.getBoundingClientRect();

      clone = pinImg.cloneNode(true);

      gsap.set(clone, {
        position: "fixed",
        left: rect.left + "px",
        top: rect.top + "px",
        width: rect.width + "px",
        height: rect.height + "px",
        transform: "rotate(-5deg)",
        transformOrigin: "center center",
        pointerEvents: "none",
        zIndex: 100,
      });

      document.body.appendChild(clone);
      gsap.set(pinImg, { opacity: 0 });

      cloneActive = true;
    };

      const removeClone = () => {
      if (!cloneActive) return;

      clone?.remove();
      clone = null;

      if (pinImg) gsap.set(pinImg, { opacity: 1 });

      cloneActive = false;
    };
      removeActiveClone = removeClone;

    // ── Pin section ───────────────────────────
    ScrollTrigger.create({
      trigger: hScroll,
      start: "top top",
      end: () => `+=${hScroll.offsetWidth}`, // ✅ FIXED
      pin: true,
    });

    ScrollTrigger.create({
      trigger: marqueeSection,
      start: "top top",
      onEnter: createClone,
      onEnterBack: createClone,
      onLeaveBack: removeClone,
    });

    let flipAnimation = null;

    ScrollTrigger.create({
      trigger: hScroll,
      start: "top 50%",
      end: () => `+=${hScroll.offsetWidth}`,
      onEnter: () => {
        if (clone && cloneActive && !flipAnimation) {
          const state = Flip.getState(clone);

          gsap.set(clone, {
            position: "fixed",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100svh",
            transform: "rotate(0deg)",
          });

          flipAnimation = Flip.from(state, {
            duration: 1,
            ease: "none",
            paused: true,
          });
        }
      },
      onLeaveBack: () => {
        flipAnimation?.kill();
        flipAnimation = null;

        gsap.set(container, { backgroundColor: lightColor });
        gsap.set(wrapper, { x: "0%" });
      },
    });

    ScrollTrigger.create({
      trigger: hScroll,
      start: "top 50%",
      end: () => `+=${hScroll.offsetWidth}`,
      onUpdate: (self) => {
        const p = self.progress;

        // bg color
        if (p <= 0.05) {
          gsap.set(container, {
            backgroundColor: gsap.utils.interpolate(
              lightColor,
              darkColor,
              p / 0.05
            ),
          });
        } else {
          gsap.set(container, { backgroundColor: darkColor });
        }

        // flip
        if (p <= 0.2 && flipAnimation) {
          flipAnimation.progress(p / 0.2);
        }

        // horizontal scroll
        if (p > 0.2 && p <= 0.95) {
          flipAnimation?.progress(1);

          const hp = (p - 0.2) / 0.75;

          gsap.set(wrapper, {
            x: `${horizontalTranslateX * hp}%`,
          });

          if (clone) {
            const imgX = horizontalTranslateX * horizontalPanelCount * hp;
            gsap.set(clone, { x: `${imgX}%` });
          }
        }
      },
    });

    gsap.fromTo(
      outroWords,
      {
        yPercent: 80,
        opacity: 0,
        filter: "blur(12px)",
      },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: {
          trigger: ".ss-outro",
          start: "top 70%",
          once: true,
        },
      }
    );

    if (outroTopMarquee && outroBottomMarquee) {
      gsap.to(outroTopMarquee, {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".ss-outro",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        outroBottomMarquee,
        { xPercent: -18 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".ss-outro",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    if (outroFrames.length) {
      gsap.fromTo(
        outroFrames,
        {
          y: 80,
          opacity: 0,
          rotate: (index) => (index % 2 ? 14 : -14),
          scale: 0.86,
        },
        {
          y: 0,
          opacity: 0.46,
          rotate: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".ss-outro",
            start: "top 74%",
            once: true,
          },
        }
      );

      gsap.to(outroFrames, {
        y: (index) => (index % 2 ? -70 : 70),
        ease: "none",
        scrollTrigger: {
          trigger: ".ss-outro",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    }, rootRef);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis?.destroy();
      removeActiveClone();
      ctx.revert();
    };
  }, [horizontalPanelCount, horizontalTranslateX]);
  return (
    <div ref={rootRef} className="scroll-section-root">
      <style>{styles}</style>

      <div className="ss-container">
        {/* Hero */}
        <section className="ss-hero" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src="https://www.jaywalking.in/cdn/shop/files/March_bannner_landscape.png?v=1774708479&width=2100"
            alt="Hero banner"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </section>

        {/* Marquee */}
        <section className="ss-marquee">
          <div className="ss-marquee-wrapper">
            <div className="ss-marquee-images">
              {marqueeImagesToRender.map((marqueeImage, i) => (
                <div
                  key={i}
                  className={`ss-marquee-img${i === 4 ? " pin" : ""}`}
                >
                  <img src={marqueeImage} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal Scroll */}
        <section className="ss-horizontal-scroll">
          <div
            className="ss-horizontal-scroll-wrapper"
            style={{ width: horizontalWrapperWidth }}
          >
            <div className="ss-horizontal-slide ss-horizontal-spacer" />

            {slidesToRender.map((slide, i) => (
              <div key={slide._id || i} className="ss-horizontal-slide">
                <div className="ss-col">
                  <h3>{slide.description}</h3>
                </div>
                <div className="ss-col">
                  <button
                    className="ss-slide-image-button"
                    type="button"
                    aria-label={`Open ${slide.name || "product"} detail`}
                    onClick={() => slide._id && navigate(`/product/${slide._id}`)}
                  >
                    <img src={slide.images[0]} alt={slide.name || ""} />
                    <span className="ss-slide-label" aria-hidden="true">
                      <span className="ss-slide-label__title">Caps</span>
                      <span className="ss-slide-label__action">Shop now</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outro */}
        <section className="ss-outro">
          <div className="ss-outro__marquee ss-outro__marquee--top" aria-hidden="true">
            <div className="ss-outro__marquee-track">
              <span>never fit in&nbsp;</span>
              <span>never fit in&nbsp;</span>
              <span>never fit in&nbsp;</span>
            </div>
          </div>

          <div className="ss-outro__marquee ss-outro__marquee--bottom" aria-hidden="true">
            <div className="ss-outro__marquee-track">
              <span>made to stand out&nbsp;</span>
              <span>made to stand out&nbsp;</span>
              <span>made to stand out&nbsp;</span>
            </div>
          </div>

          {outroImagesToRender.length > 0 && (
            <div className="ss-outro__media" aria-hidden="true">
              {outroImagesToRender.map((image, index) => (
                <div className="ss-outro__frame" key={`${image}-${index}`}>
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
          )}

          <div className="ss-outro__center">
            <span className="ss-outro__kicker">fashion for the unfitted</span>
            <h1 className="ss-outro__line" aria-label={outroText}>
              <span className="ss-outro__word ss-outro__brand">Loosely</span>
              <span className="ss-outro__word ss-outro__brand">Fit</span>
              <span className="ss-outro__word ss-outro__dash">-</span>
              <span className="ss-outro__word ss-outro__subtle">made</span>
              <span className="ss-outro__word ss-outro__subtle">for</span>
              <span className="ss-outro__word ss-outro__subtle">the</span>
              <span className="ss-outro__word">ones</span>
              <span className="ss-outro__word">who</span>
              <span className="ss-outro__word">never</span>
              <span className="ss-outro__word">fit</span>
              <span className="ss-outro__word">in.</span>
            </h1>
            <span className="ss-outro__spark">drop identity</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScrollSection;
