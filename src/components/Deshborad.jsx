import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVendor } from "../features/deshboardSlice";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Store } from "lucide-react";

function VendorDashboard() {
  const dispatch = useDispatch();
  const { vendors, isLoading, error } = useSelector((state) => state.vendors);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Example categories (customize as you wish)
  const categories = ["All", "grocery", "electronics", "clothing", "pharmacy", "other"];

  useEffect(() => {
    dispatch(getVendor());
  }, [dispatch]);

  // ✅ Extract unique shop types for dropdown
  const shopTypes = ["All", ...new Set(vendors?.map((v) => v.shopType) || [])];

  // ✅ Filter vendors by search + type
  const filteredVendors = vendors?.filter((v) => {
    const matchSearch = v.shopName?.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "All" || v.shopType === selectedType;
    const matchCategory = selectedCategory === "All" || v.shopType === selectedCategory;
    return matchSearch && matchType && matchCategory;
  });

  if (isLoading)
    return <p className="text-center text-lg animate-pulse text-blue-600">Loading vendors...</p>;

  if (error)
    return <p className="text-center text-red-500 animate-bounce">{error}</p>;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-10">
      {/* ✅ Header with title + search/filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 mx-auto"
      >
        {/* Left: Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold text-blue-800 drop-shadow-sm text-center md:text-left flex items-center gap-2"
        >
          <Store className="text-blue-600 w-8 h-8" /> Explore Vendor Shops
        </motion.h2>

        {/* ✅ Right: Search + Filter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto"
        >
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by shop name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Filter by Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-blue-200 rounded-xl shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>

      {/* ✅ Vendors Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredVendors?.length > 0 ? (
          filteredVendors.map((v) => (
            <motion.div
              key={v._id}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              className="relative bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group"
            >
              {/* Vendor Image */}
              <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                <img
                  src={v.ImageUrl}
                  alt={v.shopName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {v.shopType}
                </span>
              </div>

              {/* Vendor Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-blue-900">{v.shopName}</h3>
                <p className="text-sm text-gray-600 mt-1">Owner: {v.name}</p>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <span>📧 {v.email}</span>
                  <span>📍 {v.address}</span>
                </div>
                <NavLink to={`/vendorProduct/${v._id}`}>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition duration-300 font-medium">
                    Visit Shop
                  </button>
                </NavLink>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="col-span-full text-center text-gray-500 text-lg"
          >
            No vendors found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default VendorDashboard;
