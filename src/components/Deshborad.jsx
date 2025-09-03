import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendor } from "../features/deshboardSlice";
import { NavLink } from "react-router-dom";

function VendorDashboard() {
  const dispatch = useDispatch();
  const { vendors, isLoading, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(getVendor());
  }, [dispatch]);

  if (isLoading) return <p>Loading vendors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {vendors?.length > 0 ? (
        vendors.map((v) => (
          <div
            key={v._id}
            className="bg-white p-4 shadow rounded-2xl hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-900">{v.shopName}</h3>
            <p className="text-gray-700">Shop Type: {v.shopType}</p>
            <p className="text-sm text-gray-500">Owner: {v.name}</p>
            <p className="text-sm text-gray-500">Email: {v.email}</p>
            <p className="text-sm text-gray-500">Address: {v.address}</p>

            <div className="mt-4">
              <NavLink to={`/vendorProduct/${v._id}`}>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Visit Shop
                </button>
              </NavLink>
            </div>
          </div>
        ))
      ) : (
        <p>No vendors found</p>
      )}
    </div>
  );
}

export default VendorDashboard;
