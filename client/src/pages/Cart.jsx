import React, { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem, updateCartItem } from "../api/cartApi";
import brandLogo from "../assets/looselyFitIcon.png";
import "./Home.css";
import "./Cart.css";

const formatPrice = (value) =>
  `INR ${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const productCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      ),
    [items]
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await getCart();
        setItems(data.items || []);
      } catch (error) {
        console.error("Unable to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (id, nextQuantity) => {
    try {
      const { data } = await updateCartItem(id, nextQuantity);
      setItems(data.items || []);
    } catch (error) {
      console.error("Unable to update cart item", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const { data } = await removeCartItem(id);
      setItems(data.items || []);
    } catch (error) {
      console.error("Unable to remove cart item", error);
    }
  };

  const handleCheckout = () => {
    const user = localStorage.getItem("userInfo");
    const checkoutPath = "/checkout/cart";

    if (!user) {
      navigate("/login", { state: { from: checkoutPath } });
      return;
    }

    navigate(checkoutPath);
  };

  return (
    <main className="cart-page">
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
          >
            <ShoppingBag size={22} strokeWidth={1.8} />
          </button>

          <button className="home-navbar__profile-button" type="button" aria-label="Open profile">
            <UserRound size={20} strokeWidth={1.8} />
            <span>Profile</span>
          </button>
        </div>
      </nav>

      <section className="cart-shell">
        <div className="cart-summary">
          <h1>Shopping Cart</h1>
          <p>
            {loading
              ? "Loading your cart"
              : `${productCount} ${productCount === 1 ? "product" : "products"} in your cart`}
          </p>
        </div>

        {loading ? (
          <div className="cart-empty">
            <h2>Loading...</h2>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Add something you love and it will show up here.</p>
            <button type="button" onClick={() => navigate("/home")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-details">
            <div className="cart-items" aria-label="Shopping cart items">
              {items.map((item) => (
                <article className="cart-item" key={item._id}>
                  <div className="cart-item__image">
                    <img src={item.product?.images?.[0]} alt={item.product?.name} />
                  </div>

                  <div className="cart-item__content">
                    <h2>{item.product?.name}</h2>
                    <div className="cart-item__price-row">
                      <strong>{formatPrice(item.product?.price || 0)}</strong>
                    </div>
                    {item.size && <p>{item.size}</p>}

                    <div className="cart-item__controls">
                      <button
                        type="button"
                        aria-label={`Decrease quantity for ${item.product?.name}`}
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <Minus size={15} strokeWidth={1.8} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity for ${item.product?.name}`}
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus size={16} strokeWidth={1.8} />
                      </button>
                      <button
                        className="cart-item__remove"
                        type="button"
                        onClick={() => removeItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <label className="cart-note">
              <span>Special instructions for seller</span>
              <textarea aria-label="Special instructions for seller" />
            </label>

            <div className="cart-total">
              <h2>Total: {formatPrice(total)}</h2>
              <p>Tax included. Shipping calculated at checkout.</p>
              <button type="button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
