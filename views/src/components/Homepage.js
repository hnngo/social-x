import React from 'react';
import imgURL from '../imgURL.json';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

const Homepage = (props) => {
  return (
    <div className="hp-container">
      <Navbar />
      <div className="hp-img-container">
        <img src={imgURL.homepageImgUrl} alt="hompage-img-1" />
      </div>
      <div className="hp-content container">
        <p className="main-header">Make the right move, social move</p>
        <p className="second-header">Find Your True Space</p>
        <div className="btn-group">
          <button
            className="explore"
            onClick={() => props.history.push('/feed')}
          >
            Explore
          </button>
          <button
            className="seemore"
            onClick={() => props.history.push('/feed')}
          >
            See More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
