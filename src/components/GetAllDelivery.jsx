import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveries } from "../features/GetAllDeliverySlice";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { Search, Truck, CheckCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetAllDelivery() {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error } = useSelector(
    (state) => state.allDelivery
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getDeliveries());
  }, [dispatch]);

  const approved = async (id) => {
    try {
      const res = await axiosInstance.post("/allDelivery/postDelivery", {
        deliveryId: id,
      });
      toast.success("Approved successfully ✅");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve ❌", { position: "top-center" });
    }
  };

  const filteredDeliveries = deliveries?.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (isLoading)
    return (
      <p className="text-center text-lg animate-pulse text-blue-600">
        Loading deliveries...
      </p>
    );

  if (error)
    return <p className="text-center text-red-500 animate-bounce">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-10">
      <ToastContainer autoClose={3000} />
      {/* ✅ Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold text-blue-800 drop-shadow-sm text-center md:text-left flex items-center gap-2"
        >
          <Truck className="text-blue-600 w-8 h-8" /> Manage Delivery Users
        </motion.h2>

        {/* ✅ Search Bar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full sm:w-80 md:w-96"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search delivery user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
          />
        </motion.div>
      </motion.div>

      {/* ✅ Delivery Users Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredDeliveries && filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((d) => (
            <motion.div
              key={d._id}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              className="relative bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group"
            >
              {/* ✅ Delivery User Image */}
              <div className="relative w-full h-56 overflow-hidden rounded-t-3xl group">
                <img
                  src={d.ImageUrl}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {d.role}
                </span>

                {/* ✅ Hover Overlay Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => approved(d._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 font-medium"
                  >
                    <CheckCircle className="w-5 h-5" /> Approve Delivery
                  </motion.button>
                </motion.div>
              </div>

              {/* ✅ Delivery Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-5"
              >
                {/* ✅ Name & Email Row */}
                <div className="mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <h3 className="text-lg font-bold text-blue-900">{d.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 sm:mt-0 break-all">
                    📧 {d.email}
                  </p>
                </div>

                {/* ✅ CNIC & Address Row */}
                <div className="mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <p className="text-sm text-gray-600">
                    🆔 CNIC: {d.cnicNumber}
                  </p>
                  <p className="text-sm text-gray-600 break-words">
                    📍 {d.address}
                  </p>
                </div>

                {/* ✅ Approve Button
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => approved(d._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300 font-medium flex justify-center items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> Approve Delivery
                </motion.button> */}
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="col-span-full text-center text-gray-500 text-lg"
          >
            No delivery users found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default GetAllDelivery;
