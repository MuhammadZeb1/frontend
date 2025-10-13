import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApproveDelivery } from "../features/GetApproveDeliverySlice";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function ApproveDelivery() {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error } = useSelector(
    (state) => state.delivery
  );

  const { id: purchaseId } = useParams(); // ✅ purchaseId from URL
  console.log("Purchase ID:", purchaseId);

  useEffect(() => {
    dispatch(getApproveDelivery());
  }, [dispatch]);

  // ✅ Handle assign delivery POST
  const handlePost = async (deliveryBoyId) => {
    try {
      console.log("Assigning:", { deliveryBoyId, purchaseId });

      const res = await axiosInstance.post("/deliveryAssignment/assign", {
        deliveryBoyId,
        purchaseId, // ✅ vendorId token سے آئے گا (backend خود لے گا)
      });

      alert("✅ Delivery assigned successfully!");
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error assigning delivery:", error);
      alert("❌ Failed to assign delivery");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Approved Deliveries</h2>

      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          {typeof error === "string"
            ? error
            : error?.message || JSON.stringify(error)}
        </p>
      )}

      <ul className="space-y-4">
        {deliveries?.map((delivery) => (
          <li
            key={delivery._id}
            className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
          >
            <div>
              <p>
                <strong>{delivery.deliveryId?.name}</strong> —{" "}
                {delivery.deliveryId?.email}
              </p>
              <p>{delivery.deliveryId?.address}</p>
            </div>

            <button
              onClick={() => handlePost(delivery.deliveryId._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Assign
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApproveDelivery;
