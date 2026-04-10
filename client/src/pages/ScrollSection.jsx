import { useEffect, useRef } from "react";
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

  .ss-hero h1,
  .ss-outro h1 {
    width: 75%;
    margin: 0 auto;
  }

  .ss-outro {
    background-color: var(--dark);
    color: var(--light);
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

  .ss-horizontal-slide .ss-col h3,
  .ss-horizontal-slide .ss-col img {
    width: 75%;
  }

  .ss-horizontal-slide .ss-col img {
    height: 75%;
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
    .ss-horizontal-slide .ss-col img { width: 100%; height: 100%; }
  }
`;

// ── Props ──────────────────────────────────────────────────────────────────
// image        : URL used for marquee + horizontal-slide images
// heroText     : text for the hero h1
// outroText    : text for the outro h1
// slides       : array of { heading, image } for the horizontal panels
// ──────────────────────────────────────────────────────────────────────────
const ScrollSection = ({
  image = "https://www.superkicks.in/cdn/shop/files/BANNERS_6.jpg?v=1772455455",
  heroText = "Fragments of thought arranged in sequence become patterns. They unfold step by step, shaping meaning as they move forward.",
  outroText = "Shadows fold into light. Shapes shift across the frame, reminding us that stillness is only temporary.",
  slides = [
    {
      heading:
        "A landscape in constant transition, where every shape, sound, and shadow refuses to stay still. What seems stable begins to dissolve, and what fades returns again in a new form.",
      image,
    },
    {
      heading:
        "The rhythm of motion carries us forward into spaces that feel familiar yet remain undefined. Each shift is subtle, yet together they remind us that nothing we see is ever permanent.",
      image,
    },
  ],
}) => {
  const rootRef = useRef(null);


useEffect(() => {
  if (!rootRef.current) return;

  gsap.registerPlugin(ScrollTrigger, Flip);

  const ctx = gsap.context(() => {
    const root = rootRef.current;

    const container = root.querySelector(".ss-container");
    const marqueeImages = root.querySelector(".ss-marquee-images");
    const pinImg = root.querySelector(".ss-marquee-img.pin img");
    const wrapper = root.querySelector(".ss-horizontal-scroll-wrapper");
    const hScroll = root.querySelector(".ss-horizontal-scroll");
    const marqueeSection = root.querySelector(".ss-marquee");

    const lightColor = "#EBEBED";
    const darkColor = "#101010";

    // ✅ LENIS SETUP
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ── Marquee scroll ─────────────────────────
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
            x: `${-66.67 * hp}%`,
          });

          if (clone) {
            const imgX = -((66.67 / 100) * 3 * hp) * 100;
            gsap.set(clone, { x: `${imgX}%` });
          }
        }
      },
    });

    // ✅ CLEANUP (SAFE)
    return () => {
      lenis.destroy();
      removeClone();
    };
  }, rootRef);

  return () => ctx.revert(); // ✅ THIS IS THE KEY FIX
}, []);
  const marqueeCount = 12;

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
              {Array.from({ length: marqueeCount }).map((_, i) => (
                <div
                  key={i}
                  className={`ss-marquee-img${i === 5 ? " pin" : ""}`}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal Scroll */}
        <section className="ss-horizontal-scroll">
          <div className="ss-horizontal-scroll-wrapper">
            <div className="ss-horizontal-slide ss-horizontal-spacer" />

            {slides.map((slide, i) => (
              <div key={i} className="ss-horizontal-slide">
                <div className="ss-col">
                  <h3>{slide.heading}</h3>
                </div>
                <div className="ss-col">
                  <img src={slide.image} alt="" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outro */}
        <section className="ss-outro">
          <h1>{outroText}</h1>
        </section>
      </div>
    </div>
  );
};

export default ScrollSection;