// routes/routes.js
import CreateProduct from "../components/CreateProduct";
import Home from "../components/Home";
import Login from "../components/Login";
import ReadProduct from "../components/ReadProduct";
import Register from "../components/Register";
import UpdateProduct from "../components/UpdateProduct";

// Public routes (always visible)
export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

// Protected routes (require login)
export const privateRoutes = [
  { path: "/createProduct", element: <CreateProduct /> },
  { path: "/updateProduct", element: <UpdateProduct /> },
  { path: "/readProduct", element: <ReadProduct /> },
  
];
