import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import HeaderBar from '../HeaderBar';
import Post from './Post';

const avaImgUrl = "https://lh3.googleusercontent.com/3rhgWbCOvAx946IGRbx71p02Oi6hmE7Bli7ymXCqvt9oyrhnEoYR5_stB3BZbaIAwLey2aXag06zjqqVN5OYQAyvFjMl7IhYIMZqupGV09INS3F1Tx3V02jSzpvzrUeGxuasP9aExRusY2a4hImokhQ_QYTXvtJt35Sk5ezFAZl40zTjOtCZ7iiUwnJjnQ8tE9gyKRDxz6lQcOmseEMvrXvtAkdDILUFlWDE_LXuB6CIcvnxNkjrIwm5_w7l5opNZIGlkwlY9cPMNHsmGQfjBbP3kLwf2qf1oBnGs5VMRVWXrtYUtEtNADXl2oMbMQ2-L4yoNHydPTJTcr6ra8LN8WZLcpQMwxrCl9BbxzdqRKeFO_J6EJYU5Q-DAI84us5nQOgqPjR_U7FiHTOyvRumxC0naBHKrJtLt-UKB48BkqBNpt9TwhgLOdlw4dSrpTIWxelQQpOt_iinc4mfbdt1q498g8vSxX63QdN-BNRxKL6AH5FuVX5JbhXpPRO4GbsLS99sH0mujYIZmfZm7ze3Gt7pXlq8TL7Ao4dFBypvrIVoSHROSeZrFyPMyguVjYlEWuH2n6rpNfanZbB9b14jRhtZNWULELP1UnByVHzamHRSv6knIJD_euPPnhTea5Q6csG1N-xhjLB2YWdCPChL-JUhgrn9ilA=s225-no";

const ProfilePage = (props) => {
  // Fetch user to retrive the right
  const { auth, fetchUser } = props;
  useEffect(() => {
    if (!auth.user) {
      fetchUser();
    }
  }, [auth.user, fetchUser])

  const renderContent = () => {
    if (!props.auth.user) {
      return (
        <div className="row">
          <div className="col-sm-4">

            <div className="p-ava">
              <img src={avaImgUrl} alt="avatar" />
            </div>

            <div className="p-basic-info">
              <div className="info-row">
                <div className="col-2">
                  <i className="fas fa-briefcase" />
                </div>
                <div className="col-10">
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="info-row">
                <div className="col-2">
                  <i className="fas fa-home" />
                </div>
                <div className="col-10">
                  <p>Lives in singapore</p>
                </div>
              </div>
              <div className="info-row">
                <div className="col-2">
                  <i className="fas fa-birthday-cake" />
                </div>
                <div className="col-10">
                  <p>Birthday</p>
                </div>
              </div>
              <div className="info-row">
                <div className="col-2">
                  <i className="far fa-clock" />
                </div>
                <div className="col-10">
                  <p>Join date</p>
                </div>
              </div>
              <div className="p-basic-edit">
                Edit info
              </div>
            </div>

            <div className="p-friend-list">
              <p className="fl-title">Friends</p>
              <ul>
                <li>Mike</li>
                <li>Nick</li>
                <li>Jonas</li>
              </ul>
              <div className="fl-edit">
                Edit
              </div>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="p-post-area">
              <div className="post-wrapper">
                <img src={avaImgUrl} alt="avatar" />
                <textarea
                  placeholder="What is your thought?"
                  rows={3}
                />
              </div>
              <div className="post-btn">
                <button>Share</button>
              </div>
            </div>
            <p className="post-heading">POSTS</p>
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <HeaderBar />
      <div className="p-container">
        <div className="container">
          {renderContent()}
        </div>
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