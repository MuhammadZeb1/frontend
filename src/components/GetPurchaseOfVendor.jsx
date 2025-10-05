import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendorPurchase } from "../features/GetVendorPurchaseSlice";
import { motion } from "framer-motion";

function GetPurchaseOfVendor() {
  const dispatch = useDispatch();
  const { purchase, isLoading } = useSelector((state) => state.vendorPurchase);

  useEffect(() => {
    dispatch(getVendorPurchase());
  }, [dispatch]);

  return (
    <section className="m-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Vendor Purchases
      </h2>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {purchase && purchase.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center">
          {purchase.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-80 border border-gray-200 hover:shadow-xl transition"
              whileHover={{ scale: 1.03 }}
            >
              {/* Product Image */}
              <img
                className="w-full h-56 object-fit rounded-t-lg"
                src={item.productId?.image?.url || "/placeholder.png"}
                alt={item.productId?.productName}
              />

              <div className="p-4 text-black">
                {/* Product Name */}
                <h2 className="text-2xl font-semibold mb-2 text-center">
                  {item.productId?.productName}
                </h2>

                {/* Customer Info */}
                <div className="bg-gray-100 p-3 rounded mb-3">
                  <p className="text-sm font-medium">
                    Customer: {item.customerId?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {item.customerId?.email}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Address: {item.address}
                  </p>
                  <p className="text-sm font-medium">
                    Phone: {item.phone}
                  </p>
                </div>

                {/* Purchase Info */}
                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-medium">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-700 font-medium">
                    Amount: ${item.amount}
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-black text-center text-lg">No purchases found</p>
      )}
    </section>
  );
}

export default GetPurchaseOfVendor;
