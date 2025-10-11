import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApproveDelivery } from "../features/GetApproveDeliverySlice";

function ApproveDelivery() {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error } = useSelector((state) => state.delivery);
  console.log("Deliveries:", deliveries);

  useEffect(() => {
    dispatch(getApproveDelivery());
  }, [dispatch]);

  return (
    <div>
      <h2>Approved Deliveries</h2>

      {isLoading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {typeof error === "string"
            ? error
            : error?.message || JSON.stringify(error)}
        </p>
      )}

      <ul>
        {deliveries?.map((delivery) => (
          <li key={delivery._id}>
            {delivery.deliveryId?.name} - {delivery.deliveryId?.email} -{" "}
            {delivery.deliveryId?.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApproveDelivery;
