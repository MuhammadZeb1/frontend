import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendorPurchase } from "../features/GetVendorPurchaseSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "react-toastify"; // ✅ Import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Toast styles

function GetPurchaseOfVendor() {
  const dispatch = useDispatch();
  const { purchase, isLoading, error } = useSelector(
    (state) => state.vendorPurchase
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVendorPurchase());
  }, [dispatch]);

  // Show error toast if any
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // ✅ Handle Mark as Delivered action
  const handleMarkDelivered = (id) => {
    // Here you can dispatch an action to update status in backend
    toast.success("Marked as Delivered!"); // Show success toast
    navigate(`/giveDelivery/${id}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow-sm"
        initial={{ opacity: 0, y: -20 }}
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
        <p className="text-center text-blue-700 text-lg">
          Loading purchases...
        </p>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {purchase && purchase.length > 0 ? (
          purchase.map((item) => {
            const customerPurchase = item.customerPurchaseId;
            const product = customerPurchase?.productId;
            const customer = customerPurchase?.customerId;

            return (
              <motion.div
                key={item._id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="relative bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden group"
              >
                {/* Product Image + Hover Overlay Button */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-3xl flex justify-between items-center">
                  <img
                    src={product?.image?.url || "/placeholder.png"}
                    alt={product?.productName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.button
                    onClick={() => handleMarkDelivered(item._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 m-auto w-40 bg-blue-600 text-white rounded-lg
                     shadow text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex
                      h-10 justify-center items-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Mark as Delivered
                  </motion.button>
                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5 flex flex-col gap-2">
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
                  <div className="text-gray-700 font-medium text-sm mt-2">
                    Amount: ${customerPurchase?.amount}
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

export default GetPurchaseOfVendor;
