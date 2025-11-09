import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApproveDelivery } from "../features/GetApproveDeliverySlice";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { Search, CheckCircle, Truck } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ApproveDelivery() {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error } = useSelector((state) => state.delivery);
  const { id: purchaseId } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getApproveDelivery());
  }, [dispatch]);

  const handleAssign = async (deliveryUserId) => {
    try {
      await axiosInstance.post("/deliveryAssignment/assign", {
        deliveryBoyId: deliveryUserId,
        purchaseId,
      });
      toast.success("✅ Delivery assigned successfully!");
    } catch (err) {
      console.error("Error assigning delivery:", err);
      toast.error("❌ Failed to assign delivery");
    }
  };

  const handleDelete = async (deliveryBoyId) => {
    if (!window.confirm("Are you sure you want to delete this delivery boy?")) return;

    try {
      await axiosInstance.delete(`/allDelivery/approved-delivery/${deliveryBoyId}`);
      toast.success("✅ Delivery boy removed successfully!");
      dispatch(getApproveDelivery()); // Refresh after deletion
    } catch (err) {
      console.error("Error deleting delivery boy:", err);
      toast.error("❌ Failed to delete delivery boy");
    }
  };

  const filteredDeliveries = deliveries?.filter((d) =>
    d.deliveryId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const cardVariants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  if (isLoading)
    return <p className="text-center text-lg animate-pulse text-blue-600">Loading approved deliveries...</p>;

  if (error)
    return <p className="text-center text-red-500 animate-bounce">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-10">
      <ToastContainer autoClose={3000} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 mx-auto">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 drop-shadow-sm text-center md:text-left flex items-center gap-2">
          <Truck className="text-blue-600 w-8 h-8" /> Approved Delivery Boys
        </motion.h2>

        {/* Search */}
        <motion.div className="relative w-full sm:w-80 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search delivery boy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
          />
        </motion.div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDeliveries && filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery) => {
            const d = delivery.deliveryId || {};
            return (
              <motion.div key={delivery._id} variants={cardVariants} whileHover={{ scale: 1.04 }} className="relative bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden rounded-t-3xl group">
                  <img
                    src={d.ImageUrl || "/placeholder.png"}
                    alt={d.name || "Delivery Boy"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">Approved</span>

                  {/* Hover buttons */}
                  <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 bg-black/40 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => handleAssign(d._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 font-medium">
                      <CheckCircle className="w-5 h-5" /> Assign Delivery
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(delivery._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 font-medium">
                      Remove
                    </motion.button>
                  </motion.div>
                </div>

                {/* Info */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-5">
                  <div className="mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <h3 className="text-lg font-bold text-blue-900">{d.name || "Unknown"}</h3>
                    <p className="text-sm text-gray-600 mt-1 sm:mt-0 break-all">📧 {d.email || "N/A"}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <p className="text-sm text-gray-600">🆔 CNIC: {d.cnicNumber || "N/A"}</p>
                    <p className="text-sm text-gray-600 break-words">📍 {d.address || "N/A"}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="col-span-full text-center text-gray-500 text-lg">
            No approved deliveries found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default ApproveDelivery;
