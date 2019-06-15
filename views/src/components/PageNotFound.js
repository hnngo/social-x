import React from 'react';
import HeaderBar from './HeaderBar';

const PageNotFound = () => {
  return (
    <div className="pnf-container">
      <div className="pnf-content">
        <p className="pnf-text">Sorry, the page that you are looking for is not available</p>
        <p className="pnf-number">
          4&nbsp;
            <span>
              <i className="fas fa-low-vision animated heartBeat infinite" />
            </span>
          &nbsp;4
        </p>
        <p className="pnf-text">Page Not Found</p>
      </div>
      <HeaderBar />
    </div>
  );
};

export default PageNotFound;
