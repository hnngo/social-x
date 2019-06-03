import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../HeaderBar';
import { fetchAllPosts } from '../../actions';
import Post from '../profile/Post';

const FeedPage = (props) => {
  const { fetchAllPosts, post } = props;

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const renderPost = () => {
    if (post.length > 0) {
      return post.map((p) => {
        return (
          <Post
            key={p._id}
            owner={p.user.name}
            postDate={p.postDate}
            content={p.content}
            numberOfLikes={p.likes.total}
            numberOfCmts={p.comments.total}
          />
        );
      })
    }

    return (
      <div className="post-loading">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeaderBar
        hbName="Feeds"
      />
      <div className="container">
        <div className="feed-post-container">
          {renderPost()}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ post }) => {
  return { post }
}

export default connect(mapStateToProps, {
  fetchAllPosts
})(FeedPage);
