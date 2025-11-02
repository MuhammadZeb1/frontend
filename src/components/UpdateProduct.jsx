import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Tag, DollarSign, Layers, Hash, FolderUp } from "lucide-react";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    title: "",
    price: "",
    category: "",
    image: null,
    count: "",
  });

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/products/${id}`);
        const product = res.data.product;
        setFormData({
          productName: product.productName || "",
          title: product.title || "",
          price: product.price || "",
          category: product.category || "",
          count: product.count || "",
          image: null,
        });
      } catch (error) {
        toast.error("Failed to load product data!");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form inputs
  const getFormData = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      await axiosInstance.put(`/product/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully!");
      navigate("/readProduct");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product!");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ staggerChildren: 0.2 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-10"
    >
      <motion.form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-2xl p-8 w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm">
            Update Product
          </h1>
          <p className="text-gray-600 mt-2">
            Edit the product details below to update your listing.
          </p>
        </motion.div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Product Name"
            icon={<Package className="text-blue-600" />}
            name="productName"
            value={formData.productName}
            onChange={getFormData}
            placeholder="Enter product name"
          />
          <InputField
            label="Title"
            icon={<Tag className="text-blue-600" />}
            name="title"
            value={formData.title}
            onChange={getFormData}
            placeholder="Enter title"
          />
          <InputField
            label="Price"
            type="number"
            icon={<DollarSign className="text-blue-600" />}
            name="price"
            value={formData.price}
            onChange={getFormData}
            placeholder="Enter price"
          />
          <InputField
            label="Category"
            icon={<Layers className="text-blue-600" />}
            name="category"
            value={formData.category}
            onChange={getFormData}
            placeholder="Enter category"
          />

          {/* Stock Count & Image side by side */}
          <InputField
            label="Stock Count"
            type="number"
            icon={<Hash className="text-blue-600" />}
            name="count"
            value={formData.count}
            onChange={getFormData}
            placeholder="Enter stock count"
          />

          {/* Image Upload */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col gap-2"
          >
            <label className="font-semibold text-gray-700">Product Image (optional)</label>
            <div className="flex justify-between items-center border border-gray-300 px-4 py-2.5 rounded-xl bg-white shadow-sm">
              <span className="text-gray-700 flex items-center gap-2">
                <FolderUp className="text-blue-600" />
                {formData.image ? (
                  <span className="font-medium text-gray-800">
                    {formData.image.name}
                  </span>
                ) : (
                  "No file selected"
                )}
              </span>
              <div>
                <input
                  type="file"
                  name="image"
                  onChange={getFormData}
                  id="productImage"
                  className="hidden"
                />
                <label
                  htmlFor="productImage"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                >
                  Choose
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-8 w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Updating Product..." : "Update Product"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

// Reusable input field
const InputField = ({ label, icon, name, value, onChange, placeholder, type = "text" }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">{label}</label>
    <div className="flex items-center border border-gray-300 px-3 py-2.5 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all bg-white">
      {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-2 text-gray-800 outline-none bg-transparent"
      />
    </div>
  </motion.div>
);

export default UpdateProduct;
