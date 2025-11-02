import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/GetProductsSlice";
import { motion } from "framer-motion";
import logo from "../assets/web-logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
  console.log(products, "all products from home");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-blue-100 via-white to-blue-50 min-h-screen text-black"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="container mx-auto p-2">
        {/* Header */}
        <motion.header
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center py-3"
        >
          <div className="flex items-center gap-3">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full shadow-md"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            />
            <h1 className="text-2xl font-bold text-blue-800">MyEcommerce</h1>
          </div>
          
        </motion.header>

        {/* Hero Section */}
        <motion.section
          variants={fadeUp}
          transition={{ duration: 1 }}
          className="text-center my-8"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-blue-900"
            whileHover={{ scale: 1.05 }}
          >
            Welcome to MyEcommerce 🛒
          </motion.h1>
          <p className="text-lg md:text-xl mt-3 mb-6 text-gray-700">
            Buy and sell products with ease — your marketplace in one place!
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeIn}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/register?role=customer"
                className="px-6 py-3 border border-blue-800 bg-blue-200 text-blue-900 font-semibold rounded-lg shadow hover:bg-blue-300 transition"
              >
                Become a Customer
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/register?role=vendor"
                className="px-6 py-3 border border-blue-800 bg-blue-200 text-blue-900 font-semibold rounded-lg shadow hover:bg-blue-300 transition"
              >
                Become a Vendor
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/register?role=delivery"
                className="px-6 py-3 border border-blue-800 bg-blue-200 text-blue-900 font-semibold rounded-lg shadow hover:bg-blue-300 transition"
              >
                Become a Delivery
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Products Slider */}
        <motion.section
          className="m-6"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-blue-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured Products
          </motion.h2>

          <Slider {...settings}>
            {products && products.length > 0 ? (
              products.map((item) => (
                <motion.div
                  key={item._id}
                  className="px-3"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    <img
                      className="w-full h-56 object-cover"
                      src={item.image?.url}
                      alt={item.name}
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-blue-900">
                        {item.name}
                      </h3>
                      <motion.button
                        className="mt-3 px-5 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-700 text-center">No products available</p>
            )}
          </Slider>
        </motion.section>

        <motion.hr
          className="border-gray-300 mt-10 mb-6"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
        />

        {/* Footer */}
        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-0"
        >
          <Footer />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
