import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import { fetchAllPosts } from '../actions';
import Post from './posts/Post';
import Loading from './Loading';

const FeedPage = (props) => {
  const { fetchAllPosts, feed } = props;
  
  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const renderPost = () => {
    if (feed.length > 0) {
      return feed.map((p) => {
        return (
          <Post
            key={p._id}
            postInfo={p}
            userId={p.user._id}
            owner={p.user.name}
            triggerLikes={p.likes.total}
          />
        );
      })
    }

    return <Loading />;
  }

  return (
    <div>
      <div className="container">
        <div className="feed-post-container">
          {renderPost()}
        </div>
      </div>
      <HeaderBar />
    </div>
  );
}

const mapStateToProps = ({ feed }) => {
  return { feed }
}

export default connect(mapStateToProps, {
  fetchAllPosts
})(FeedPage);

//TODO: Fetch limit posts when starting
