import { useState } from "react";
import axios from "axios";
import "./Payment.css"; // Import the CSS file

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!amount || !email) {
      setMessage("Please enter email and amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/pay", {
        amount,
        email,
      });

      window.location.href = response.data.checkout_url; // Redirect to Stripe
    } catch (error) {
      setMessage("Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Make a Payment</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="payment-input"
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="payment-input"
        />
        <button
          onClick={handlePayment}
          className="payment-button"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {message && <p className="payment-message">{message}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
