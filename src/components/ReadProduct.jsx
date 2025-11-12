import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/readProductSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useConfirmDialog } from "@/components/common/useConfirmDialog"; // ✅ Import hook

function ReadProduct() {
  const { product, isLoading, error, message } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { ConfirmDialog, confirm } = useConfirmDialog(); // ✅ Use hook

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // ✅ Wrapped delete with confirm dialog
  const deleteProduct = async (id) => {
    const ok = await confirm(
      "Delete Product",
      "Are you sure you want to delete this product? This action cannot be undone.",
      "Delete",
      "Cancel"
    );
    if (!ok) return;

    try {
      const res = await axiosInstance.delete(`/product/products/${id}`);
      toast.success(res.data.message);
      dispatch(getProduct());
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (message) toast.success(message);
  }, [message]);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-lg text-blue-700">Loading...</p>
    );
  }

  const filteredProducts = product.filter((p) =>
    p.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-10">
      {/* ✅ Header Row */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold text-blue-800 drop-shadow-sm text-center md:text-left"
        >
          {product.length > 0
            ? `${product[0].vendor?.shopName || "Shop"}`
            : "Our Products"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 w-full md:w-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-full sm:w-80 md:w-96"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <motion.div
              key={p._id}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              className="relative bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                <img
                  src={p.image?.url}
                  alt={p.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {p.category}
                </span>

                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <NavLink
                    to={`/updateProduct/${p._id}`}
                    className="bg-white text-blue-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full text-sm font-semibold shadow"
                  >
                    Update
                  </NavLink>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-white text-red-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full text-sm font-semibold shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-blue-900">
                  {p.productName}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {p.title}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-emerald-600">
                    ${p.price}
                  </span>
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    In Stock: {p.count}
                  </span>
                </div>
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
            No matching products found.
          </motion.p>
        )}
      </motion.div>

      {/* ✅ Reusable confirmation dialog */}
      {ConfirmDialog}
    </div>
  );
}

export default ReadProduct;
