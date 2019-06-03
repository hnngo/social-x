import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../HeaderBar';
import { fetchUser } from '../../actions';
import Post from '../profile/Post';

const FeedPage = (props) => {
  // const { fetchUser } = props;
  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  return (
    <div>
      <HeaderBar
        hbName="Feeds"
      />
      <div className="container">
        <div className="feed-post-container">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { fetchUser })(FeedPage);
