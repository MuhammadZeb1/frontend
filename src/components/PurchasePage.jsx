import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../features/purchaseSlice";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PurchasePage() {
  const dispatch = useDispatch();
  const { purchase, isLoading, error, message } = useSelector(
    (state) => state.purchase
  );

  console.log("purchase ", purchase);

  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  const handleRemove = async (purchaseId) => {
    try {
      await axiosInstance.delete(`/purchase/customer/${purchaseId}`);
      console.log("jhjhhh")
      dispatch(getPurchase());
      toast.success("Purchase removed!");
    } catch (err) {
      toast.error("Error deleting purchase");
      console.error("Error deleting purchase:", err);
    }
  };

  const grandTotal = purchase.reduce((total, item) => {
    const subtotal =
      Number(item.productId?.price || 0) * Number(item.quantity || 0);
    return total + subtotal;
  }, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10">
      {/* Header with customer name and grand total on the same line */}
<div className="flex justify-between items-center mb-10">
  <motion.h2
    className="text-3xl md:text-4xl font-extrabold text-blue-800 drop-shadow-sm"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {purchase && purchase.length > 0
      ? `${purchase[0].customerId?.name}'s Purchases`
      : "Your Purchases"}
  </motion.h2>

  {purchase.length > 0 && (
    <motion.h3
      className="text-xl font-bold text-blue-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Grand Total: ${grandTotal}
    </motion.h3>
  )}
</div>


      {isLoading && (
        <p className="text-center text-blue-700 text-lg">
          Loading purchases...
        </p>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {purchase && purchase.length > 0 ? (
          purchase.map((item) => {
            const subtotal =
              Number(item.productId?.price || 0) * Number(item.quantity || 0);

            return (
              <motion.div
                key={item._id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white shadow-md rounded-3xl overflow-hidden border border-gray-200 flex flex-col"
              >
                {/* Image with hover Remove button */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-3xl group">
                  <img
                    src={item.productId?.image?.url || "/placeholder.png"}
                    alt={item.productId?.productName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Remove button on hover */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="absolute inset-0 m-auto w-32 h-10 bg-red-500 text-white rounded-lg
                               opacity-0 group-hover:opacity-100 flex justify-center items-center
                               transition-opacity duration-300 shadow"
                  >
                    Remove
                  </button>
                </div>

                <div className="p-5 flex-1">
                  {/* Product info in two columns */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 font-medium">
                    <span className="text-blue-800 font-bold truncate">
                      {item.productId?.productName}
                    </span>
                    <span>Qty: {item.quantity || 1}</span>
                    <span>
                      Vendor: {item.productId?.vendor?.name || "Unknown"}
                    </span>
                    <span className="text-blue-600 font-bold">
                      ${item.productId?.price || 0}
                    </span>
                    <span className="font-bold text-gray-700 col-span-2 text-right">
                      Subtotal: ${subtotal}
                    </span>
                  </div>
                </div>
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
      </motion.div>

      
    </section>
  );
}

export default PurchasePage;
