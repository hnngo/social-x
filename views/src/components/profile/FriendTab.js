import React, { useState } from 'react';
import { connect } from 'react-redux';
import FriendRow from './FriendRow';
import {
  VIEW_ALL_FRIENDS,
  VIEW_FRIEND_REQUESTS,
  VIEW_REQUEST_SENT
} from '../../constants';
import {
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend
} from '../../actions';

const FriendTab = (props) => {
  const [viewTab, setViewTab] = useState(VIEW_ALL_FRIENDS);
  const { profile, auth } = props;

  const renderFriendList = () => {
    if (profile.friend.list.length > 0) {
      return profile.friend.list.map((f) => {
        return (
          <FriendRow
            key={f._id}
            friendInfo={f}
            numberOfBtn={1}
            btnName1={"Unfriend"}
            optionalClassBtn1={"f-btn-danger"}
            onClickBtn1={() => props.unfriend(f._id)}
          />
        );
      })
    }

    return <p>No Friends</p>;
  };

  const renderFriendRequestList = () => {
    if (profile.friend.requestFromList.length > 0) {
      return profile.friend.requestFromList.map((f) => {
        return (
          <FriendRow
            key={f._id}
            friendInfo={f}
            numberOfBtn={2}
            btnName1={"Accept"}
            optionalClassBtn1={"f-btn-approve"}
            onClickBtn1={() => props.acceptFriendRequest(f)}
            btnName2={"Decline"}
            optionalClassBtn2={"f-btn-danger"}
            onClickBtn2={() => props.declineFriendRequest(f._id)}
          />
        );
      })
    }

    return <p>No Friend Requests</p>;
  };

  const renderRequestSentList = () => {
    if (profile.friend.requestToList.length > 0) {
      return profile.friend.requestToList.map((f) => {
        return (
          <FriendRow
            key={f._id}
            friendInfo={f}
            numberOfBtn={1}
            btnName1={"Cancel Request"}
            optionalClassBtn1={"f-btn-danger"}
            onClickBtn1={() => props.cancelFriendRequest(f._id)}
          />
        );
      })
    }

    return <p>No Sent Requests</p>;
  };

  const renderTab = () => {
    switch (viewTab) {
      case VIEW_ALL_FRIENDS:
        return renderFriendList();
      case VIEW_FRIEND_REQUESTS:
        return renderFriendRequestList();
      case VIEW_REQUEST_SENT:
        return renderRequestSentList();
      default:
        return <div />;
    }
  };

  return (
    <div className="friend-container">
      <div className="friend-view-select-tab">
        <p
          className={
            viewTab === VIEW_ALL_FRIENDS ? "" : "dim"
          }
          onClick={() => setViewTab(VIEW_ALL_FRIENDS)}
        >
          All friends
        </p>
        {
          (!auth.user || auth.user.id !== profile._id) ?
            <div />
            :
            <p
              className={
                viewTab === VIEW_FRIEND_REQUESTS ? "" : "dim"
              }
              onClick={() => setViewTab(VIEW_FRIEND_REQUESTS)}
            >
              Friend Requests
            </p>
        }
        {
          (!auth.user || auth.user.id !== profile._id) ?
            <div />
            :
            <p
              className={
                viewTab === VIEW_REQUEST_SENT ? "" : "dim"
              }
              onClick={() => setViewTab(VIEW_REQUEST_SENT)}
            >
              Requests Sent
            </p>
        }

      </div>
      {renderTab()}
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile };
}

export default connect(mapStateToProps, {
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend
})(FriendTab);
