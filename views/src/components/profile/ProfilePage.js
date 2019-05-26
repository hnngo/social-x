import React from 'react';
import { connect } from 'react-redux';

const ProfilePage = (props) => {
  return (
    <div>
      Profile
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(ProfilePage);
