import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panelStyles = [
  { "--x": "-35%", "--y": "-18%", "--r": "-14deg", "--z": "-90px", "--delay": 0 },
  { "--x": "44%", "--y": "-20%", "--r": "10deg", "--z": "-130px", "--delay": 1 },
  { "--x": "-42%", "--y": "28%", "--r": "8deg", "--z": "-110px", "--delay": 2 },
  { "--x": "33%", "--y": "31%", "--r": "-9deg", "--z": "-70px", "--delay": 3 },
];

const dustStyles = [
  { "--x": "12%", "--y": "24%", "--s": 0.86, "--d": "7s" },
  { "--x": "29%", "--y": "11%", "--s": 0.58, "--d": "8.4s" },
  { "--x": "45%", "--y": "38%", "--s": 0.72, "--d": "7.8s" },
  { "--x": "63%", "--y": "18%", "--s": 0.64, "--d": "9s" },
  { "--x": "76%", "--y": "52%", "--s": 0.9, "--d": "8.8s" },
  { "--x": "18%", "--y": "62%", "--s": 0.48, "--d": "7.5s" },
  { "--x": "51%", "--y": "71%", "--s": 0.68, "--d": "9.2s" },
  { "--x": "82%", "--y": "29%", "--s": 0.52, "--d": "7.2s" },
];

const AuthSneakerReveal = ({ image, eyebrow, title, note }) => {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
  const shoeRef = useRef(null);
  const glowRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    const shoe = shoeRef.current;
    const glow = glowRef.current;
    const shadow = shadowRef.current;

    if (!root || !stage || !orbit || !shoe || !glow || !shadow) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(root.querySelectorAll(".sneaker-reveal__panel, .sneaker-reveal__shoe"), {
        clearProps: "all",
        opacity: 1,
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(stage, { transformPerspective: 1200, transformStyle: "preserve-3d" });
      gsap.set(".sneaker-reveal__headline", { y: 50, opacity: 0 });
      gsap.set(".sneaker-reveal__shoe-orbit", {
        opacity: 0,
        scale: 0.82,
        xPercent: -7,
        y: 58,
        rotateX: 16,
        rotateY: -42,
        rotateZ: -4,
        transformOrigin: "50% 56%",
      });
      gsap.set(".sneaker-reveal__panel", {
        opacity: 0,
        scale: 0.76,
        x: (i) => [-210, 190, -170, 150][i],
        y: (i) => [-120, -90, 120, 110][i],
        rotateX: (i) => [40, -32, -24, 34][i],
        rotateY: (i) => [-38, 32, 24, -26][i],
      });
      gsap.set(".sneaker-reveal__dust", { opacity: 0 });
      gsap.set(".sneaker-reveal__reflection", { opacity: 0, scaleX: 0.72 });
      gsap.set(shadow, { opacity: 0, scaleX: 0.42, scaleY: 0.68 });
      gsap.set(glow, { opacity: 0, scale: 0.7 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(".sneaker-reveal__headline", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
        })
        .to(
          ".sneaker-reveal__panel",
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 1.25,
            stagger: 0.08,
          },
          "-=0.7"
        )
        .to(
          ".sneaker-reveal__shoe-orbit",
          {
            opacity: 1,
            scale: 1,
            xPercent: 0,
            y: 0,
            rotateX: 0,
            rotateY: -10,
            rotateZ: 0,
            duration: 1.35,
          },
          "-=0.72"
        )
        .to(glow, { opacity: 1, scale: 1, duration: 1.1 }, "-=1")
        .to(shadow, { opacity: 1, scaleX: 1, scaleY: 1, duration: 1 }, "-=0.95")
        .to(".sneaker-reveal__reflection", { opacity: 0.28, scaleX: 1, duration: 0.95 }, "-=0.9")
        .to(".sneaker-reveal__dust", { opacity: 1, duration: 0.8, stagger: 0.05 }, "-=0.7");

      gsap.to(orbit, {
        y: -16,
        rotateY: 10,
        duration: 4.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".sneaker-reveal__panel", {
        y: (i) => [-10, 12, -8, 10][i],
        rotateZ: (i) => [-2, 1.6, 1.4, -1.8][i],
        duration: 5.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });

      gsap.to(".sneaker-reveal__background-word", {
        xPercent: -7,
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(orbit, {
        rotateY: 36,
        rotateX: -5,
        xPercent: 5,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "bottom 18%",
          scrub: 0.8,
        },
      });

      gsap.fromTo(
        root.closest(".auth-shell")?.querySelector(".auth-panel"),
        { y: 36, opacity: 0.001 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        }
      );
    }, root);

    const shoeX = gsap.quickTo(shoe, "rotateY", { duration: 0.45, ease: "power3.out" });
    const shoeY = gsap.quickTo(shoe, "rotateX", { duration: 0.45, ease: "power3.out" });
    const shoeScale = gsap.quickTo(shoe, "scale", { duration: 0.35, ease: "power3.out" });
    const glowX = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" });
    const bgX = gsap.quickTo(root, "--parallax-x", { duration: 0.6, ease: "power3.out" });
    const bgY = gsap.quickTo(root, "--parallax-y", { duration: 0.6, ease: "power3.out" });

    const handlePointerMove = (event) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      shoeX(-10 + x * 24);
      shoeY(y * -13);
      shoeScale(1.035);
      glowX(x * 48);
      glowY(y * 38);
      bgX(`${x * -22}px`);
      bgY(`${y * -16}px`);
      root.style.setProperty("--light-x", `${50 + x * 42}%`);
      root.style.setProperty("--light-y", `${48 + y * 38}%`);
    };

    const handlePointerLeave = () => {
      shoeX(-10);
      shoeY(0);
      shoeScale(1);
      glowX(0);
      glowY(0);
      bgX("0px");
      bgY("0px");
      root.style.setProperty("--light-x", "58%");
      root.style.setProperty("--light-y", "42%");
    };

    root.addEventListener("pointermove", handlePointerMove);
    root.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div className="sneaker-reveal" ref={rootRef}>
      <div className="sneaker-reveal__background-word">ACCESS</div>

      <div className="sneaker-reveal__copy">
        <p className="sneaker-reveal__headline">{eyebrow}</p>
        <h1 className="sneaker-reveal__headline">{title}</h1>
      </div>

      <div className="sneaker-reveal__stage" ref={stageRef}>
        <div className="sneaker-reveal__glow" ref={glowRef} />
        {panelStyles.map((style) => (
          <span
            className="sneaker-reveal__panel"
            style={style}
            key={`${style["--x"]}-${style["--y"]}`}
          />
        ))}
        {dustStyles.map((style) => (
          <span
            className="sneaker-reveal__dust"
            style={style}
            key={`${style["--x"]}-${style["--y"]}`}
          />
        ))}
        <div className="sneaker-reveal__shoe-orbit" ref={orbitRef}>
          <div className="sneaker-reveal__shoe" ref={shoeRef}>
            <img src={image} alt="" draggable={false} />
          </div>
        </div>
        <span className="sneaker-reveal__reflection" />
        <span className="sneaker-reveal__shadow" ref={shadowRef} />
      </div>

      <p className="sneaker-reveal__note">{note}</p>
    </div>
  );
};

export default AuthSneakerReveal;
