import React from 'react';
import { connect } from 'react-redux';
import { } from 'react-router-dom';
import { fetchUser } from '../../actions';

const ProfilePage = (props) => {
  // Fetch user to retrive the right
  props.fetchUser();

  return (
    <div>
      {props.auth.user.name}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps, {
  fetchUser
})(ProfilePage);

//TODO: If login then let user can editted
//TODO: Get the right profile page
