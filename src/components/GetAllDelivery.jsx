import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveries } from "../features/GetAllDeliverySlice";

function GetAllDelivery() {
  const dispatch = useDispatch();

  const { deliveries, isLoading, error } = useSelector(
    (state) => state.allDelivery // store.js key
  );

  useEffect(() => {
    dispatch(getDeliveries());
  }, [dispatch]);

  if (isLoading) return <p>Loading deliveries...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Delivery Users</h2>
      <ul>
        {deliveries && deliveries.length > 0 ? (
          deliveries.map((d) => (
            <li key={d._id}>
              <strong>{d.name}</strong> – {d.email} ({d.address})
            </li>
          ))
        ) : (
          <p>No delivery users found</p>
        )}
      </ul>
    </div>
  );
}

export default GetAllDelivery;
