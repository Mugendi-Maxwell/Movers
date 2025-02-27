import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPaymentsAdmin } from '../../services/adminPaymentService';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPaymentsAdmin();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Payments</h1>
      <Link to="/admin/dashboard" className="text-blue-500 mb-4 inline-block">
        Back to Dashboard
      </Link>
      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : payments.length === 0 ? (
        <p>No payments available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4 border-b">{payment.id}</td>
                  <td className="py-2 px-4 border-b">{payment.user}</td>
                  <td className="py-2 px-4 border-b">{payment.amount}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payment;
