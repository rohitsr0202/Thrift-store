import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, LockKeyhole, Mail, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { loginUser } from "../api/authApi";
import brandLogo from "../assets/looselyFitIcon.png";
import heroProduct from "../assets/Images/bluoranggroupimg1.webp";
import "./Auth.css";

const getRedirectPath = (state) => state?.from || "/home";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = getRedirectPath(location.state);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(null);
  const imageRef = useRef(null);
  const typeRef = useRef(null);
  const labelRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  useEffect(() => {
    const page = pageRef.current;
    const image = imageRef.current;
    const type = typeRef.current;
    const label = labelRef.current;
    const glow = glowRef.current;

    if (!page || !image || !type || !label || !glow) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(page.querySelectorAll(".campaign-reveal"), {
        clearProps: "all",
        opacity: 1,
        filter: "blur(0px)",
      });
      gsap.set(".campaign-intro", { display: "none" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(".campaign-hero__media", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".campaign-hero__image", { opacity: 0, scale: 1, xPercent: -1.5 });
      gsap.set(".campaign-hero__type span", { y: 86, opacity: 0 });
      gsap.set(".campaign-hero__label", { opacity: 0, y: 24, filter: "blur(8px)" });
      gsap.set(".auth-panel", { opacity: 0, y: 40, filter: "blur(14px)" });
      gsap.set(".campaign-reveal", { opacity: 0, y: 20 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".campaign-intro__brand", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo(
          ".campaign-intro__line",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.35"
        )
        .to(".campaign-intro", { opacity: 0, duration: 0.75, delay: 0.25, pointerEvents: "none" })
        .to(".campaign-hero__media", { clipPath: "inset(0 0% 0 0)", duration: 1.3 }, "-=0.38")
        .to(".campaign-hero__image", { opacity: 1, duration: 1.1 }, "-=1.12")
        .to(".campaign-hero__type span", { y: 0, opacity: 1, duration: 1.05, stagger: 0.13 }, "-=0.92")
        .to(".campaign-hero__label", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, "-=0.72")
        .to(".auth-panel", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.92 }, "-=0.64")
        .to(".campaign-reveal", { opacity: 1, y: 0, duration: 0.62, stagger: 0.08 }, "-=0.68");

      gsap.to(image, {
        scale: 1.08,
        xPercent: 2.4,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, page);

    const imageX = gsap.quickTo(image, "x", { duration: 0.7, ease: "power3.out" });
    const imageY = gsap.quickTo(image, "y", { duration: 0.7, ease: "power3.out" });
    const typeX = gsap.quickTo(type, "x", { duration: 0.85, ease: "power3.out" });
    const typeY = gsap.quickTo(type, "y", { duration: 0.85, ease: "power3.out" });
    const labelX = gsap.quickTo(label, "x", { duration: 0.55, ease: "power3.out" });
    const labelY = gsap.quickTo(label, "y", { duration: 0.55, ease: "power3.out" });
    const glowX = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" });
    const glowOpacity = gsap.quickTo(glow, "opacity", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (event) => {
      const rect = page.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      imageX(x * 10);
      imageY(y * 10);
      typeX(x * 5);
      typeY(y * 5);
      labelX(x * 15);
      labelY(y * 15);
      glowX(event.clientX - rect.left - 110);
      glowY(event.clientY - rect.top - 110);
      glowOpacity(1);
    };

    const handleMouseLeave = () => {
      imageX(0);
      imageY(0);
      typeX(0);
      typeY(0);
      labelX(0);
      labelY(0);
      glowOpacity(0);
    };

    page.addEventListener("mousemove", handleMouseMove);
    page.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      page.removeEventListener("mousemove", handleMouseMove);
      page.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, []);

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(form);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-page--campaign" ref={pageRef}>
      <div className="campaign-intro" aria-hidden="true">
        <img className="campaign-intro__mark" src={brandLogo} alt="" />
        {/* <p className="campaign-intro__brand">BLUORANG</p> */}
        {/* <span className="campaign-intro__line">MEMBERS ONLY</span> */}
      </div>

      <span className="campaign-cursor-glow" ref={glowRef} aria-hidden="true" />

      <nav className="auth-nav auth-nav--campaign" aria-label="Authentication navigation">
        <button type="button" className="auth-nav__brand" onClick={() => navigate("/home")}>
          <img src={brandLogo} alt="Loosely Fit" />
        </button>
        <button type="button" className="auth-nav__back" onClick={() => navigate("/home")}>
          <ArrowLeft size={18} strokeWidth={1.9} />
          <span>Back to shop</span>
        </button>
      </nav>

      <section className="auth-shell auth-shell--campaign">
        <div className="campaign-hero" aria-hidden="true">
          <div className="campaign-hero__type" ref={typeRef}>
            {/* <span>BLUORANG</span> */}
            <span>WINTER 2026</span>
            {/* <span>MEMBERS ONLY</span> */}
          </div>

          <div className="campaign-hero__label" ref={labelRef}>
            <span>FW26 COLLECTION</span>
            <span>NEW ARRIVALS</span>
          </div>

          <div className="campaign-hero__media">
            <img className="campaign-hero__image" ref={imageRef} src={heroProduct} alt="" />
          </div>
        </div>

        <div className="auth-panel auth-panel--campaign">
          <div className="auth-panel__header campaign-reveal">
            <ShoppingBag size={24} strokeWidth={1.7} />
            <div>
              <p>Private access</p>
              <h2>Members login</h2>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="campaign-reveal">
              <span>Email</span>
              <div className="auth-field">
                <Mail size={18} strokeWidth={1.7} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="you@example.com"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className="campaign-reveal">
              <span>Password</span>
              <div className="auth-field">
                <LockKeyhole size={18} strokeWidth={1.7} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Your password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            {error && <p className="auth-form__error">{error}</p>}

            <button className="auth-form__submit campaign-reveal" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Continue to checkout"}
            </button>
          </form>

          <p className="auth-switch campaign-reveal">
            New to Loosely Fit?{" "}
            <Link to="/register" state={{ from: redirectPath }}>
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
