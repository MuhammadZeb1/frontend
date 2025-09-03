import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    productName: "",
    title: "",
    price: "",
    category: "",
    image: null, // file کے لیے null رکھیں
    count: "",
  });

  // handle input
  const getFormData = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] })); // ✅ file
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData(); // ✅ multipart data
      data.append("productName", formData.productName);
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("count", formData.count);
      data.append("image", formData.image);

      const res = await axiosInstance.post("/product/createProduct", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success( res.data.message);

      // reset form
      setFormData({
        productName: "",
        title: "",
        price: "",
        category: "",
        image: null,
        count: "",
      });
      console.log("response:", res.data);
      navigate("/readProduct")
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-96"
      >
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            CREATE PRODUCT
          </h1>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={getFormData} // ✅ file input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Count */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="count">Stock Count</label>
          <input
            type="number"
            id="count"
            name="count"
            value={formData.count}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
