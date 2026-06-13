import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, LockKeyhole, Mail, ShoppingBag, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { registerUser } from "../api/authApi";
import brandLogo from "../assets/looselyFitIcon.png";
import heroProduct from "../assets/Images/bluorangcapimg1.webp";
import "./Auth.css";

const getRedirectPath = (state) => state?.from || "/home";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = getRedirectPath(location.state);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(null);
  const imageRef = useRef(null);
  const typeRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  useEffect(() => {
    const page = pageRef.current;
    const image = imageRef.current;
    const type = typeRef.current;
    const light = lightRef.current;

    if (!page || !image || !type || !light) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(page.querySelectorAll(".join-reveal, .join-form-reveal, .join-editorial__word"), {
        clearProps: "all",
        opacity: 1,
        filter: "blur(0px)",
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(".join-hero__media", {
        clipPath: "inset(8% 100% 8% 0%)",
        filter: "blur(18px)",
      });
      gsap.set(".join-hero__image", { opacity: 0, scale: 1.18, xPercent: -3 });
      gsap.set(".join-editorial__word", { opacity: 0, yPercent: 42, filter: "blur(12px)" });
      gsap.set(".join-panel", { opacity: 0, x: 72, filter: "blur(14px)" });
      gsap.set(".join-reveal", { opacity: 0, y: 26, filter: "blur(10px)" });
      gsap.set(".join-form-reveal", { opacity: 0, y: 30, filter: "blur(12px)" });
      gsap.set(".join-hero__light", { opacity: 0, xPercent: -22 });

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .to(".join-hero__media", {
          clipPath: "inset(0% 0% 0% 0%)",
          filter: "blur(0px)",
          duration: 1.55,
        })
        .to(".join-hero__image", { opacity: 1, scale: 1.04, xPercent: 0, duration: 1.8 }, "-=1.38")
        .to(".join-hero__light", { opacity: 1, xPercent: 0, duration: 1.35 }, "-=1.2")
        .to(".join-editorial__word", { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.12 }, "-=1.02")
        .to(".join-panel", { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.1 }, "-=0.8")
        .to(".join-reveal", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.82, stagger: 0.08 }, "-=0.76")
        .to(".join-form-reveal", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.78, stagger: 0.1 }, "-=0.58");

      gsap.to(image, {
        scale: 1.11,
        xPercent: 2.6,
        duration: 25,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".join-editorial__word", {
        xPercent: (index) => [-1.6, 1.2, -0.8, 1.5][index] || 1,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    }, page);

    const imageX = gsap.quickTo(image, "x", { duration: 0.85, ease: "power3.out" });
    const imageY = gsap.quickTo(image, "y", { duration: 0.85, ease: "power3.out" });
    const typeX = gsap.quickTo(type, "x", { duration: 0.95, ease: "power3.out" });
    const typeY = gsap.quickTo(type, "y", { duration: 0.95, ease: "power3.out" });
    const lightX = gsap.quickTo(light, "x", { duration: 0.7, ease: "power3.out" });
    const lightY = gsap.quickTo(light, "y", { duration: 0.7, ease: "power3.out" });

    const handleMouseMove = (event) => {
      const rect = page.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      imageX(x * 14);
      imageY(y * 10);
      typeX(x * -18);
      typeY(y * -12);
      lightX(x * 42);
      lightY(y * 28);
    };

    const handleMouseLeave = () => {
      imageX(0);
      imageY(0);
      typeX(0);
      typeY(0);
      lightX(0);
      lightY(0);
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
      const data = await registerUser(form);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-page--join" ref={pageRef}>
      <nav className="auth-nav auth-nav--join" aria-label="Authentication navigation">
        <button type="button" className="auth-nav__brand" onClick={() => navigate("/home")}>
          <img src={brandLogo} alt="Loosely Fit" />
        </button>
        <button type="button" className="auth-nav__back" onClick={() => navigate("/home")}>
          <ArrowLeft size={18} strokeWidth={1.9} />
          <span>Back to shop</span>
        </button>
      </nav>

      <section className="join-shell">
        <div className="join-hero" aria-hidden="true">
          <div className="join-hero__media">
            <img className="join-hero__image" ref={imageRef} src={heroProduct} alt="" draggable={false} />
            <span className="join-hero__light" ref={lightRef} />
          </div>

          <div className="join-editorial" ref={typeRef}>
            <span className="join-editorial__word">LOOSELY FIT</span>
            <span className="join-editorial__word">JOIN THE MOVEMENT</span>
            <span className="join-editorial__word">FW26</span>
            <span className="join-editorial__word">OVERSIZED CULTURE</span>
          </div>

          <div className="join-hero__caption join-reveal">
            <span>Private streetwear ecosystem</span>
            <span>New drops / early access / FW26</span>
          </div>
        </div>

        <div className="auth-panel join-panel">
          <div className="auth-panel__header join-panel__header join-reveal">
            <ShoppingBag size={24} strokeWidth={1.7} />
            <div>
              <p>Exclusive access</p>
              <h2>JOIN LOOSELY FIT</h2>
              <span>Create your account to access new collections, exclusive drops, and premium streetwear releases.</span>
            </div>
          </div>

          <form className="auth-form join-form" onSubmit={handleSubmit}>
            <label className="join-form-reveal">
              <span>Name</span>
              <div className="auth-field">
                <UserRound size={18} strokeWidth={1.7} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Your name"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className="join-form-reveal">
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

            <label className="join-form-reveal">
              <span>Password</span>
              <div className="auth-field">
                <LockKeyhole size={18} strokeWidth={1.7} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            {error && <p className="auth-form__error">{error}</p>}

            <button className="auth-form__submit join-form__submit join-form-reveal" type="submit" disabled={loading}>
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="auth-switch join-switch join-reveal">
            Already have an account?{" "}
            <Link to="/login" state={{ from: redirectPath }}>
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
