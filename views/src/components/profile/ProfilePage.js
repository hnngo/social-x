import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import HeaderBar from '../HeaderBar';
import Post from '../posts/Post';
import Loading from '../Loading';
import EditInfo from './EditInfo';
import FriendTab from './FriendTab';
import BadgeNoti from './BadgeNoti';
import {
  VIEW_POST,
  VIEW_FRIEND
} from '../../constants';
import {
  fetchProfileById,
  uploadPost,
  sendFriendRequest,
  unfriend,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest
} from '../../actions';

const ProfilePage = (props) => {
  const [postContent, setPostContent] = useState("");
  const [previousPosts, setPreviousPosts] = useState([]);
  const [posting, setPosting] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [viewTab, setViewTab] = useState(VIEW_POST);
  const [viewUnfriend, setViewUnfriend] = useState(false);
  const [viewCancelRequest, setViewCancelRequest] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const {
    fetchProfileById,
    match,
    profile,
    uploadPost,
    auth
  } = props;

  useEffect(() => {
    // Set the view back to post
    setViewTab(VIEW_POST);
    fetchProfileById(match.params.userId)
  }, [fetchProfileById, match.params.userId]);

  if (Object.keys(profile).length > 0 && !_.isEqual(previousPosts, profile.post)) {
    setPreviousPosts(profile.post);
    setPostContent("");
    setPosting(false);
  }

  const handleClickShare = () => {
    if (postContent.length > 0 && !posting) {
      setPosting(true);
      uploadPost(postContent);

      // Set back the height of post area
      const qTA = document.querySelector("#profilePostArea");
      qTA.style.height = "76px";
    }
  }

  const renderAddFriendBtn = () => {
    if (auth.user && (profile._id !== auth.user.id)) {
      if (_.findIndex(profile.friend.list, (f) => f._id.toString() === auth.user.id) >= 0) {
        return (
          <div className="p-friend-add">
            <div
              className="p-add-btn"
              onClick={() => setViewUnfriend(!viewUnfriend)}
            >
              <i className="fas fa-check" />
              Friend
            </div>
            {
              viewUnfriend ?
                <div
                  className="p-danger-btn animated fadeIn"
                  onClick={() => {
                    props.unfriend(profile._id, auth.user.id);
                    setViewUnfriend(false);
                    setIsAdding(false);
                  }}
                >
                  <i className="fas fa-user-slash" />
                  Unfriend
              </div>
                :
                <div />
            }
          </div>
        );
      } else if (_.findIndex(profile.friend.requestFromList, (f) => f._id.toString() === auth.user.id) >= 0 && auth.user.friend.requestToList.includes(profile._id)) {
        return (
          <div className="p-friend-add">
            <div
              className="p-add-btn"
              onClick={() => setViewCancelRequest(!viewCancelRequest)}
            >
              <i className="fas fa-user-plus" />
              Friend Request Sent
            </div>
            {
              viewCancelRequest ?
                <div
                  className="p-danger-btn animated fadeIn"
                  onClick={
                    () => {
                      props.cancelFriendRequest(profile._id, auth.user.id);
                      setViewCancelRequest(false);
                      setIsAdding(false);
                    }
                  }
                >
                  <i className="fas fa-user-slash" />
                  Cancel Request
                </div>
                :
                <div />
            }
          </div>
        );
      } else if (_.findIndex(profile.friend.requestToList, (f) => f._id.toString() === auth.user.id) >= 0 && auth.user.friend.requestFromList.includes(profile._id)) {
        return (
          <div className="p-friend-add">
            <div
              className="p-add-btn"
              onClick={() => props.acceptFriendRequest(profile._id, auth.user.id)}
            >
              <i className="fas fa-user-plus" />
              Accept Request
            </div>
            <div
              className="p-danger-btn"
              onClick={() => props.declineFriendRequest(profile._id, auth.user.id)}
            >
              <i className="fas fa-user-slash" />
              Decline Request
            </div>
          </div>
        );
      } else {
        return (
          <div className="p-friend-add">
            <div
              className="p-add-btn"
              onClick={() => {
                if (isAdding) {
                  return;
                }

                props.sendFriendRequest(profile._id);
                setIsAdding(true);
              }}
            >
              <i className="fas fa-user-plus" />
              Add Friend
              {
                isAdding ?
                  <div className="updating-loading">
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                  :
                  <div />
              }
            </div>
          </div>
        );
      }
    }

    return <div />;
  }

  const renderContent = () => {
    const {
      name,
      job,
      home,
      registerDate,
      birthday,
      avatar
    } = profile;

    let formattedRegisterDate, formattedBirthday;

    if (registerDate) {
      formattedRegisterDate = new Date(registerDate);
      formattedRegisterDate = `${formattedRegisterDate.toDateString().slice(4)}`
    };

    if (birthday) {
      formattedBirthday = new Date(birthday);
      formattedBirthday = `${formattedBirthday.toDateString().slice(4, -4)}`;
    }

    return (
      <div className="row">
        <div className="col-sm-4">

          <div className="p-ava">
            <img src={`/image/${avatar}`} alt="avatar" />
            <p>@{name}</p>
          </div>

          {renderAddFriendBtn()}

          <div className="p-basic-info">
            {
              job ?
                <div className="info-row">
                  <div className="col-2">
                    <i className="fas fa-briefcase" />
                  </div>
                  <div className="col-10">
                    <p>Work as {job}</p>
                  </div>
                </div>
                :
                <div />
            }
            {
              home ?
                <div className="info-row">
                  <div className="col-2">
                    <i className="fas fa-home" />
                  </div>
                  <div className="col-10">
                    <p>Lives in {home}</p>
                  </div>
                </div>
                :
                <div />
            }
            {
              birthday ?
                <div className="info-row">
                  <div className="col-2">
                    <i className="fas fa-birthday-cake" />
                  </div>
                  <div className="col-10">
                    <p>{formattedBirthday}</p>
                  </div>
                </div>
                :
                <div />
            }
            {
              registerDate ?
                <div className="info-row">
                  <div className="col-2">
                    <i className="far fa-clock" />
                  </div>
                  <div className="col-10">
                    <p>Joined {formattedRegisterDate}</p>
                  </div>
                </div>
                :
                <div />
            }
            {
              (auth.user && match.params.userId === auth.user.id) ?
                <div
                  className="p-basic-edit"
                  onClick={() => setIsEditingInfo(true)}
                >
                  Edit info
                </div>
                :
                <div />
            }
          </div>

          <div className="p-friend-list">
            <p
              className="fl-title"
              onClick={() => setViewTab(VIEW_FRIEND)}
            >
              Friends
            </p>
            {renderFriend()}
            <div
              className="fl-edit"
              onClick={() => setViewTab(VIEW_FRIEND)}
            >
              View all
            </div>
          </div>
        </div>

        <div className="col-sm-8">
          {renderPostArea()}
          {
            isEditingInfo ?
              <EditInfo
                discardEdit={() => setIsEditingInfo(false)}
              />
              :
              <div>
                <div className="view-tab">
                  <p
                    className={viewTab === VIEW_POST ? "view-heading" : "view-heading dim"}
                    onClick={() => setViewTab(VIEW_POST)}
                  >POSTS</p>
                  <div style={{ position: "relative" }}>
                    <p
                      className={viewTab === VIEW_FRIEND ? "view-heading" : "view-heading dim"}
                      onClick={() => setViewTab(VIEW_FRIEND)}
                    >
                      FRIENDS
                    </p>
                    <BadgeNoti
                      notiNum={profile.friend.requestFromList.length}
                    />
                  </div>
                </div>
                {renderTab()}
              </div>
          }
        </div>
      </div>
    );
  }

  const renderTab = () => {
    if (viewTab === VIEW_POST) {
      return renderPost();
    } else if (viewTab === VIEW_FRIEND) {
      return <FriendTab />;
    }
  }

  const renderPostArea = () => {
    // Check if user has permission to upload new post
    if (!auth.user || auth.user.id !== match.params.userId) {
      return <div />;
    }

    return (
      <div className="p-post-area">
        <div className="post-wrapper">
          <img src={`/image/${props.profile.avatar}`} alt="avatar" />
          <textarea
            id="profilePostArea"
            placeholder="What is your thought?"
            rows={3}
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);

              // Auto increase the height
              const qTA = document.querySelector("#profilePostArea");
              if (e.target.value.length === 0) {
                qTA.style.height = "76px";
              } else {
                qTA.style.height = qTA.scrollHeight + "px";
              }
            }}
          />
        </div>
        <div className="post-btn">
          <button
            onClick={() => handleClickShare()}
          >
            {
              posting ?
                <div>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                </div>
                :
                "Share"
            }
          </button>
        </div>
      </div>
    );
  }

  const renderPost = () => {
    if (profile.post.length === 0) {
      return (
        <div>
          <p>No post has been uploaded</p>
        </div>
      );
    }

    return profile.post.map((p) => {
      return (
        <Post
          key={p._id}
          postInfo={p}
          userId={profile._id}
          owner={profile.name}
          imgUrl={profile.avatar}
          triggerLikes={p.likes.total}
          triggerCmts={p.comments.total}
        />
      );
    })
  }

  const renderFriend = () => {
    if (profile.friend.list.length === 0) {
      return <p className="fl-nofriend">No Friends</p>;
    }

    return profile.friend.list.map((f, i) => {
      return (
        <div
          key={i}
          className="fl-row"
          onClick={() => props.history.push(`/profile/${f._id}`)}
        >
          <div className="fl-ava">
            <img src={`/image/${f.avatar}`} alt="friend-avatar" />
          </div>
          <div className="fl-name">
            {f.name}
          </div>
        </div>
      );
    })
  };

  return (
    <div>
      <div className="p-container">
        <div className="container">
          {
            (Object.keys(profile).length > 0 && profile._id === match.params.userId) ?
              renderContent() : <Loading />
          }
        </div>
      </div>
      <HeaderBar
        onSignOut={() => setViewTab(VIEW_POST)}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile };
}

export default connect(mapStateToProps, {
  fetchProfileById,
  uploadPost,
  sendFriendRequest,
  unfriend,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest
})(ProfilePage);
