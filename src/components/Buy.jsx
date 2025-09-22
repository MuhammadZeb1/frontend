import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Buy = () => {
  const { id } = useParams(); // productId from URL
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState(""); // 🆕 address state
  const [phone, setPhone] = useState("");     // 🆕 phone state
  const [loading, setLoading] = useState(false);

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const cardNumber = elements.getElement(CardNumberElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // send paymentMethod.id, amount, address, phone to backend
      const res = await axiosInstance.post("/purchase/purchase", {
        productId: id,
        paymentMethodId: paymentMethod.id,
        amount: Number(amount),
        address,   // 🆕 add
        phone,     // 🆕 add
      });

      toast.success(res.data.message);
      navigate("/purchases");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 border rounded shadow bg-white">
        <h1 className="text-xl font-bold mb-6 text-center">Buy Product</h1>

        <form onSubmit={handleBuy} className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block mb-1 font-medium">Card Number</label>
            <CardNumberElement className="w-full h-10 border rounded p-2" options={{ placeholder: "1234 1234 1234 1234" }} />
          </div>

          {/* Expiry and CVC */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Expiry Date</label>
              <CardExpiryElement className="w-full p-2 border rounded" />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">CVC</label>
              <CardCvcElement className="w-full p-2 border rounded" />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Address 🆕 */}
          <div>
            <label className="block mb-1 font-medium">Delivery Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Phone 🆕 */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Buy;
