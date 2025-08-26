// routes/routes.js
import CreateProduct from "../components/CreateProduct";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";

// Public routes (always visible)
export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

// Protected routes (require login)
export const privateRoutes = [
  { path: "/createProduct", element: <CreateProduct /> },
];
