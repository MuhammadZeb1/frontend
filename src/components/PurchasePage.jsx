import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../features/purchaseSlice";
import axiosInstance from "../utils/axiosInstance";

function PurchasePage() {
  const dispatch = useDispatch();
  const { purchase, isLoading, error, message } = useSelector(
    (state) => state.purchase
  );

  console.log("Purchase data from Redux:", purchase);

  // Fetch purchases on mount
  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

  // ✅ Remove a purchase
  const handleRemove = async (purchaseId) => {
    try {
      await axiosInstance.delete(`/purchase/purchase/${purchaseId}`);
      dispatch(getPurchase()); // Refresh purchases after delete
    } catch (err) {
      console.error("Error deleting purchase:", err);
    }
  };

  // Calculate grand total
  const grandTotal = purchase.reduce((total, item) => {
    const subtotal =
      Number(item.productId?.price || 0) * Number(item.quantity || 0);
    return total + subtotal;
  }, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">🛍️ Your Purchases</h2>
        {message && <p className="text-green-600 font-semibold">{message}</p>}
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading purchases...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : purchase.length === 0 ? (
        <p className="text-gray-500">You have no purchases yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchase.map((item) => {
              const subtotal =
                Number(item.productId?.price || 0) *
                Number(item.quantity || 0);

              return (
                <div
                  key={item._id}
                  className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition flex flex-col"
                >
                  <img
                    src={item.productId.image?.url}
                    alt={item.productId.productName}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold">
                    {item.productId.productName}
                  </h3>
                  <p className="text-gray-600">Qty: {item.quantity || 1}</p>
                  <p className="text-gray-600">Vendor: {item.userId?.name}</p>
                  <p className="text-blue-600 font-bold mt-1">
                    ${item.productId.price || 0}
                  </p>
                  <p className="font-bold text-gray-700 mt-1">
                    Subtotal: ${subtotal}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Grand Total */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Grand Total: ${grandTotal}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default PurchasePage;
