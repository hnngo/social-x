import React from 'react';

const Loading = () => {
  return (
    <div className="post-loading">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
