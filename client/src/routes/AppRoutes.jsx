import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import { ContactPage, PoliciesPage, ReturnsPage, ShippingPage } from "../pages/InfoPages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:id" element={<Checkout />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/pages/contact-us" element={<ContactPage />} />

        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/returns-and-refunds" element={<ReturnsPage />} />
        <Route path="/pages/returns-and-refunds" element={<ReturnsPage />} />
        <Route path="/policies/returns" element={<ReturnsPage />} />

        <Route path="/policies" element={<PoliciesPage />} />
        <Route path="/pages/policies" element={<PoliciesPage />} />

        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/policies/shipping" element={<ShippingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
