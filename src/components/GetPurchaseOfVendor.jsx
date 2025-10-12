import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendorPurchase } from "../features/GetVendorPurchaseSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function GetPurchaseOfVendor() {
  const dispatch = useDispatch();
  const { purchase, isLoading } = useSelector((state) => state.vendorPurchase);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVendorPurchase());
  }, [dispatch]);

  const handleDelivery = (purchaseId) => {
    // Logic to handle delivery action
    console.log("Initiate delivery for purchase ID:", purchaseId);
    // You can navigate to a delivery page or open a modal here
  }

  return (
    <section className="m-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Vendor Purchases
      </h2>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {purchase && purchase.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center">
          {purchase.map((item) => {
            const customerPurchase = item.customerPurchaseId;
            const product = customerPurchase?.productId;
            const customer = customerPurchase?.customerId;

            return (
              <motion.div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden w-80 border border-gray-200 hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                {/* Product Image */}
                <img
                  className="w-full h-56 object-cover rounded-t-lg"
                  src={product?.image?.url || "/placeholder.png"}
                  alt={product?.productName}
                />

                <div className="p-4 text-black">
                  {/* Product Name */}
                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    {product?.productName}
                  </h2>

                  {/* Customer Info */}
                  <div className="bg-gray-100 p-3 rounded mb-3">
                    <p className="text-sm font-medium">
                      Customer: {customer?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {customer?.email}
                    </p>
                    <p className="text-sm font-medium mt-2">
                      Address: {customerPurchase?.address}
                    </p>
                    <p className="text-sm font-medium">
                      Phone: {customerPurchase?.phone}
                    </p>
                  </div>

                  {/* Purchase Info */}
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-700 font-medium">
                      Quantity: {customerPurchase?.quantity}
                    </p>
                    <p className="text-gray-700 font-medium">
                      Amount: ${customerPurchase?.amount}
                    </p>
                  </div>

                  {/* Status */}
                  <p className="text-center mt-3 font-semibold text-blue-600 flex justify-between items-center">
                    Status: {item.status}
                <button onClick={() => navigate(`/giveDelivery/${item._id}`)}>delivery</button>

                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-black text-center text-lg">No purchases found</p>
      )}
    </section>
  );
}

export default GetPurchaseOfVendor;
