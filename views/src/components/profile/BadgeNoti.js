import React from 'react';
import { connect } from 'react-redux';

const BadgeNoti = (props) => {
  const {
    notiNum,
    auth,
    profile
  } = props;

  // Show badge notification only after authentication
  if (!auth.user || auth.user.id !== profile._id || +notiNum <= 0) {
    return <div />;
  }

  return (
    <div className="badge-container">
      <p className="badge-number">{notiNum}</p>
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile };
}

export default connect(mapStateToProps)(BadgeNoti);
