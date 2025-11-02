import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/readProductSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../utils/axiosInstance";
import { NavLink } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import { MdSecurityUpdate } from "react-icons/md";

function ReadProduct() {
  const { product, isLoading, error, message } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  // Fetch products on mount
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // delete product
  const deleteProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`/product/products/${id}`);
      toast.success(res.data.message); // ✅ correct response
      dispatch(getProduct()); // ✅ refresh products after delete
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // Show error in toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Show success message in toast
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Error fallback in UI */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-300 ">
        {product.length > 0 ? (
          product.map((p) => (
    <div
    
  key={p._id}
  className="relative bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group"
>
  {/* Product Image with Hover Buttons */}
  <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
    <img
      src={p.image?.url}
      alt={p.productName}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Category Badge */}
    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
      {p.category}
    </span>

    {/* ✅ Hover Buttons Over Image */}
    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
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

  {/* ✅ Product Details Always Visible */}
  <div className="p-5">
    <h3 className="text-lg font-semibold text-gray-800">{p.productName}</h3>
    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.title}</p>
    <div className="flex justify-between items-center mt-4">
      <span className="text-xl font-bold text-emerald-600">${p.price}</span>
      <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
        In Stock: {p.count}
      </span>
    </div>
  </div>
</div>


          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ReadProduct;
