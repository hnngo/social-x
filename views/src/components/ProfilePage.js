import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import HeaderBar from './HeaderBar';
import Post from './posts/Post';
import Loading from './Loading';
import {
  fetchProfileById,
  uploadPost
} from '../actions';

const avaImgUrl = "https://lh3.googleusercontent.com/3rhgWbCOvAx946IGRbx71p02Oi6hmE7Bli7ymXCqvt9oyrhnEoYR5_stB3BZbaIAwLey2aXag06zjqqVN5OYQAyvFjMl7IhYIMZqupGV09INS3F1Tx3V02jSzpvzrUeGxuasP9aExRusY2a4hImokhQ_QYTXvtJt35Sk5ezFAZl40zTjOtCZ7iiUwnJjnQ8tE9gyKRDxz6lQcOmseEMvrXvtAkdDILUFlWDE_LXuB6CIcvnxNkjrIwm5_w7l5opNZIGlkwlY9cPMNHsmGQfjBbP3kLwf2qf1oBnGs5VMRVWXrtYUtEtNADXl2oMbMQ2-L4yoNHydPTJTcr6ra8LN8WZLcpQMwxrCl9BbxzdqRKeFO_J6EJYU5Q-DAI84us5nQOgqPjR_U7FiHTOyvRumxC0naBHKrJtLt-UKB48BkqBNpt9TwhgLOdlw4dSrpTIWxelQQpOt_iinc4mfbdt1q498g8vSxX63QdN-BNRxKL6AH5FuVX5JbhXpPRO4GbsLS99sH0mujYIZmfZm7ze3Gt7pXlq8TL7Ao4dFBypvrIVoSHROSeZrFyPMyguVjYlEWuH2n6rpNfanZbB9b14jRhtZNWULELP1UnByVHzamHRSv6knIJD_euPPnhTea5Q6csG1N-xhjLB2YWdCPChL-JUhgrn9ilA=s225-no";

const ProfilePage = (props) => {
  const [postContent, setPostContent] = useState("");
  const [previousPosts, setPreviousPosts] = useState([]);
  const [posting, setPosting] = useState(false);

  const {
    fetchProfileById,
    match,
    profile,
    uploadPost
  } = props;

  useEffect(() => {
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
    }
  }

  const renderContent = () => {
    const {
      name,
      job,
      home,
      registerDate,
      birthday
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
            <img src={avaImgUrl} alt="avatar" />
            <p>@{name}</p>
          </div>

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
            <div className="p-basic-edit">
              Edit info
            </div>
          </div>

          <div className="p-friend-list">
            <p className="fl-title">Friends</p>
            {renderFriend()}
            <div className="fl-edit">
              Edit
              </div>
          </div>
        </div>

        <div className="col-sm-8">
          {renderPostArea()}
          <p className="post-heading">POSTS</p>
          {renderPost()}
        </div>
      </div>
    );
  }

  const renderPostArea = () => {
    // Check if user has permission to upload new post
    if (!props.auth.user || props.auth.user.id !== props.match.params.userId) {
      return <div />;
    }

    return (
      <div className="p-post-area">
        <div className="post-wrapper">
          <img src={avaImgUrl} alt="avatar" />
          <textarea
            placeholder="What is your thought?"
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
          triggerLikes={p.likes.total}
          triggerCmts={p.comments.total}
        />
      );
    })
  }

  const renderFriend = () => {
    if (profile.friend.length === 0) {
      return <p className="fl-nofriend">No Friends</p>;
    }

    return profile.friend.map((f, i) => {
      return (
        <li key={i}>
          {f.name}
        </li>
      );
    })
  };

  return (
    <div>
      <div className="p-container">
        <div className="container">
          {
            (Object.keys(profile).length > 0 && profile._id === props.match.params.userId)?
              renderContent() : <Loading />
          }
        </div>
      </div>
      <HeaderBar />
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile };
}

export default connect(mapStateToProps, {
  fetchProfileById,
  uploadPost
})(ProfilePage);

/*
<form action="/image/upload" method="POST" encType="multipart/form-data">
            <div className="form-group">
              <label>Select a file to upload</label>
              <input type="file"
                name="file" className="form-control-file" />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
*/