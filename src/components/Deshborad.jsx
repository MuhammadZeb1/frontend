import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVendor } from "../features/deshboardSlice";
import { NavLink } from "react-router-dom";

function VendorDashboard() {
  const dispatch = useDispatch();
  const { vendors, isLoading, error } = useSelector((state) => state.vendors);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getVendor());
  }, [dispatch]);

  // Filter vendors by shopType based on search input
  const filteredVendors = vendors?.filter((v) =>
    v.shopType.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading vendors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Search input */}
      <div className="flex justify-end px-6 my-2">
        <div className="relative w-64">
          <input
            type="text"
            id="search"
            placeholder="Search by shop type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <label
            htmlFor="search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          >
            🔍
          </label>
        </div>
      </div>

      {/* Vendors grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {filteredVendors?.length > 0 ? (
          filteredVendors.map((v) => (
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
          <p className="col-span-full text-center text-gray-500">
            No vendors found
          </p>
        )}
      </div>
    </>
  );
}

export default VendorDashboard;
