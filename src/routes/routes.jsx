// routes/routes.js
import Buy from "../components/Buy";
import CartPage from "../components/CartPage";
import CreateProduct from "../components/CreateProduct";
import Deshborad from "../components/Deshborad";
import GetAllDelivery from "../components/GetAllDelivery";
// import GetProductOfVendor from "../components/GetProductOfVendor";
import GetPurchaseOfVendor from "../components/GetPurchaseOfVendor";
import Home from "../components/Home";
import Login from "../components/Login";
import PurchasePage from "../components/PurchasePage";
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
  { path: "/buy/:id",role:"customer", element: <Buy /> },
  { path: "/purchases",role:"customer", element: <PurchasePage /> },
  { path: "/GetVendorPurchases",role:"vendor", element: <GetPurchaseOfVendor /> },
  { path: "/geAllDelivery",role:"vendor", element: <GetAllDelivery /> },
];
