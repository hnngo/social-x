import React from 'react';

const FriendRow = (props) => {
  const {
    friendInfo,
    numberOfBtn,
    optionalClassBtn1,
    onClickBtn1,
    btnName1,
    optionalClassBtn2,
    onClickBtn2,
    btnName2
  } = props;

  const renderBtn = () => {
    if (numberOfBtn === 1) {
      return (
        <div
          className={optionalClassBtn1}
          onClick={onClickBtn1}
        >
          {btnName1}
        </div>
      );
    } else if (numberOfBtn === 2) {
      return (
        <div className="friend-btn-two">
          <div
            className={optionalClassBtn1}
            onClick={onClickBtn1}
          >
            {btnName1}
          </div>
          <div
            className={optionalClassBtn2}
            onClick={onClickBtn2}
          >
            {btnName2}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="friend-row-container">
      <div className="friend-info">
        <div className="friend-ava">
          <img src={`/image/${friendInfo.avatar}`} alt="avatar" />
        </div>
        <div className="friend-name">
          <p>{friendInfo.name}</p>
        </div>
      </div>
      {renderBtn()}
    </div>
  );
};

export default FriendRow;
