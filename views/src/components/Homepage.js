import React from 'react';
import imgURL from '../imgURL.json';

const Homepage = (props) => {
  return (
    <div className="hp-container">
      <div className="hp-img-container">
        <img src={imgURL.homepageImgUrl} alt="hompage-img-1" />
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
