import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVendorProducts } from "../features/vendorProductsSlice";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Store,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function VendorProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { vendor, products, isLoading, error } = useSelector(
    (state) => state.vendorProduct
  );

  useEffect(() => {
    if (id) dispatch(getVendorProducts(id));
  }, [id, dispatch]);

  const addToCart = async (productId, address) => {
    try {
      const res = await axiosInstance.post("/carts/addToCart", {
        productId,
        quantity: 1,
        address,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.error(
        "❌ Add to cart error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const filteredProducts = products?.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    show: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (isLoading)
    return (
      <motion.p
        className="text-center mt-10 text-lg text-blue-600 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading products...
      </motion.p>
    );

  if (error)
    return (
      <motion.p
        className="text-center mt-10 text-red-500 font-medium animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-6">
      {/* Vendor Header */}
      {vendor && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          {/* Header line */}
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md border border-blue-100 cursor-pointer max-w-8xl mx-auto">
            <div className="flex items-center gap-3">
              <Store className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-800">
                {vendor.shopName}
              </h2>
            </div>

            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer"
            >
              {isDropdownOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </motion.div>
          </div>

          {/* Dropdown info */}
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate={isDropdownOpen ? "show" : "hidden"}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 mt-3 text-gray-600 text-sm sm:text-base">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {vendor.shopType}
              </span>
              <span>
                👤 <strong>{vendor.name}</strong>
              </span>
              <span>📧 {vendor.email}</span>
              <span>📍 {vendor.address}</span>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div
            variants={searchBarVariants}
            initial="hidden"
            animate="show"
            className="flex justify-center mt-4"
          >
            <div className="relative w-full ">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-11 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              />
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-8xl mx-auto"
      >
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((p) => (
            <motion.div
              key={p._id}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-blue-100"
            >
              <div className="relative w-full h-56 overflow-hidden group">
                <motion.img
                  src={p.image?.url}
                  alt={p.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {p.category}
                </span>

                <button
                  onClick={() => addToCart(p._id, vendor.address)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition">
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </span>
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.productName}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {p.title}
                </p>
                <p className="text-blue-700 font-bold text-lg mt-3">
                  ${p.price}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-full text-center text-gray-500 text-lg"
          >
            No products found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default VendorProduct;
