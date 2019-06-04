import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../HeaderBar';
import Post from './Post';
import { fetchProfileById } from '../../actions';
import Loading from '../Loading';

const avaImgUrl = "https://lh3.googleusercontent.com/3rhgWbCOvAx946IGRbx71p02Oi6hmE7Bli7ymXCqvt9oyrhnEoYR5_stB3BZbaIAwLey2aXag06zjqqVN5OYQAyvFjMl7IhYIMZqupGV09INS3F1Tx3V02jSzpvzrUeGxuasP9aExRusY2a4hImokhQ_QYTXvtJt35Sk5ezFAZl40zTjOtCZ7iiUwnJjnQ8tE9gyKRDxz6lQcOmseEMvrXvtAkdDILUFlWDE_LXuB6CIcvnxNkjrIwm5_w7l5opNZIGlkwlY9cPMNHsmGQfjBbP3kLwf2qf1oBnGs5VMRVWXrtYUtEtNADXl2oMbMQ2-L4yoNHydPTJTcr6ra8LN8WZLcpQMwxrCl9BbxzdqRKeFO_J6EJYU5Q-DAI84us5nQOgqPjR_U7FiHTOyvRumxC0naBHKrJtLt-UKB48BkqBNpt9TwhgLOdlw4dSrpTIWxelQQpOt_iinc4mfbdt1q498g8vSxX63QdN-BNRxKL6AH5FuVX5JbhXpPRO4GbsLS99sH0mujYIZmfZm7ze3Gt7pXlq8TL7Ao4dFBypvrIVoSHROSeZrFyPMyguVjYlEWuH2n6rpNfanZbB9b14jRhtZNWULELP1UnByVHzamHRSv6knIJD_euPPnhTea5Q6csG1N-xhjLB2YWdCPChL-JUhgrn9ilA=s225-no";

const ProfilePage = (props) => {
  const { fetchProfileById, match, profile } = props;

  useEffect(() => {
    fetchProfileById(match.params.userId)
  }, [fetchProfileById, match.params.userId]);

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
          {renderPost()}
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
          userId={profile._id}
          owner={profile.name}
          postDate={p.postDate}
          content={p.content}
          numberOfLikes={p.likes.total}
          numberOfCmts={p.comments.total}
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
            Object.keys(profile).length > 0 ?
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
  fetchProfileById
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