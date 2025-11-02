import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Tag,
  DollarSign,
  Layers,
  Hash,
  FolderUp,
} from "lucide-react";

function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    title: "",
    price: "",
    category: "",
    image: null,
    count: "",
  });

  const getFormData = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      const res = await axiosInstance.post("/product/createProduct", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      navigate("/readProduct");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation Variants
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
            Create New Product
          </h1>
          <p className="text-gray-600 mt-2">
            Add product details below to showcase your new item.
          </p>
        </motion.div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    {
      label: "Product Name",
      name: "productName",
      placeholder: "Enter product name",
      icon: <Package className="w-5 h-5 text-blue-600" />,
      type: "text",
    },
    {
      label: "Title",
      name: "title",
      placeholder: "Enter product title",
      icon: <Tag className="w-5 h-5 text-blue-600" />,
      type: "text",
    },
    {
      label: "Price",
      name: "price",
      placeholder: "Enter price",
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
      type: "number",
    },
    {
      label: "Category",
      name: "category",
      placeholder: "Enter category",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      type: "text",
    },
  ].map((input, index) => (
    <motion.div
      key={index}
      variants={fadeUp}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col gap-2"
    >
      <label className="font-semibold text-gray-700">{input.label}</label>
      <div className="flex items-center border border-gray-300 px-3 py-2.5 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all bg-white">
        {input.icon}
        <input
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          value={formData[input.name]}
          onChange={getFormData}
          className="w-full pl-2 text-gray-800 outline-none bg-transparent"
        />
      </div>
    </motion.div>
  ))}

  {/* Stock Count */}
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.02 }}
    className="flex flex-col gap-2"
  >
    <label className="font-semibold text-gray-700">Stock Count</label>
    <div className="flex items-center border border-gray-300 px-3 py-2.5 rounded-xl shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-400 transition">
      <Hash className="w-5 h-5 text-blue-600" />
      <input
        type="number"
        name="count"
        placeholder="Enter stock count"
        value={formData.count}
        onChange={getFormData}
        className="w-full pl-2 text-gray-800 outline-none bg-transparent"
      />
    </div>
  </motion.div>

  {/* Product Image */}
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.02 }}
    className="flex flex-col gap-2"
  >
    <label className="font-semibold text-gray-700">Product Image</label>
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
          {isLoading ? "Creating Product..." : "Create Product"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default CreateProduct;
