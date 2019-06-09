import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const FriendRow = (props) => {
  const {
    friendInfo,
    numberOfBtn,
    optionalClassBtn1,
    onClickBtn1,
    btnName1,
    optionalClassBtn2,
    onClickBtn2,
    btnName2,
    auth,
    profile
  } = props;

  const renderBtn = () => {
    if (!auth.user || auth.user.id !== profile._id) {
      return <div />;
    }

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
        <div
          className="friend-ava"
          onClick={() => props.history.push(`/profile/${friendInfo._id}`)}
        >
          <img src={`/image/${friendInfo.avatar}`} alt="avatar" />
        </div>
        <div className="friend-name">
          <p
            onClick={() => props.history.push(`/profile/${friendInfo._id}`)}
          >
            {friendInfo.name}
          </p>
        </div>
      </div>
      {renderBtn()}
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile };
}

export default withRouter(
  connect(mapStateToProps)(FriendRow)
);
