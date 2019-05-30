import React, { useState } from 'react';
import imgURL from '../imgURL.json';
import Navbar from './Navbar.js';

const Homepage = () => {
  const [imgReload, setImgReload] = useState(false);

  return (
    <div className="hp-container">
      <Navbar />
      <div className="hp-img-container">
        <img src={imgURL.homepageImgUrl} alt="hompage-img-1" onLoad={() => setImgReload(true)}/>
      </div>
      <div className="hp-content container">
        <p className="main-header">Make the right move, social move</p>
        <p className="second-header">Find Your True Space</p>
        <div className="btn-group">
          <button className="explore">Explore</button> 
          <button className="seemore">See More</button>  
        </div>
      </div>
    </div>
  ); 
};

export default Homepage;
