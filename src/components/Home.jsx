import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/readProductSlice";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { motion } from "framer-motion";
import logo from "../assets/web-logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProducts } from "../features/GetProductsSlice";


function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
  console.log(products,"all products from home");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-300 min-h-screen text-white">
      <div className="container mx-auto p-2">
        {/* Header */}
        <header className="flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-xl font-semibold">MyEcommerce</h1>
          </div>
        </header>

        {/* Hero */}
        <section className="text-center m-1">
          <h1 className="text-4xl font-bold text-black">Welcome to MyEcommerce 🛒</h1>
          <p className="text-lg m-4 mx-auto text-black">
            Buy and sell products with ease – your marketplace in one place!
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/register?role=customer"
              className="px-6 py-3 border border-blue-950 bg-blue-300 text-blue-900 font-semibold rounded hover:bg-gray-100 hover:text-blue-800 transition"
            >
              Become a Customer
            </Link>
            <Link
              to="/register?role=vendor"
              className="px-6 py-3 border border-blue-950 bg-blue-300 text-blue-900 font-semibold rounded hover:bg-gray-100 hover:text-blue-800 transition"
            >
              Become a Vendor
            </Link>
            <Link
              to="/register?role=delivery"
              className="px-6 py-3 border border-blue-950 bg-blue-300 text-blue-900 font-semibold rounded hover:bg-gray-100 hover:text-blue-800 transition"
            >
              Become a Delivery
            </Link>
          </div>
        </section>

        {/* Products Slider */}
     {/* Products Slider */}
<section className="m-4">
  <Slider {...settings}>
    {products && products.length > 0 ? (
      products.map((item) => (
        <div key={item._id} className="px-2"> {/* Slide padding */}
          <motion.div
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden block"
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="h-40 w-full object-contain rounded-t-lg"
              src={item.image?.url}
              alt={item.name}
            />
            <h2 className="text-xl font-semibold text-center mt-4 text-white">
              {item.name}
            </h2>
            <div className="flex justify-center mt-3 mb-6">
              <motion.button
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 hover:text-blue-800 transition"
                whileHover={{ scale: 1.1 }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      ))
    ) : (
      <p className="text-black text-center">No products available</p>
    )}
  </Slider>
</section>


        <hr className="border-gray-600 mb-6" />

        {/* Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 ">
              <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-lg text-blue-900">MyEcommerce</h1>
            </div>
            <p className="text-blue-900">Follow us</p>
            <div className="flex gap-4 mt-2 text-xl">
              <a href="https://wa.me/923001234567" target="_blank" className="text-green-500">
                <FaWhatsapp />
              </a>
              <a href="https://linkedin.com/in/muhammad-zeb-3a8a032b1" target="_blank" className="text-blue-900">
                <CiLinkedin />
              </a>
              <a href="https://github.com/MuhammadZeb1" target="_blank" className="text-white">
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="text-center">
            <h2 className="font-semibold mb-2 text-blue-900">Contact</h2>
            <ul className="space-y-1 text-gray-900">
              <li>GitHub</li>
              <li>0332-9610945</li>
              <li>WhatsApp</li>
            </ul>
          </div>
          <div className="text-right">
            <h2 className="font-semibold mb-2 text-blue-900">© 2025</h2>
            <ul className="space-y-1 text-gray-900">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund & Cancellation</li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
