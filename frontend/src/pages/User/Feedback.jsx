import React, { useState } from 'react';
import {
  FaceFrownIcon,
  FaceSmileIcon,
  XMarkIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { FaRegMeh } from 'react-icons/fa';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  // Store mood as a numeric value: 1 (sad), 3 (neutral), or 5 (happy)
  const [mood, setMood] = useState(0);

  const handleMoodClick = (selectedMood) => {
    if (selectedMood === 'sad') {
      setMood(1);
    } else if (selectedMood === 'neutral') {
      setMood(3);
    } else if (selectedMood === 'happy') {
      setMood(5);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { mood, feedback, rating };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Feedback submitted successfully');
        // Optionally, clear the form or show a success message here
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        {/* Header with mood icons and close icon */}
        <div className="feedback-header">
          <div className="feedback-moods">
            <FaceFrownIcon
              className={`mood-icon ${mood === 1 ? 'selected' : ''}`}
              onClick={() => handleMoodClick('sad')}
            />
            <FaRegMeh
              className={`mood-icon ${mood === 3 ? 'selected' : ''}`}
              onClick={() => handleMoodClick('neutral')}
            />
            <FaceSmileIcon
              className={`mood-icon ${mood === 5 ? 'selected' : ''}`}
              onClick={() => handleMoodClick('happy')}
            />
          </div>
          <XMarkIcon
            className="close-icon"
            onClick={() => console.log('Close feedback form')}
          />
        </div>

        {/* Feedback Form */}
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label htmlFor="feedbackText">Care to share more</label>
          <textarea
            id="feedbackText"
            placeholder="Type your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <label>Rating</label>
          <div className="feedback-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`star-icon ${rating >= star ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
