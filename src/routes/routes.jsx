// routes/routes.js
import CartPage from "../components/CartPage";
import CreateProduct from "../components/CreateProduct";
import Deshborad from "../components/Deshborad";
import Home from "../components/Home";
import Login from "../components/Login";
import ReadProduct from "../components/ReadProduct";
import Register from "../components/Register";
import UpdateProduct from "../components/UpdateProduct";
import VendorProduct from "../components/VendorProduct";

// Public routes (always visible)
export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

// Protected routes (require login)
export const privateRoutes = [
  { path: "/createProduct", role:"vendor", element: <CreateProduct /> },
  { path: "/updateProduct/:id",role:"vendor", element: <UpdateProduct /> },
  { path: "/readProduct", role:"vendor",element: <ReadProduct /> },
  // costomer
  { path: "/deshboard",role:"customer", element: <Deshborad /> },
  { path: "/vendorProduct/:id",role:"customer", element: <VendorProduct /> },
  { path: "/cartPage",role:"customer", element: <CartPage /> },
];
