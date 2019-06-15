import React from 'react';

const UploadingLayout = (props) => {
  const { smallSpiner } = props;
  return (
    <div className="updating-loading">
      <div className={"spinner-border text-info" + (smallSpiner ? " spinner-border-sm" : "")} role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className={"spinner-border text-info" + (smallSpiner ? " spinner-border-sm" : "")}  role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className={"spinner-border text-info" + (smallSpiner ? " spinner-border-sm" : "")}  role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default UploadingLayout;
