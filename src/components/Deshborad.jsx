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

  const filteredVendors = vendors?.filter((v) =>
    v.shopType?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading)
    return (
      <p className="text-center text-lg animate-pulse text-blue-600">
        Loading vendors...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 animate-bounce">{error}</p>;

  return (
    <div className="container mx-auto px-8 py-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          Explore Vendor Shops
        </h2>

        <div className="relative w-72 transform hover:scale-105 transition duration-300">
          <input
            type="text"
            id="search"
            placeholder="Search by shop type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 
                       shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                       hover:shadow-lg transition duration-300"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors?.length > 0 ? (
          filteredVendors.map((v, index) => (
            <div
              key={v._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-2 
                         hover:shadow-2xl transition duration-500 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={v.ImageUrl}
                alt={v.shopName}
                className="h-70 w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="p-5 ">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {v.shopName}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-medium mt-1">
                {v.shopType}
                </p>
                  <p> Owner: {v.name}</p>
                </div>
                <div className="text-gray-600 mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <p>📧 {v.email}</p>
                  <p>📍 {v.address}</p>
                  </div>
                </div>
                <NavLink to={`/vendorProduct/${v._id}`}>
                  <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg
                               hover:bg-blue-700 hover:shadow-lg hover:scale-105
                               transition duration-300 font-medium"
                  >
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
    </div>
  );
}

export default VendorDashboard;
