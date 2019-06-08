import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatTime } from './formatTime';
import {
  deletePost,
  updatePost,
  likePost,
  deleteComment,
  uploadComment
} from '../../actions';

const Post = (props) => {
  const [editPost, setEditPost] = useState(false);
  const [postContent, setPostContent] = useState(props.content);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleteAsking, setIsDeleteAsking] = useState(false);
  const [limitViewCmt, setLimitViewCmt] = useState(3);
  const [commentContent, setCommentContent] = useState("");

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
  let timeAgo = formatTime(difTime);

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
          id={"cmt-area-" + postId}
          placeholder="Comment here"
          rows={1}
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && commentContent.length > 0) {
              props.uploadComment(postId, commentContent, rootPath);
              setCommentContent("");

              // Deselect the text area
              document.querySelector("#cmt-area-" + postId).blur()
            }
          }}
        />
      </div>
    );
  }

  const renderCommentView = () => {
    if (comments.total === 0) {
      return <div />;
    }

    const formattedCmt = comments.content.map((cmt, i) => {
      if (i >= limitViewCmt) {
        return <div key={cmt._id} />;
      }

      // Re-format the time
      let cmtTime = formatTime(new Date() - new Date(cmt.commentDate));

      return (
        <div key={cmt._id}>
          <div className="cmt-row" >
            <div className="cmt-avatar">
              <img src={`/image/${cmt.user.avatar}`} alt="ava" />
            </div>
            <div className="cmt-area">
              <p
                className="cmt-name"
                onClick={() => props.history.push(`/profile/${cmt.user._id}`)}
              >{cmt.user.name}</p>
              <p className="cmt-content">{cmt.comment}</p>
            </div>
          </div>
          <div className="cmt-util">
            <p className="cmt-time">{cmtTime}</p>
            {
              (auth.user &&
                (auth.user.id.toString() ===
                  postInfo.user.toString() ||
                  auth.user.id.toString() ===
                  cmt.user._id.toString())) ?

                <p
                  className="cmt-delete-btn"
                  onClick={() => props.deleteComment(
                    cmt._id,
                    postId,
                    rootPath
                  )}
                >Delete</p>
                :
                <div />
            }
          </div>
        </div>
      );
    });

    const renderSeeMore = () => {
      if (comments.content.length > limitViewCmt) {
        return (
          <div
            className="cmt-see-more"
            onClick={() => setLimitViewCmt(limitViewCmt + 6)}
          >
            <p>See More</p>
          </div>
        );
      }

      return <div />;
    }

    return (
      <div className="comment-view">
        {formattedCmt}
        {renderSeeMore()}
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
            <img src={`/image/${imgUrl}`} alt="ava" />
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
    likePost,
    deleteComment,
    uploadComment
  })(Post)
);
