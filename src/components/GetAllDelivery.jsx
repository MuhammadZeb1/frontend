import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveries } from "../features/GetAllDeliverySlice";
import axiosInstance from "../utils/axiosInstance";

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

const approved = async (id) => {
  try {
    const res = await axiosInstance.post("/allDelivery/postDelivery", { deliveryId: id });
    alert("Approved successfully ✅");
    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert("Failed to approve ❌");
  }
};


  return (
    <div>
      <h2>All Delivery Users</h2>
      <ul>
        {deliveries && deliveries.length > 0 ? (
          deliveries.map((d) => (
            <li key={d._id} className="mb-4 border p-3 rounded shadow">
              <p><strong>Name:</strong> {d.name}</p>
              <p><strong>Email:</strong> {d.email}</p>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => approved(d._id)}
              >
                Approve
              </button>
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
