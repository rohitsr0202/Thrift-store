# PROJECT_CONTEXT

## Overview

This repository is a full-stack e-commerce website with separate frontend and backend projects.

- `client/` is the React + Vite frontend.
- `server/` is the Express + MongoDB backend.

## Frontend (`client/`)

### Root
- `package.json` - React 19 app dependencies and scripts.
- `vite.config.js` - Vite configuration for React.
- `index.html` - HTML entry point.
- `README.md` - frontend project notes.

### Source files
- `src/main.jsx` - mounts the React app to the DOM.
- `src/App.jsx` - renders `AppRoutes`.

### Routing
- `src/routes/AppRoutes.jsx` - defines app routes including login, register, protected `/home`, product detail, cart, checkout, and info pages.
- `src/routes/ProtectedRoute.jsx` - protects routes by checking `localStorage.getItem("userInfo")`.

### API layer
- `src/api/axios.js` - Axios instance configured with `VITE_API_URL` and `/api` base path.
- `src/api/authApi.js` - login and register requests.
- `src/api/cartApi.js` - cart get/add/update/remove requests.
- `src/api/productApi.js` - empty placeholder.
- `src/api/paymentApi.js` - empty placeholder.

### Context and hooks
- `src/context/AuthContext.jsx` - currently empty, expected to manage auth state.
- `src/hooks/useAuth.js` - currently empty, expected to provide auth helper hooks.

### Components
- `src/components/Navbar.jsx` - navigation UI.
- `src/components/ProductCard.jsx` - product display card.
- `src/components/Loader.jsx` - UI loader.

### Pages
- `src/pages/Home.jsx` - main product listing / landing page.
- `src/pages/ProductDetail.jsx` - product detail view.
- `src/pages/Cart.jsx` - shopping cart page.
- `src/pages/Checkout.jsx` - checkout page.
- `src/pages/Login.jsx` - login page.
- `src/pages/Register.jsx` - registration page.
- `src/pages/InfoPages.jsx` - contact, policies, returns, shipping pages.
- `src/pages/ScrollSection.jsx` - scroll-related UI section.

### Styles
- `src/pages/Home.css`
- `src/pages/Cart.css`
- `src/pages/ProductDetail.css`
- `src/pages/InfoPages.css`

### Utilities
- `src/utils/helpers.js` - shared helper functions.

## Backend (`server/`)

### Root
- `package.json` - server dependencies and scripts.
- `server/src/server.js` - loads env, connects DB, starts the Express app.
- `server/src/app.js` - configures middleware, serves images, mounts routes.
- `productCatalog.js` - product definitions used for syncing/seeding.
- `resetProducts.js` - rebuilds `Product` collection from local images as data URIs.
- `syncProducts.js` - syncs product metadata and image URLs to MongoDB.
- `uploadImages.js` - updates products with image data URIs from a local folder.

### Configuration
- `server/src/config/db.js` - MongoDB connection helper.

### Models
- `server/src/models/User.js` - user schema with `name`, `email`, `password`.
- `server/src/models/Product.js` - product schema with `name`, `price`, `description`, `images`, `video`, and `category`.
- `server/src/models/Cart.js` - cart item schema with `product`, `size`, and `quantity`.
- `server/src/models/Order.js` - likely order schema (not inspected in detail).

### Controllers
- `server/src/controllers/authController.js` - register/login logic with bcrypt and JWT.
- `server/src/controllers/productController.js` - get all products and get product by ID.
- `server/src/controllers/cartController.js` - cart CRUD operations.
- `server/src/controllers/paymentController.js` - currently empty.

### Routes
- `server/src/routes/authRoutes.js` - `/api/auth/register`, `/api/auth/login`.
- `server/src/routes/productRoutes.js` - `/api/products`, `/api/products/:id`.
- `server/src/routes/cartRoutes.js` - `/api/cart`, `/api/cart/:id`.
- `server/src/routes/paymentRoutes.js` - file likely exists but may not be wired or implemented.

### Middleware
- `server/src/middleware/authMiddleware.js` - currently empty.
- `server/src/middleware/errorMiddleware.js` - currently empty.

### Utilities
- `server/src/utils/generateToken.js` - creates JWT tokens.

## Known gaps and issues

- `client/src/api/productApi.js` and `client/src/api/paymentApi.js` are empty.
- `client/src/context/AuthContext.jsx` and `client/src/hooks/useAuth.js` are empty.
- `server/src/middleware/authMiddleware.js` and `server/src/middleware/errorMiddleware.js` are empty.
- `server/src/controllers/paymentController.js` is empty.
- Cart data is stored globally in MongoDB and not tied to a specific user.
- Frontend route protection only checks local storage; there is no backend-protected route enforcement.
- The backend serves images from `client/src/assets/Images` at `/product-images`.

## Quick start

- Frontend: `cd client && npm install && npm run dev`
- Backend: `cd server && npm install && npm run dev`

## Notes for any AI fixing issues

- The frontend uses `VITE_API_URL` to call the backend.
- Backend endpoints are mounted under `/api`.
- Auth and payment features are partially scaffolded but not implemented.
- Image handling is done by serving static files and seeding MongoDB with `syncProducts.js` / `resetProducts.js`.
- Useful files to inspect first: `client/src/routes/AppRoutes.jsx`, `client/src/api/axios.js`, `server/src/app.js`, `server/src/controllers/*.js`, and `server/src/models/*.js`.
