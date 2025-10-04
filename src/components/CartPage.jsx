import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Fetch Cart Items
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/carts/getCarts");
      setCartItems(res.data.cartItems);
      setTotalPrice(res.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Remove Item
  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete(`/carts/removeCart/${productId}`);
      fetchCart(); // refresh cart after remove
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <>
        <div className="flex justify-between ">
          <h2 className="text-2xl font-bold  ">🛒 Your Cart</h2>

          <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
        </div>
      </>

      {cartItems.length === 0 ? (
        <>
          <p className="text-gray-500">Your cart is empty</p>
        </>
      ) : (
        <>
          {/* ✅ Grid Layout (VendorProduct style) */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={item.productId.image?.url}
                  alt={item.productId.productName}
                  className="w-full h-40 object-fit rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">
                  {item.productId.productName}
                </h3>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p className="text-gray-600">Vendor: {item.address}</p>
                <p className="text-blue-600 font-bold mt-1">
                  ${item.productId.price}
                </p>
                <p className="font-bold text-gray-700 mt-1">
                  Subtotal: ${item.productId.price * item.quantity}
                </p>

                <div className="flex gap-2 justify-between">
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>

                  <Link
                    to={`/buy/${item.productId._id}`}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Total Price */}
          {/* <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
          </div> */}
        </>
      )}
    </div>
  );
}

export default CartPage;
