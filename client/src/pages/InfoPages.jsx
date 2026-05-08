import { Link, useNavigate } from "react-router-dom";
import brandLogo from "../assets/looselyFitIcon.png";
import "./InfoPages.css";

const supportEmail = "rohitsinghsr023@gamil.com";
const supportPhone = "8928567504";
const supportPhoneLink = "+918928567504";

const InfoNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="info-nav" aria-label="Info page navigation">
      <button
        className="info-nav__brand"
        type="button"
        aria-label="Go to home"
        onClick={() => navigate("/home")}
      >
        <img src={brandLogo} alt="Loosely Fit" />
      </button>

      <div className="info-nav__links">
        <Link to="/home">Shop</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

const InfoShell = ({ title, children }) => (
  <main className="info-shell">
    <InfoNav />
    <section className="info-hero">
      <h1>{title}</h1>
    </section>
    {children}
  </main>
);

const ReturnsContent = ({ includeHeading = true }) => (
  <section className="info-policy__section">
    {includeHeading && <h2>Return and Exchange Policies</h2>}
    <p>
      We do not offer free returns and exchanges. Customers are responsible for
      postage costs regarding returns and exchanges.
    </p>

    <h3>* On-sale purchase</h3>
    <ul>
      <li>
        Products purchased on sale cannot be cancelled once the order is placed
        and are not eligible for return, refund, or exchange.
      </li>
    </ul>

    <h3>* For all products</h3>
    <p>
      If you wish to return your product, you must ship it to us within 7 days
      of receiving your order and bear the shipping charges. The piece must be
      unused, unwashed, and free of any odor.
    </p>
    <p>
      Once we receive your return parcel, the piece is put through a quality
      check. Loosely Fit reserves the right to deny a return or exchange if the
      piece does not pass the quality check.
    </p>
    <p>
      Refunds are processed in the form of store credit. Our policy lasts 7
      days. If 7 days have gone by since your purchase or delivery, we cannot
      offer store credit or exchange.
    </p>
    <p>
      If you receive a faulty item from our end, please reach out to our support
      team at <a href={`https://wa.me/${supportPhoneLink.replace("+", "")}`}>{supportPhone}</a>{" "}
      via WhatsApp within 24 hours of receiving the order. No claims regarding
      faulty items will be processed after 24 hours.
    </p>
    <p>
      In case of damage caused during standard wash and care, despite following
      care instructions, please contact our support team within the first 15 days
      of receiving the order.
    </p>
    <p>
      For cancellations, please contact us through the contact page. Cancellation
      is only possible if the products have not been shipped. Once shipped,
      cancellation requests are not valid.
    </p>

    <h3>* For made-to-measure orders</h3>
    <p>
      Made-to-measure orders are unique to the specific requirements given by
      each client, so we cannot offer an exchange or return on the order. We may
      alter garments if required, depending on the form of the product.
    </p>
    <p>
      If you wish to alter your product, you must ship it to us within 7 days of
      receiving your order and bear the shipping charges.
    </p>

    <h3>* Mystery box orders</h3>
    <p>
      Mystery Boxes contain surprise products in the selected size, curated to
      avoid repetition with past orders. All Mystery Box sales are final: no
      returns, exchanges, upgrades, or cancellations are allowed.
    </p>
  </section>
);

const ShippingContent = () => (
  <section className="info-policy__section">
    <h2>Shipping Policies</h2>
    <p>
      Our goal is to offer reliable shipping options and provide responsive
      support throughout the delivery process.
    </p>
    <p>
      All orders are processed within 5-7 business days. Orders are not shipped
      or delivered on weekends or holidays. If we are experiencing a high volume
      of orders, shipments may be delayed by a few days.
    </p>

    <h3>Damaged or lost goods</h3>
    <p>
      If you receive a faulty item from our end, please reach out to our support
      team at <a href={`https://wa.me/${supportPhoneLink.replace("+", "")}`}>{supportPhone}</a>{" "}
      via WhatsApp within 24 hours of receiving the order.
    </p>
    <p>
      For products that may have been lost, please reach out to us as soon as
      possible after the tracking link reflects as delivered.
    </p>

    <h3>Shipping rates and delivery estimates</h3>
    <p>
      Shipping charges are calculated and displayed at checkout. Delivery delays
      can occasionally occur.
    </p>
    <ul>
      <li>India: 5-6 business days.</li>
      <li>International shipping charges are borne by the customer.</li>
    </ul>

    <h3>Shipment confirmation and order tracking</h3>
    <p>
      Once your order has been dispatched, tracking information is provided in
      the shipping confirmation email.
    </p>
  </section>
);

