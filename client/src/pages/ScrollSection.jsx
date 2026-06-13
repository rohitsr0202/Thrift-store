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

  .ss-editorial-copy {
    position: relative;
    width: min(820px, 100%);
    min-height: min(620px, 82svh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    isolation: isolate;
  }

  .ss-editorial-copy::before,
  .ss-editorial-copy::after {
    position: absolute;
    left: 0;
    width: min(520px, 74%);
    height: 1px;
    background: linear-gradient(90deg, rgba(235, 235, 237, 0.76), rgba(235, 235, 237, 0));
    content: "";
  }

  .ss-editorial-copy::before { top: 7%; }
  .ss-editorial-copy::after { bottom: 9%; }

  .ss-editorial-ghost {
    position: absolute;
    z-index: -1;
    color: rgba(235, 235, 237, 0.055);
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(6rem, 16vw, 18rem);
    font-weight: 900;
    letter-spacing: -0.08em;
    line-height: 0.78;
    text-transform: uppercase;
    pointer-events: none;
    white-space: nowrap;
    will-change: transform;
  }

  .ss-editorial-ghost--top {
    top: 4%;
    left: -7%;
  }

  .ss-editorial-ghost--bottom {
    right: -8%;
    bottom: 1%;
    left: auto;
    color: rgba(235, 235, 237, 0.038);
    font-size: clamp(4.6rem, 11vw, 13rem);
  }

  .ss-editorial-meta {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 18px;
    width: min(560px, 100%);
    margin-bottom: clamp(28px, 5vh, 58px);
    color: rgba(235, 235, 237, 0.68);
    font-size: clamp(0.68rem, 0.78vw, 0.82rem);
    font-weight: 800;
    letter-spacing: 0.28em;
    line-height: 1;
    text-transform: uppercase;
  }

  .ss-editorial-meta__rule {
    height: 1px;
    background: rgba(235, 235, 237, 0.26);
  }

  .ss-editorial-kicker {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    width: fit-content;
    margin-bottom: 18px;
    color: rgba(235, 235, 237, 0.84);
    font-size: clamp(0.74rem, 0.9vw, 0.96rem);
    font-weight: 900;
    letter-spacing: 0.34em;
    line-height: 1;
    text-transform: uppercase;
  }

  .ss-editorial-kicker::before {
    width: 44px;
    height: 8px;
    background:
      linear-gradient(90deg, #214d8f 0 52%, #d75b2a 52% 100%);
    content: "";
  }

  .ss-editorial-heading {
    width: min(820px, 100%);
    margin: 0;
    color: rgba(250, 250, 246, 0.98);
    font-family: "PP Neue Montreal", Arial, sans-serif;
    font-size: clamp(3.5rem, 7.5vw, 9.4rem);
    font-weight: 800;
    letter-spacing: -0.065em;
    line-height: 0.82;
    text-transform: uppercase;
  }

  .ss-editorial-heading__line {
    display: block;
    overflow: hidden;
  }

  .ss-editorial-heading__line span {
    display: block;
    will-change: transform, opacity;
  }

  .ss-editorial-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: clamp(22px, 4vw, 56px);
    width: min(680px, 100%);
    margin-top: clamp(30px, 5vh, 58px);
  }

  .ss-editorial-description {
    margin: 0;
    color: rgba(235, 235, 237, 0.72);
    font-size: clamp(1rem, 1.35vw, 1.32rem);
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.42;
  }

  .ss-editorial-cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 0 0 10px;
    border: 0;
    border-bottom: 1px solid rgba(235, 235, 237, 0.42);
    background: transparent;
    color: rgba(235, 235, 237, 0.92);
    cursor: pointer;
    font: inherit;
    font-size: 0.76rem;
    font-weight: 900;
    letter-spacing: 0.26em;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .ss-editorial-cta::after {
    width: 28px;
    height: 1px;
    background: currentColor;
    content: "";
    transform-origin: left;
    transition: transform 220ms ease;
  }

  .ss-editorial-cta:hover::after {
    transform: scaleX(1.45);
  }

  .ss-campaign-poster {
    position: relative;
    width: min(560px, 78%);
    aspect-ratio: 4 / 5.35;
    isolation: isolate;
    transform-style: preserve-3d;
  }

  .ss-campaign-poster::before {
    position: absolute;
    inset: -8% -10% -12%;
    z-index: -2;
    background:
      radial-gradient(circle at 50% 22%, rgba(255, 255, 255, 0.26), transparent 38%),
      radial-gradient(circle at 72% 78%, rgba(215, 91, 42, 0.2), transparent 34%),
      radial-gradient(circle at 16% 46%, rgba(33, 77, 143, 0.2), transparent 38%);
    filter: blur(26px);
    opacity: 0.72;
    content: "";
    pointer-events: none;
  }

  .ss-campaign-poster::after {
    position: absolute;
    inset: 12px -12px -12px 12px;
    z-index: -1;
    border: 1px solid rgba(235, 235, 237, 0.22);
    content: "";
  }

  .ss-slide-image-button {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 1px solid rgba(235, 235, 237, 0.18);
    border-radius: 0;
    background: #111;
    box-shadow:
      0 44px 90px rgba(0, 0, 0, 0.62),
      0 14px 36px rgba(0, 0, 0, 0.46);
    cursor: pointer;
    overflow: hidden;
    transform: translateZ(0);
  }

  .ss-slide-image-button::before,
  .ss-slide-image-button::after {
    position: absolute;
    inset: 0;
    content: "";
    pointer-events: none;
  }

  .ss-slide-image-button::before {
    z-index: 2;
    background:
      linear-gradient(112deg, transparent 0 42%, rgba(255, 255, 255, 0.18) 47%, transparent 54%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.42));
    mix-blend-mode: screen;
    opacity: 0.34;
  }

  .ss-slide-image-button::after {
    z-index: 3;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.09) 0 1px, transparent 1.2px),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.07) 0 1px, transparent 1.2px);
    background-size: 4px 4px, 6px 6px;
    opacity: 0.24;
  }

  .ss-slide-image-button img {
    display: block;
    filter: saturate(0.92) contrast(1.08);
    transform: scale(1.1);
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms ease;
    will-change: transform;
  }

  .ss-slide-image-button:hover img {
    transform: scale(1.04);
    filter: saturate(1.02) contrast(1.12);
  }

  .ss-slide-label {
    position: absolute;
    inset: 18px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.86);
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
    pointer-events: none;
  }

  .ss-slide-label__title {
    width: min-content;
    font-size: clamp(0.72rem, 0.95vw, 0.9rem);
    letter-spacing: 0.32em;
  }

  .ss-slide-label__action {
    align-self: flex-end;
    font-size: clamp(0.68rem, 0.82vw, 0.78rem);
    letter-spacing: 0.24em;
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
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    gap: 2rem;
    padding: 2rem;
    overflow: hidden;
  }

  .ss-horizontal-slide:not(.ss-horizontal-spacer) {
    background:
      linear-gradient(90deg, rgba(16, 16, 16, 0.96), rgba(22, 22, 20, 0.98) 54%, rgba(8, 8, 8, 1)),
      var(--dark);
    color: var(--light);
  }

  .ss-horizontal-slide:not(.ss-horizontal-spacer)::before {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(235, 235, 237, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(235, 235, 237, 0.032) 1px, transparent 1px);
    background-size: 74px 74px;
    mask-image: radial-gradient(circle at 62% 50%, #000 0 36%, transparent 76%);
    content: "";
    pointer-events: none;
  }

  .ss-horizontal-slide .ss-col:nth-child(1) { flex: 3; }
  .ss-horizontal-slide .ss-col:nth-child(2) { flex: 2; }

  .ss-horizontal-scroll .ss-col {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ss-horizontal-slide .ss-col h3 {
    width: 75%;
  }

  .ss-horizontal-slide .ss-col .ss-editorial-heading {
    width: min(820px, 100%);
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
    .ss-horizontal-slide .ss-col .ss-editorial-heading { width: min(820px, 100%); }
    .ss-editorial-copy {
      min-height: 0;
      width: 100%;
    }
    .ss-editorial-copy::before {
      top: -18px;
    }
    .ss-editorial-copy::after {
      bottom: -22px;
    }
    .ss-editorial-heading {
      font-size: clamp(3rem, 10vw, 6.4rem);
    }
    .ss-editorial-body {
      grid-template-columns: 1fr;
      gap: 22px;
      margin-top: 28px;
    }
    .ss-campaign-poster {
      width: min(430px, 76vw);
      max-height: 48svh;
    }
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
      min-height: 245px;
    }

    .ss-horizontal-slide .ss-col:nth-child(2) {
      align-items: center;
      min-height: 320px;
    }

    .ss-editorial-copy::before,
    .ss-editorial-copy::after {
      width: 100%;
    }

    .ss-editorial-ghost {
      font-size: clamp(5rem, 30vw, 9rem);
    }

    .ss-editorial-ghost--top {
      top: -16%;
      left: -6%;
    }

    .ss-editorial-ghost--bottom {
      right: -20%;
      bottom: -2%;
    }

    .ss-editorial-meta {
      grid-template-columns: auto 1fr;
      gap: 12px;
      margin-bottom: 18px;
      font-size: 0.62rem;
      letter-spacing: 0.2em;
    }

    .ss-editorial-meta__collection {
      grid-column: 1 / -1;
    }

    .ss-editorial-kicker {
      margin-bottom: 12px;
      font-size: 0.66rem;
      letter-spacing: 0.24em;
    }

    .ss-editorial-kicker::before {
      width: 32px;
      height: 7px;
    }

    .ss-editorial-heading {
      font-size: clamp(2.55rem, 15vw, 4.8rem);
      line-height: 0.86;
    }

    .ss-editorial-description {
      font-size: clamp(0.92rem, 4.2vw, 1.08rem);
      line-height: 1.35;
    }

    .ss-editorial-cta {
      width: fit-content;
      font-size: 0.64rem;
      letter-spacing: 0.18em;
    }

    .ss-campaign-poster {
      width: min(300px, 72vw);
      max-height: 58svh;
      aspect-ratio: 4 / 5;
      height: auto;
    }

    .ss-slide-label {
      gap: 8px;
    }

    .ss-slide-label__title {
      font-size: clamp(0.62rem, 2.8vw, 0.78rem);
      letter-spacing: 0.24em;
    }

    .ss-slide-label__action {
      font-size: clamp(0.58rem, 2.6vw, 0.72rem);
      letter-spacing: 0.2em;
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

    .ss-editorial-heading {
      font-size: clamp(2.25rem, 14vw, 4rem);
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
  const editorialDirections = [
    {
      kicker: "FW26 Collection",
      headline: ["Oversized", "Culture"],
      ghostTop: "CAPS",
      ghostBottom: "FW26",
      label: "Structured cap with blue and orange panel detailing.",
      collection: "Caps Collection",
      tone: "Blue / Orange",
    },
    {
      kicker: "Atelier Issue",
      headline: ["Loosely", "Fit"],
      ghostTop: "LOOSELY",
      ghostBottom: "NEW ARRIVALS",
      label: "Quiet volume, sharp attitude, built for the everyday uniform.",
      collection: "Editorial Drop",
      tone: "Shadow / Bone",
    },
    {
      kicker: "Campaign Study",
      headline: ["Street", "Silhouette"],
      ghostTop: "FORM",
      ghostBottom: "OVERSIZED",
      label: "A study in proportion, negative space, and off-duty movement.",
      collection: "City Uniform",
      tone: "Graphite / Chalk",
    },
    {
      kicker: "Runway Notes",
      headline: ["Soft", "Rebellion"],
      ghostTop: "DROP",
      ghostBottom: "CULTURE",
      label: "Subtle contrast details meet a cinematic, after-dark mood.",
      collection: "Limited Capsule",
      tone: "Ink / Signal",
    },
  ];
  const totalSlidesLabel = String(Math.max(slidesToRender.length, 1)).padStart(2, "0");


  useEffect(() => {
    if (!rootRef.current) return;

    const root = rootRef.current;
    const cleanups = [];

    const ctx = gsap.context(() => {
      const campaignSlides = gsap.utils.toArray(".ss-horizontal-slide--campaign", root);

      campaignSlides.forEach((slide) => {
        const headingLines = slide.querySelectorAll(".ss-editorial-heading__line span");
        const revealItems = slide.querySelectorAll(
          ".ss-editorial-meta, .ss-editorial-kicker, .ss-editorial-description, .ss-editorial-cta"
        );
        const poster = slide.querySelector(".ss-campaign-poster");
        const posterImage = slide.querySelector(".ss-slide-image-button img");
        const ghostTop = slide.querySelector(".ss-editorial-ghost--top");
        const ghostBottom = slide.querySelector(".ss-editorial-ghost--bottom");

        gsap.set(headingLines, { yPercent: 112, opacity: 0 });
        gsap.set(revealItems, { y: 26, opacity: 0, filter: "blur(10px)" });
        gsap.set(poster, { scale: 1.1, opacity: 0, y: 32 });
        gsap.set(posterImage, { scale: 1.1 });
        gsap.set([ghostTop, ghostBottom], { opacity: 0 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        intro
          .to([ghostTop, ghostBottom], { opacity: 1, duration: 0.65 }, 0)
          .to(headingLines, { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.09 }, 0.08)
          .to(revealItems, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.07 }, 0.18)
          .to(poster, { scale: 1, opacity: 1, y: 0, duration: 1.05 }, 0.14)
          .to(posterImage, { scale: 1, duration: 1.25 }, 0.18);

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              intro.play();
              observer.disconnect();
            }
          },
          { threshold: 0.42 }
        );

        observer.observe(slide);
        cleanups.push(() => observer.disconnect());

        if (ghostTop && ghostBottom) {
          gsap.to(ghostTop, { x: 34, ease: "none", repeat: -1, yoyo: true, duration: 7.5 });
          gsap.to(ghostBottom, { x: -42, ease: "none", repeat: -1, yoyo: true, duration: 9 });
        }

        if (poster && posterImage) {
          const posterX = gsap.quickTo(poster, "rotateY", { duration: 0.55, ease: "power3.out" });
          const posterY = gsap.quickTo(poster, "rotateX", { duration: 0.55, ease: "power3.out" });
          const imageX = gsap.quickTo(posterImage, "x", { duration: 0.65, ease: "power3.out" });
          const imageY = gsap.quickTo(posterImage, "y", { duration: 0.65, ease: "power3.out" });

          const onMove = (event) => {
            const rect = poster.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            posterX(x * 5);
            posterY(y * -5);
            imageX(x * -14);
            imageY(y * -14);
          };

          const onLeave = () => {
            posterX(0);
            posterY(0);
            imageX(0);
            imageY(0);
          };

          poster.addEventListener("pointermove", onMove);
          poster.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            poster.removeEventListener("pointermove", onMove);
            poster.removeEventListener("pointerleave", onLeave);
          });
        }
      });
    }, rootRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [slidesToRender.length]);

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

            {slidesToRender.map((slide, i) => {
              const editorial = editorialDirections[i % editorialDirections.length];
              const slideNumber = String(i + 1).padStart(2, "0");
              const storyCopy = slide.description || editorial.label;

              return (
                <div
                  key={slide._id || i}
                  className="ss-horizontal-slide ss-horizontal-slide--campaign"
                >
                  <div className="ss-col">
                    <div className="ss-editorial-copy">
                      <span className="ss-editorial-ghost ss-editorial-ghost--top" aria-hidden="true">
                        {editorial.ghostTop}
                      </span>
                      <span className="ss-editorial-ghost ss-editorial-ghost--bottom" aria-hidden="true">
                        {editorial.ghostBottom}
                      </span>

                      <div className="ss-editorial-meta">
                        <span>{slideNumber} / {totalSlidesLabel}</span>
                        <span className="ss-editorial-meta__rule" />
                        <span className="ss-editorial-meta__collection">{editorial.collection}</span>
                      </div>

                      <span className="ss-editorial-kicker">{editorial.kicker}</span>

                      <h3 className="ss-editorial-heading">
                        {editorial.headline.map((line) => (
                          <span className="ss-editorial-heading__line" key={line}>
                            <span>{line}</span>
                          </span>
                        ))}
                      </h3>

                      <div className="ss-editorial-body">
                        <p className="ss-editorial-description">{storyCopy}</p>
                        <button
                          className="ss-editorial-cta"
                          type="button"
                          onClick={() => slide._id && navigate(`/product/${slide._id}`)}
                        >
                          View Piece
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ss-col">
                    <div className="ss-campaign-poster">
                      <button
                        className="ss-slide-image-button"
                        type="button"
                        aria-label={`Open ${slide.name || "product"} detail`}
                        onClick={() => slide._id && navigate(`/product/${slide._id}`)}
                      >
                        <img src={slide.images[0]} alt={slide.name || ""} />
                        <span className="ss-slide-label" aria-hidden="true">
                          <span className="ss-slide-label__title">{editorial.tone}</span>
                          <span className="ss-slide-label__action">FW26</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
