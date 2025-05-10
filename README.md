# Movers

# Overview
The Moving House Web App is designed to help individuals and families plan and manage their upcoming move with ease. From finding reputable moving companies to organizing inventory, scheduling, and tracking the move in real-time, this web app simplifies the moving process to reduce stress and improve overall efficiency.

# Problem Statement
Moving to a new home can be overwhelming, especially when you're not sure what steps to take to prepare for moving day. This app will help users:

Find a reputable moving company
Organize and manage time effectively
Track and communicate with movers in real-time
Inventory and categorize items using a detailed house checklist
Features
User Authentication
Allow users to sign up and log in to their accounts securely.

# Inventory Management
Browse through a default checklist of home items based on different home sizes:

Bedsitter
One Bedroom
Studio
Two Bedroom
Home Location Details
Users will provide their current and new home location details to facilitate better planning and quotes.

# Price Calculation and Booking

Select moving companies and get an instant price estimate.
Approve or decline the quote.
Schedule the moving date and time after approval.
Push Notifications
Users will receive real-time notifications on booking confirmation and updates.

Real-Time Communication
Contact the moving company in real-time for updates, questions, or any adjustments.

# How It Works
Enter Your Details
Users will input the date, time, and specific needs for their move (e.g., what items need to be moved, etc.).

Get Your Price
Users can browse through available movers and get instant price quotes.

Book Your Move
Once the user approves the quote, they can book the move with the selected moving company.

Track and Communicate
Users can track the status of their move and communicate directly with their movers through the app.

# Minimum Viable Product (MVP)
The MVP should meet the following features and metrics:

User Authentication: Implement secure login/signup for users.
Inventory Management: Allow users to browse and select items from predefined home size categories.

Location Details: Users will input current and new home address details.
Price Estimate & Approval: Provide a price estimate, allowing users to approve or decline the quote.

Booking Confirmation: Enable users to confirm a moving date and time.

Push Notifications: Users will be notified on booking confirmation.

Testing: Ensure unit tests and UI tests with a minimum coverage of 85%.

# Technical Objectives
Descriptive Commit Messages: Ensure each commit is well-documented.
Code Reviews: Every commit must be reviewed by at least two team members and the project lead before being accepted.

Feature Branches: Each new feature should have its own branch, and feature branches must be deleted once the pull request is merged.

Test Coverage: The app must maintain above 85% test coverage for both UI and Unit tests.

Modular Code Structure: Code should be modular, so failure in one part does not affect other unrelated modules.

# Technologies
Backend: Python Flask
Database: PostgreSQL
Frontend: ReactJS & Redux Toolkit (for state management)
Testing Frameworks: Jest (for React), Minitests (for backend)
Design & Wireframes:
Figma (for mobile-friendly wireframes)
Adobe XD or Framer (for visual design)
Installation
Prerequisites
Make sure you have the following tools installed:

Node.js and npm for the frontend.
Python 3.x and pip for the backend.
PostgreSQL for database management.
Backend Setup
Clone the repository:

bash
Copy
git clone <repo-url>
cd backend
Install dependencies:

bash
Copy
pip install -r requirements.txt
Set up the database:

Create a PostgreSQL database.
Update the DATABASE_URL in the configuration file.
Run the Flask application:

bash
Copy
python app.py
Frontend Setup
Clone the repository:

bash
Copy
git clone <repo-url>
cd frontend
Install dependencies:

bash
Copy
npm install
Start the React app:

bash
Copy
npm start
Running Tests
To run unit and UI tests:

For frontend tests, use Jest:

bash
Copy
npm test
For backend tests, use Minitests:

bash
Copy
python -m unittest discover
Contribution Guidelines
Fork the repository and create a feature branch (git checkout -b feature-name).
Make your changes, ensuring that all tests pass and code is well-commented.
Push to your fork and create a pull request.
Review: Each pull request must be reviewed by at least two team members and the project lead before being merged.

# License
This project is licensed under the MIT License - see the LICENSE file for details.