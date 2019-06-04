import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deletePost
} from '../../actions';

const Post = (props) => {
  const {
    imgUrl,
    owner,
    postDate,
    content,
    numberOfLikes,
    numberOfCmts,
    userId,
    auth
  } = props;

  const timeNow = new Date();
  const timePosted = new Date(postDate);
  let difTime = timeNow - timePosted;
  let timeAgo;

  if (difTime < 60 * 1000) {
    timeAgo = "Less than a minute ago";
  } else if (difTime < 60 * 60 * 1000) {
    timeAgo = `${Math.round(difTime / (60 * 1000))} minute(s) ago`;
  } else if (difTime < 24 * 60 * 60 * 1000) {
    timeAgo = `${Math.round(difTime / (60 * 60 * 1000))} hour(s) ago`;
  } else if (difTime < 30 * 24 * 60 * 60 * 1000) {
    timeAgo = `${Math.round(difTime / (24 * 60 * 60 * 1000))} day(s) ago`;
  } else if (difTime < 365 * 24 * 60 * 60 * 1000) {
    timeAgo = `${Math.round(difTime / (30 * 24 * 60 * 60 * 1000))} month(s) ago`;
  } else {
    timeAgo = `${Math.round(difTime / (365 * 24 * 60 * 60 * 1000))} year(s) ago`;
  }

  const renderEditPost = () => {
    if (!auth.user || auth.user.id !== userId) {
      return <div />;
    }

    return (
      <div className="post-auth-edit">
        <i className="fas fa-pen" />
        <i className="fas fa-trash" onClick={() => props.deletePost(props.postId)}/>
      </div>
    );
  }

  return (
    <div className="post-containter">
      <div className="post-header">
        <div className="row">
          <div className="col-2">
            <img src={imgUrl} alt="ava" />
          </div>
          <div className="col-10">
            <p
              className="post-owner"
              onClick={() => props.history.push(`/profile/${userId}`)}
            >{owner}</p>
            <p className="post-date">{timeAgo}</p>
          </div>
        </div>
        {renderEditPost()}
      </div>
      <div className="post-body">
        {content}
      </div>
      <div className="post-footer">
        <div className="footer-likes">
          {
            numberOfLikes > 1 ?
              `${numberOfLikes} Likes`
              : `${numberOfLikes} Like`
          }
        </div>
        <div className="footer-cmts">
          {
            numberOfCmts > 1 ?
              `${numberOfCmts} Comments`
              : `${numberOfCmts} Comment`
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default withRouter(
  connect(mapStateToProps, {
    deletePost
  })(Post)
);
