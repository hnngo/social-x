import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../HeaderBar';
import { fetchAllPosts } from '../../actions';
import Post from '../profile/Post';
import Loading from '../Loading';

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
            postInfo={p}
            userId={p.user._id}
            owner={p.user.name}
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

const mapStateToProps = ({ post }) => {
  return { post }
}

export default connect(mapStateToProps, {
  fetchAllPosts
})(FeedPage);

//TODO: Fetch limit posts when starting
