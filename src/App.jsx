import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "./components/Header";

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
        {token &&
          privateRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}

        {/* Catch-all route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
