import React from 'react';

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-response">
        <div className="nav-brand">
          <p>Social X</p>
        </div>
        <div className="nav-link">
          <ul>
            <li>Sign In</li>
            <li>Sign Up</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
