import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

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
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between bg-white shadow p-4 rounded-xl"
            >
              <div>
                <h3 className="font-semibold">{item.productId.productName}</h3>
                <p className="text-gray-600">Price: ${item.productId.price}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p className="font-bold">
                  Subtotal: ${item.productId.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ✅ Total Price */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
