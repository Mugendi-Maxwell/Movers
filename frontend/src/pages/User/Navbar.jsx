import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  TruckIcon, 
  ChatBubbleBottomCenterIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="icon-navbar">
      <div className="navbar-logo">MoveEase</div>
      <ul className="navbar-icons">
        <li>
          <Link to="/home">
            <HomeIcon className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <UserIcon className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/booking">
            <TruckIcon className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/feedback">
            <ChatBubbleBottomCenterIcon className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/login">
            <ArrowRightOnRectangleIcon className="icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
