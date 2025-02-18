import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to MoveApp</h1>
            <p>Plan your move efficiently with our services.</p>
            <Link to="/signup">Get Started</Link>
        </div>
    );
};

export default Home;
