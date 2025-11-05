import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { CreditCard, MapPin, Phone } from "lucide-react";

const Buy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [productPrice, setProductPrice] = useState(0);

  // Fetch product price automatically
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const res = await axiosInstance.get(`/product/products/${id}`);
  //       setProductPrice(res.data.product.price);
  //       console.log("Fetched product price:", res.data.product.price);
        

  //     } catch (err) {
  //       toast.error("Failed to fetch product price");
  //     }
  //   };
  //   fetchProduct();
  // }, [id]);
  useEffect(() => {
  const fetchCartProduct = async () => {
    try {
      const res = await axiosInstance.get("/carts/getCarts");
      const item = res.data.cartItems.find((i) => i.productId._id === id);

      if (!item) {
        toast.error("Product not found in cart");
        return;
      }

      setProductPrice(item.productId.price * item.quantity); // subtotal
      setAddress(item.address); // optional
      console.log("Cart subtotal:", item.productId.price * item.quantity);
    } catch (err) {
      toast.error("Failed to fetch product from cart");
      console.error(err);
    }
  };
  fetchCartProduct();
}, [id]);


  console.log(productPrice)

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

      const res = await axiosInstance.post("/purchase/purchase", {
        productId: id,
        paymentMethodId: paymentMethod.id,
        amount: productPrice, // ✅ Auto price
        address,
        phone,
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="flex justify-center items-center min-h-screen mt-0 bg-gradient-to-br
       from-blue-100 via-white to-blue-200 px-9 py-10"
    >
      <motion.form
        onSubmit={handleBuy}
        className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-blue-800 drop-shadow-sm">
            Buy Product
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your card details and delivery info.
          </p>
          <p className="text-gray-700 mt-2 font-medium">
            Amount: ${productPrice} {/* ✅ Display auto price */}
          </p>
        </motion.div>

        {/* Card Number */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-2 mb-4"
        >
          <label className="font-semibold text-gray-700">Card Number</label>
          <div className="flex items-center border border-gray-300 px-3 py-2.5 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all bg-white">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <CardNumberElement className="w-full pl-2 text-gray-800 outline-none bg-transparent" />
          </div>
        </motion.div>

        {/* Expiry + CVC */}
        <div className="flex gap-2 mb-4">
          <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="flex-1 flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Expiry Date</label>
            <CardExpiryElement className="w-full p-2 border rounded-xl bg-white" />
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="flex-1 flex flex-col gap-2">
            <label className="font-semibold text-gray-700">CVC</label>
            <CardCvcElement className="w-full p-2 border rounded-xl bg-white" />
          </motion.div>
        </div>

        {/* Address */}
        <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="flex flex-col gap-2 mb-4">
          <label className="font-semibold text-gray-700">Delivery Address</label>
          <div className="flex items-center border border-gray-300 px-3 py-2.5 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all bg-white">
            <MapPin className="w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-2 text-gray-800 outline-none bg-transparent"
              required
            />
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="flex flex-col gap-2 mb-6">
          <label className="font-semibold text-gray-700">Phone Number</label>
          <div className="flex items-center border border-gray-300 px-3 py-2.5 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all bg-white">
            <Phone className="w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-2 text-gray-800 outline-none bg-transparent"
              required
            />
          </div>
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading || !stripe}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Buy;
