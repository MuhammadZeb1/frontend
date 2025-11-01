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
import Footer from "./Footer";


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
       {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 }, // tablet پر 2 show کرو
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 }, // mobile landscape
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 }, // small mobiles
    },
    ],
  };

  return (
    <div className="bg-transparent min-h-screen text-white">
      <div className="container mx-auto p-2">
        {/* Header */}
        <header className="flex justify-between items-center ">
          <div className="flex justify-between md:flexitems-center gap-3 ">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-xl font-semibold">MyEcommerce</h1>
          </div>
          <button>logout</button>
        </header> 

        {/* Hero */}
        <section className="text-center m-1">
          <h1 className="text-4xl font-bold text-black">Welcome to MyEcommerce 🛒</h1>
          <p className="text-lg m-4 mx-auto text-black">
            Buy and sell products with ease – your marketplace in one place!
          </p>
          <div className="flex flex-wrap md:flex gap-3 justify-center">
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
        <div key={item._id} className="px-3"> {/* Slide padding */}
          <motion.div
            className="bg-gray-200 rounded-lg shadow-lg overflow-hidden block w-80 "
            whileHover={{ scale: 1.05 }}
          >
            <img
              className=" w-[100%] object-cover h-70 rounded-t-lg"
              src={item.image?.url}
              alt={item.name}
            />
            <h2 className="text-xl font-semibold text-center mt-4 text-white">
              {item.name}
            </h2>
            <div className="flex justify-center mb-0.5">
              <motion.button
                className="px-4 py-2 bg-transparent text-blue-600 font-semibold rounded hover:bg-gray-100 hover:text-blue-800 transition"
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
</section >


        <hr className="border-gray-600 mb-6" />
       <div className="mb-0">
        <Footer />
       </div>
     </div>
    </div>
  );
}

export default Home;
