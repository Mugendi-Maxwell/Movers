import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFeedbackAdmin } from '../../services/feedbackService';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getAllFeedbackAdmin();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Feedback</h1>
      <Link to="/admin/dashboard" className="text-blue-500 mb-4 inline-block">
        Back to Dashboard
      </Link>
      {loading ? (
        <p>Loading feedback...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Message</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="py-2 px-4 border-b">{feedback.id}</td>
                  <td className="py-2 px-4 border-b">{feedback.user}</td>
                  <td className="py-2 px-4 border-b">{feedback.message}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;
