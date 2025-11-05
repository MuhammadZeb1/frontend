import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryBoyDeliveries } from "../features/getDeliveryBoyDeliveriesSlice.jsx";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetDeliveryAssign() {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error } = useSelector(
    (state) => state.deliveryBoyDeliveries
  );

  useEffect(() => {
    dispatch(getDeliveryBoyDeliveries())
      .unwrap()
      .then(() =>
        toast.success("Deliveries loaded successfully 🚚", {
          position: "top-right",
          autoClose: 2000,
        })
      )
      .catch(() =>
        toast.error("Failed to load deliveries ❌", {
          position: "top-right",
          autoClose: 2500,
        })
      );
  }, [dispatch]);

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10 animate-pulse">
        Loading deliveries...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 animate-bounce">
        Error: {error}
      </p>
    );

  if (!deliveries || deliveries.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        No deliveries assigned yet.
      </p>
    );

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        🚚 My Assigned Deliveries
      </h2>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {deliveries.map((delivery, index) => {
          const vendor = delivery.vendorId || {};
          const purchase = delivery.purchaseId?.customerPurchaseId || {};
          const product = purchase?.productId || {};

          return (
            <motion.div
              key={delivery._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product?.image?.url}
                  alt={product?.title || "Product"}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full ${
                    delivery.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : delivery.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {delivery.status || "Pending"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 text-sm text-gray-700 space-y-2">
                <h3 className="text-lg font-bold text-blue-800 truncate">
                  {product?.title || "Unknown Product"}
                </h3>

                <p className="text-gray-600 font-medium">
                  💰 Price: Rs. {product?.price}
                </p>
                <p className="text-gray-600">
                  🏠 Address:{" "}
                  <span className="font-semibold">
                    {purchase?.address || "N/A"}
                  </span>
                </p>
                <p className="text-gray-600">📞 Phone: {purchase?.phone || "N/A"}</p>

                <div className="border-t border-gray-200 pt-2">
                  <p className="text-gray-600">
                    🧾 Vendor:{" "}
                    <span className="font-semibold text-blue-700">
                      {vendor?.shopName || "Unknown Vendor"}
                    </span>
                  </p>
                  <p className="text-gray-600 truncate">
                    📧 {vendor?.email || "No email"}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <p className="text-xs text-gray-500">
                    🕒{" "}
                    {new Date(delivery.assignedAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      toast.info("Details coming soon! 📦", {
                        position: "bottom-right",
                        autoClose: 2000,
                      })
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default GetDeliveryAssign;