export const ContactPage = () => (
  <InfoShell title="Contact Us">
    <section className="info-contact">
      <h2>Contact Us</h2>
      <div className="info-contact__copy">
        <p>
          To contact customer support for product information or order queries,
          please write to us in the message box below or reach out using the
          details listed here.
        </p>
        <p>
          Email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          <br />
          WhatsApp / Phone: <a href={`tel:${supportPhoneLink}`}>+91 {supportPhone}</a>
        </p>
        <p>
          Support hours: <strong>12 PM - 6 PM, Monday to Saturday.</strong>
        </p>
      </div>
    </section>
  </InfoShell>
);

export const ReturnsPage = () => (
  <InfoShell title="Returns and Refunds">
    <article className="info-policy">
      <p className="info-policy__intro">Our returns and refund policies are as follows</p>
      <ReturnsContent includeHeading={false} />
    </article>
  </InfoShell>
);

export const ShippingPage = () => (
  <InfoShell title="Shipping">
    <article className="info-policy">
      <ShippingContent />
    </article>
  </InfoShell>
);

export const PoliciesPage = () => (
  <InfoShell title="Our Policies*">
    <article className="info-policy">
      <section className="info-policy__section">
        <h2>Privacy Policies</h2>
        <p>
          Loosely Fit respects your privacy and is committed to protecting it.
          This policy describes the information we may collect from you when you
          visit our website, place an order, or otherwise interact with the
          brand.
        </p>

        <h3>What information we collect</h3>
        <p>
          We do not store credit card details and only share customer details
          with third parties when required to fulfil your order, with your
          permission, or when required by law.
        </p>
        <p>
          When you visit the website, we may collect device information such as
          browser, IP address, time zone, cookies, pages viewed, referring
          websites, search terms, and information about how you interact with the
          site.
        </p>
        <p>
          When you make or attempt to make a purchase, we collect order
          information including name, billing address, shipping address, payment
          information, email address, and phone number.
        </p>

        <h3>What we do with your information</h3>
        <p>
          We use information to fulfil orders, process payments, arrange
          shipping, provide invoices or confirmations, communicate with you,
          screen orders for risk or fraud, improve the site, and send marketing
          communications when you have opted in.
        </p>

        <h3>Sharing your personal information</h3>
        <p>
          We may share personal information with service providers that help us
          operate the store, process orders, deliver products, provide analytics,
          or comply with applicable laws and regulations.
        </p>

        <h3>Behavioural advertising</h3>
        <p>
          We may use customer information to provide relevant advertisements or
          marketing communications. You can opt out of targeted advertising using
          the tools provided by the relevant advertising platforms.
        </p>

        <h3>Your rights</h3>
        <p>
          You can ask us to update, remove, or stop using your information for
          marketing by emailing <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
          Please include your full name, email address, and clear request.
        </p>
      </section>

      <ReturnsContent />
      <ShippingContent />

      <section className="info-policy__section">
        <h2>Credit Notes</h2>
        <p>
          Credit notes are provided virtually, attached to your customer ID, and
          can be redeemed online where supported. Credit notes are valid for one
          year and must be used in full in one transaction.
        </p>
        <div className="info-policy__note">
          For any policy questions, contact us at{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a> or{" "}
          <a href={`tel:${supportPhoneLink}`}>+91 {supportPhone}</a>.
        </div>
      </section>
    </article>
  </InfoShell>
);
