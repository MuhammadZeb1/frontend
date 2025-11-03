// routes/routes.js
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ApproveDelivery from "../components/ApproveDelivery";
import Buy from "../components/Buy";
import CartPage from "../components/CartPage";
import CreateProduct from "../components/CreateProduct";
import Deshborad from "../components/Deshborad";
import GetAllDelivery from "../components/GetAllDelivery";
import GetDeliveryAssign from "../components/GetDeliveryAssign";
import GetPurchaseOfVendor from "../components/GetPurchaseOfVendor";
import GetVendorAssign from "../components/GetVendorAssign";
import GiveDelivery from "../components/GiveDelivery";
import Home from "../components/Home";
import Login from "../components/Login";
import PurchasePage from "../components/PurchasePage";
import ReadProduct from "../components/ReadProduct";
import Register from "../components/Register";
import UpdateProduct from "../components/UpdateProduct";
import VendorProduct from "../components/VendorProduct";

// ✅ Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export const customerRoutes = [
  { path: "/deshboard", element: <Deshborad /> },
  { path: "/vendorProduct/:id", element: <VendorProduct /> },
  { path: "/cartPage", element: <CartPage /> },
  {
    path: "/buy/:id",
    element: (
      <Elements stripe={stripePromise}>
        <Buy />
      </Elements>
    ),
  },
  { path: "/purchases", element: <PurchasePage /> },
];

export const vendorRoutes = [
  { path: "/createProduct", element: <CreateProduct /> },
  { path: "/updateProduct/:id", element: <UpdateProduct /> },
  { path: "/readProduct", element: <ReadProduct /> },
  { path: "/GetVendorPurchases", element: <GetPurchaseOfVendor /> },
  { path: "/getAllDelivery", element: <GetAllDelivery /> },
  { path: "/GetDelivery", element: <ApproveDelivery /> },
  { path: "/giveDelivery/:id", element: <GiveDelivery /> },
  { path: "/getVendorAssignDelivery", element: <GetVendorAssign /> },
];

export const deliveryRoutes = [
  { path: "/getDeliveryAssign", element: <GetDeliveryAssign /> },
];
