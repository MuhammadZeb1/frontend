import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // 👈 اپنی axios instance import کریں
import { toast } from "react-toastify";

function UpdateProduct() {
  const { id } = useParams(); // ✅ product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    title: "",
    price: "",
    category: "",
    count: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch product details on mount
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product/products/${id}`);
      const product = res.data.product; // ✅ یہاں پر صحیح object لیں

      setFormData({
        productName: product.productName || "",
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        count: product.count || "",
        image: null,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  fetchProduct();
}, [id]);


  // ✅ Handle input changes
  const getFormData = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axiosInstance.put(`/product/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // ✅ Backend سے message پکڑیں
    toast.success(res.data.message || "✅ Product updated successfully!");
    navigate("/readProduct");

  } catch (error) {
    console.error("Error updating product:", error);

    // ❌ Error toast
    toast.error(
      error.response?.data?.message || "❌ Failed to update product!"
    );

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
            UPDATE PRODUCT
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
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.image === null && (
            <p className="text-sm text-gray-500">Leave empty to keep old image</p>
          )}
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
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
