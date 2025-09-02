import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/readProductSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {product.length > 0 ? (
          product.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition hover:scale-103"
            >
              <img
                src={p.image.url}
                alt={p.productName}
                className="w-full h-50 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{p.productName}</h3>
              <p className="text-gray-600">{p.title}</p>
              <p className="text-blue-600 font-bold mt-2">${p.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                Category: {p.category}
              </p>
              <div className="mt-2 p-4">
                <div className="flex gap-4 justify-between">

                  <NavLink to={`/updateProduct/${p._id}`}>
                    <button className="text-green-900 text-3xl">
                    <MdSecurityUpdate />
                  </button>
                    </NavLink>             
                  <button
                    onClick={() => deleteProduct(p._id)} // ✅ delete only here
                    className="text-red-900 text-3xl"
                  >
                    <RiDeleteBin6Line />
                  </button>
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
