import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch Cart Items
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/carts/getCarts");
      setCartItems(res.data.cartItems);
      setTotalPrice(res.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Remove Item
  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete(`/carts/removeCart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between mb-6"
      >
        <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          Total: ${totalPrice}
        </motion.h3>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your cart is empty
        </motion.p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {cartItems.map((item) => (
            <motion.div
              key={item.productId._id}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-blue-100"
            >
              {/* Image with overlay buttons */}
              <div className="relative w-full h-56 overflow-hidden group">
                <motion.img
                  src={item.productId.image?.url}
                  alt={item.productId.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {item.productId.category || "Category"}
                </span>

                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.button
                    onClick={() => removeFromCart(item.productId._id)}
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-red-600 transition"
                  >
                    Remove
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to={`/buy/${item.productId._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-blue-600 transition"
                    >
                      <ShoppingCart className="w-5 h-5" /> Buy
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.productId.productName}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  Qty: {item.quantity} | Vendor: {item.address}
                </p>
                <p className="text-blue-700 font-bold text-lg mt-3">
                  ${item.productId.price}
                </p>
                <p className="font-bold text-gray-700 mt-1">
                  Subtotal: ${item.productId.price * item.quantity}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default CartPage;
