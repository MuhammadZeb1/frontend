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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Vendor Assigned Deliveries</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && deliveries?.length === 0 && (
        <p className="text-gray-500">No deliveries assigned yet.</p>
      )}

      <ul className="space-y-4">
        {deliveries?.map((delivery) => (
          <li
            key={delivery._id}
            className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-1"
          >
            <p><strong>Delivery Boy:</strong> {delivery.deliveryBoyId?.name || "N/A"}</p>
            <p><strong>Email:</strong> {delivery.deliveryBoyId?.email || "N/A"}</p>
            <p><strong>Purchase ID:</strong> {delivery.purchaseId?._id || "N/A"}</p>
            <p><strong>Status:</strong> {delivery.status || "pending"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetVendorAssign;
