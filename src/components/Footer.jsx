import React from "react";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { motion } from "framer-motion";
import logo from "../assets/web-logo.png";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Footer() {
  return (
    <motion.footer
      className="flex justify-between flex-wrap gap-20 bg-gradient-to-r from-blue-100 to-blue-50 py-8 px-6 rounded-t-3xl shadow-inner"
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.3 }}
    >
      {/* Brand Section */}
      <motion.div
        className="text-center flex-1"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-full mx-auto" />
          <h1 className="text-xl font-semibold text-blue-900 mt-2">
            MyEcommerce
          </h1>
        </motion.div>

        <p className="text-blue-900 mt-3 font-medium">Follow us</p>
        <div className="flex justify-center gap-5 mt-3 text-2xl">
          <motion.a
            href="https://wa.me/923001234567"
            target="_blank"
            className="text-green-500"
            whileHover={{ scale: 1.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaWhatsapp />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/muhammad-zeb-3a8a032b1"
            target="_blank"
            className="text-blue-900"
            whileHover={{ scale: 1.3, rotate: 10 }}
          >
            <CiLinkedin />
          </motion.a>

          <motion.a
            href="https://github.com/MuhammadZeb1"
            target="_blank"
            className="text-gray-800"
            whileHover={{ scale: 1.3, rotate: -10 }}
          >
            <FaGithub />
          </motion.a>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="text-center flex-1"
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-bold mb-3 text-blue-900 text-lg">Contact</h2>
        <ul className="space-y-1 text-gray-700 font-medium">
          <motion.li whileHover={{ scale: 1.1 }}>GitHub</motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>0332-9610945</motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>WhatsApp</motion.li>
        </ul>
      </motion.div>

      {/* Policy Section */}
      <motion.div
        className="text-center md:text-right flex-1"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-bold mb-3 text-blue-900 text-lg">© 2025</h2>
        <ul className="space-y-1 text-gray-700 font-medium">
          <motion.li whileHover={{ scale: 1.1 }}>
            Terms & Conditions
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>Privacy Policy</motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            Refund & Cancellation
          </motion.li>
        </ul>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
