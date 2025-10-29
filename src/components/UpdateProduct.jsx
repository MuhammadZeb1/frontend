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

  // Fetch old product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/products/${id}`);
        const product = res.data.product;
        setFormData({
          productName: product.productName,
          title: product.title,
          price: product.price,
          category: product.category,
          count: product.count,
          image: null, // Keep null first, only update if new image is selected
        });
      } catch (error) {
        toast.error("Failed to load product data!");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle inputs
  const getFormData = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit update
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-100 px-4 py-8">
      <motion.form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Update Product</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <InputField icon={<Package />} name="productName" value={formData.productName} onChange={getFormData} placeholder="Enter product name" />

          {/* Title */}
          <InputField icon={<Tag />} name="title" value={formData.title} onChange={getFormData} placeholder="Enter title" />

          {/* Price */}
          <InputField icon={<DollarSign />} type="number" name="price" value={formData.price} onChange={getFormData} placeholder="Enter price" />

          {/* Category */}
          <InputField icon={<Layers />} name="category" value={formData.category} onChange={getFormData} placeholder="Enter category" />

          {/* Stock Count */}
          <InputField icon={<Hash />} type="number" name="count" value={formData.count} onChange={getFormData} placeholder="Enter stock" />

          {/* Image Upload */}
          <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
            <label className="font-medium">Product Image (optional)</label>
            <div className="flex justify-between items-center border border-gray-300 px-3 py-2 rounded-lg">
              <span className="text-gray-600 flex items-center gap-2">
                <FolderUp /> {formData.image ? formData.image.name : "Upload image"}
              </span>
              <input type="file" name="image" onChange={getFormData} id="productImage" className="hidden" />
              <label htmlFor="productImage" className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer">
                Choose
              </label>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </motion.button>
      </motion.form>
    </div>
  );
}

// Reusable input component
const InputField = ({ icon, name, value, onChange, placeholder, type = "text" }) => (
  <motion.div className="flex flex-col gap-1" whileHover={{ scale: 1.02 }}>
    <label className="font-medium capitalize">{name}</label>
    <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg">
      <div className="w-5 h-5 mr-2 text-gray-500">{icon}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none"
      />
    </div>
  </motion.div>
);

export default UpdateProduct;
