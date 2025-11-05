import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendorPurchase } from "../features/GetVendorPurchaseSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetPurchaseOfVendor() {
  const dispatch = useDispatch();
  const { purchase, isLoading, error } = useSelector(
    (state) => state.vendorPurchase
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVendorPurchase());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // ✅ Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  // ✅ Handle Mark as Delivered
  const handleMarkDelivered = (id) => {
    toast.success("Marked as Delivered!");
    navigate(`/giveDelivery/${id}`);
  };

  // ✅ Handle Remove Purchase
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`/api/purchase/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Purchase removed successfully!");
        dispatch(getVendorPurchase());
      } else {
        toast.error(data.message || "Failed to remove purchase");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10"
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {/* Animated Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {purchase && purchase.length > 0
          ? `${
              purchase[0].vendorId?.shopName ||
              purchase[0].vendorId?.name ||
              "Vendor"
            } Purchases`
          : "Vendor Purchases"}
      </motion.h2>

      {isLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-blue-700 text-lg"
        >
          Loading purchases...
        </motion.p>
      )}

      {/* Card Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[80%] l"
      >
        <AnimatePresence>
          {purchase && purchase.length > 0 ? (
            purchase.map((item) => {
              const customerPurchase = item.customerPurchaseId;
              const product = customerPurchase?.productId;
              const customer = customerPurchase?.customerId;

              return (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
                  }}
                  exit="exit"
                  className="relative bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden group"
                >
                  {/* Product Image + Hover Buttons */}
                  <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
                    <motion.img
                      src={product?.image?.url || "/placeholder.png"}
                      alt={product?.productName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Hover Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex  items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <motion.button
                        onClick={() => handleMarkDelivered(item._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-40 bg-blue-600 text-white rounded-lg shadow text-sm h-10 flex justify-center items-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Mark as Delivered
                      </motion.button>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => handleRemove(item._id)}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#dc2626",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-40 bg-red-600 text-white rounded-lg shadow text-sm h-10 flex justify-center items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </motion.button>
                    </motion.div>

                    {/* Status Badge */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </motion.span>
                  </div>

                  {/* Product Details */}
                  <motion.div
                    className="p-5 flex flex-col gap-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-blue-800 truncate">
                        {product?.productName}
                      </h3>
                      <span className="text-gray-700 font-medium text-sm">
                        Qty: {customerPurchase?.quantity}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-2 bg-blue-50 p-3 rounded-xl shadow-inner text-sm">
                      <p className="font-medium text-gray-700 truncate">
                        👤 {customer?.name}
                      </p>
                      <p className="text-gray-500 truncate">
                        📧 {customer?.email}
                      </p>
                      <p className="text-gray-700 truncate">
                        📍 {customerPurchase?.address}
                      </p>
                      <p className="text-gray-700 truncate">
                        📞 {customerPurchase?.phone}
                      </p>
                    </div>

                    {/* Amount */}
                    <motion.div
                      className="text-gray-700 font-medium text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Amount: ${customerPurchase?.amount}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="col-span-full text-center text-gray-500 text-lg"
            >
              No purchases found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

export default GetPurchaseOfVendor;
