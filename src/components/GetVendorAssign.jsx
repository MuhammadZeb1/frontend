import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorDeliveries } from "../features/getVendorAssignSlice.jsx";

function GetVendorAssign() {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error } = useSelector(
    (state) => state.vendorDeliveries
  );

  useEffect(() => {
    dispatch(getVendorDeliveries());
  }, [dispatch]);

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error: {error}</p>
    );

  if (!deliveries || deliveries.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        No deliveries assigned yet.
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        🚚 Vendor Assigned Deliveries
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((delivery) => {
          // ✅ Correct access
          const product = delivery?.purchaseId?.productId || {};
          const customer = delivery?.purchaseId?.customerId || {};
          const deliveryBoy = delivery?.deliveryBoyId || {};

          return (
            <div
              key={delivery._id}
              className="bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={
                    product?.image?.url ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={product?.title || "Product"}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full ${
                    delivery.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : delivery.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {delivery.status?.toUpperCase() || "PENDING"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 text-sm text-gray-700 space-y-2">
                <h3 className="text-lg font-bold text-blue-800 truncate">
                  {product?.title || "Unknown Product"}
                </h3>
                <p className="text-gray-600 font-medium">
                  💰 <span className="font-semibold">Price:</span> Rs.{" "}
                  {product?.price || "N/A"}
                </p>

                <div className="border-t border-gray-200 my-2"></div>

                <p className="text-gray-600">
                  👤 <span className="font-semibold">Delivery Boy:</span>{" "}
                  {deliveryBoy?.name || "Not Assigned"}
                </p>
                <p className="text-gray-600">
                  📧 {deliveryBoy?.email || "No email available"}
                </p>

                <div className="border-t border-gray-200 my-2"></div>

                <p className="text-gray-600 truncate">
                  🏠 <span className="font-semibold">Address:</span>{" "}
                  {customer?.address || "No address provided"}
                </p>
                <p className="text-gray-600">
                  📞 {customer?.phone || "No phone number"}
                </p>

                <div className="flex justify-between items-center pt-3">
                  <p className="text-xs text-gray-500">
                    🕒{" "}
                    {delivery.assignedAt
                      ? new Date(delivery.assignedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "No date"}
                  </p>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetVendorAssign;
