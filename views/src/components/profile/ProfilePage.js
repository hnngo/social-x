import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { } from 'react-router-dom';
import { fetchUser } from '../../actions';
import HeaderBar from '../HeaderBar';

const ProfilePage = (props) => {
  // Fetch user to retrive the right
  const { auth, fetchUser } = props;
  useEffect(() => {
    if (!auth.user) {
      fetchUser();
    }
  }, [auth.user, fetchUser])

  const renderContent = () => {
    if (props.auth.user) {
      return (
        <div>
          {props.auth.user.name}
        </div>
      );
    }
  }

  return (
    <div>
      <HeaderBar />
      <div className="p-container">
        {renderContent()}
      </div>
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
