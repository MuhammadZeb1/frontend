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

  // Handle input fields
  const getFormData = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit form
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent px-4 py-8">
      <motion.form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create Product
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Product Name</label>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg">
              <Package className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={getFormData}
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Title</label>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg">
              <Tag className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="text"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={getFormData}
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          {/* Price */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Price</label>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg">
              <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={getFormData}
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          {/* Category */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Category</label>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg">
              <Layers className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={getFormData}
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          {/* Stock Count */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Stock Count</label>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg">
              <Hash className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="number"
                name="count"
                placeholder="Enter stock count"
                value={formData.count}
                onChange={getFormData}
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          {/* Image */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Product Image</label>
            <div className="flex justify-between items-center border border-gray-300 px-3 py-2 rounded-lg">
              <span className="text-gray-600 flex items-center gap-2">
                <FolderUp /> {formData.image ? formData.image.name : "Upload image"}
              </span>
              <input
                type="file"
                name="image"
                onChange={getFormData}
                id="productImage"
                className="hidden"
              />
              <label
                htmlFor="productImage"
                className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-600 transition"
              >
                Choose
              </label>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          {isLoading ? "Creating..." : "Create Product"}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default CreateProduct;