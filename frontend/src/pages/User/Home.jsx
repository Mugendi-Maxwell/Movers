import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  TruckIcon,
  ChatBubbleBottomCenterIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Signup from './Signup';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Top header with company title */}
      <header className="top-header">
        <h1 className="company-title">MoveEase</h1>
      </header>

      {/* Navigation bar with icons stretched across the width */}
      <nav className="icon-nav">
        <ul>
          <li onClick={() => handleNavigation('/home')}>
            <HomeIcon className="icon" />
          </li>
          <li onClick={() => handleNavigation('/profile')}>
            <UserIcon className="icon" />
          </li>
          <li onClick={() => handleNavigation('/booking')}>
            <TruckIcon className="icon" />
          </li>
          <li onClick={() => handleNavigation('/feedback')}>
            <ChatBubbleBottomCenterIcon className="icon" />
          </li>
          <li onClick={() => handleNavigation('/login')}>
            <ArrowRightOnRectangleIcon className="icon" />
          </li>
        </ul>
      </nav>

      {/* Main Content Area: renders Signup component */}
      <main className="main-content">
        <Signup />
      </main>
    </div>
  );
};

export default Home;
