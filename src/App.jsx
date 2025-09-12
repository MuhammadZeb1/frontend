import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


function App() {
  const { token } = useSelector((state) => state.auth);

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
        {privateRoutes.map(({ path, element }, index) => {
          // Wrap Buy page with Stripe Elements
          if (path === "/buy/:id") {
            return (
              <Route
                key={index}
                path={path}
                element={<Elements stripe={stripePromise}>{element}</Elements>}
              />
            );
          }
          // Other private routes
          return token ? (
            <Route key={index} path={path} element={element} />
          ) : null;
        })}

        {/* Catch-all route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
