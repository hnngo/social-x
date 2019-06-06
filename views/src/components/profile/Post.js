import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deletePost,
  updatePost,
  likePost
} from '../../actions';

const Post = (props) => {
  const [editPost, setEditPost] = useState(false);
  const [postContent, setPostContent] = useState(props.content);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleteAsking, setIsDeleteAsking] = useState(false);

  const {
    owner,
    userId,
    imgUrl,
    auth,
    postInfo
  } = props;

  const {
    postDate,
    content,
    _id: postId,
    likes,
    comments
  } = postInfo

  const numberOfLikes = likes.total
  const numberOfCmts = comments.total
  
  // Get the path root
  const rootPath = props.match.path.split('/')[1];

  // Set the isLiked state
  if (auth.user && likes.who.includes(auth.user.id) && !isLiked) {
    setIsLiked(true);
  } else if ((!auth.user || !likes.who.includes(auth.user.id)) && isLiked) {
    setIsLiked(false);
  }

  // Re-format the time
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

  const handleClickLike = () => {
    if (!auth.user) {
      return;
    }

    props.likePost(postId, auth.user.id, rootPath);
  }

  const renderEditPost = () => {
    if (!auth.user || auth.user.id !== userId) {
      return <div />;
    }

    return (
      <div className="post-auth-edit">
        <i
          className="fas fa-pen"
          onClick={() => {
            setEditPost(true);
            setPostContent(content);
          }}
        />
        <i
          className="fas fa-trash"
          // onClick={() => props.deletePost(postId, rootPath)}
          onClick={() => setIsDeleteAsking(true)}
        />
      </div>
    );
  }

  const renderCommentArea = () => {
    if (!auth.user) {
      return <div />;
    }

    return (
      <div className="comment-section">
        <textarea
          placeholder="Comment here"
          rows={1}
        />
      </div>
    );
  }

  const renderCommentView = () => {
    if (comments.total === 0) {
      return <div />;
    }

    const formattedCmt = comments.content.map(cmt => {
      return (
        <div
          key={cmt._id}
          className="cmt-row"
        >
          <div className="cmt-avatar">
            <img src={"dfdd"} alt="ava"/>
          </div>
          <div className="cmt-area">
            <p className="cmt-name">{cmt.user.name}</p>
            <p className="cmt-content">{cmt.comment}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="comment-view">
        {formattedCmt}
      </div>
    )
  }

  const renderDeleteAsking = () => {
    if (isDeleteAsking) {
      return (
        <div className="post-delete-ask">
          <div className="post-delete-content">
            <div className="delete-question">
              <p>Do you want to delete this post?</p>
            </div>
            <div className="delete-btn-group">
              <button
                className="btn-confirm"
                onClick={() => {
                  props.deletePost(postId, rootPath)
                  setIsDeleteAsking(false);
                }}
              >Confirm</button>
              <button 
              className="btn-cancel"
              onClick={() => {
                setIsDeleteAsking(false);
              }}
              >Cancel</button>
            </div>
          </div>
        </div>
      );
    }

    return <div />
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
        {
          editPost ?
            <div className="post-edit-area">
              <textarea
                rows={3}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="post-edit-button">
                <button
                  className="btn-confirm"
                  onClick={() => {
                    props.updatePost(postId, postContent, rootPath);
                    setEditPost(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="btn-discard"
                  onClick={() => setEditPost(false)}
                >
                  Discard
                </button>
              </div>
            </div>
            :
            content
        }
      </div>
      <div className="post-footer">
        <div
          className={
            isLiked ? "footer-likes post-liked" : "footer-likes"
          }
          onClick={() => handleClickLike()}
        >
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
      {renderCommentArea()}
      {renderCommentView()}
      {renderDeleteAsking()}
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default withRouter(
  connect(mapStateToProps, {
    deletePost,
    updatePost,
    likePost
  })(Post)
);

//TODO: Ask to delete
