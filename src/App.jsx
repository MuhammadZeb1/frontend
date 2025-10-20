import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import VendorRoute from "./components/VendorRoute";
import VendorLayout from "./components/VendorLayout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  const { token } = useSelector((state) => state.auth);
  console.log("token ", token);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      <Routes>
        {/* Public routes */}
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* Private routes */}
        {privateRoutes.map(({ path, element, role }, index) => {
          // ✅ Vendor Protected Routes
          if (role === "vendor") {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <VendorRoute>
                    <VendorLayout>{element}</VendorLayout>
                  </VendorRoute>
                }
              />
            );
          }

          // ✅ Other private routes
          return token ? <Route key={index} path={path} element={element} /> : null;
        })}

        {/* Catch-all route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
