import React from 'react';

const Post = (props) => {
  const { imgUrl, owner, postDate, content, numberOfLikes, numberOfCmts } = props;

  return (
    <div className="post-containter">
      <div className="post-header">
        <div className="row">
          <div className="col-2">
            <img src={imgUrl} alt="ava"/>
          </div>
          <div className="col-10">
            <p className="post-owner">{owner || "Nhan"}</p>
            <p className="post-date">{postDate || "4 hours ago"}</p>
          </div>
        </div>
        <div className="post-auth-edit">
          <i className="fas fa-pen" />
          <i className="fas fa-trash" />
        </div>
      </div>
      <div className="post-body">
        {content || "leoafeoafoafkeafasdmfldsafmasdfkmsalfmsaklmflm dskmfl aksmfklasmd lfmsadm flsadmf lasml fmsalmf klasm fas"}
      </div>
      <div className="post-footer">
        <div className="footer-likes">
          {numberOfLikes || 234} Likes
        </div>
        <div className="footer-cmts">
          {numberOfCmts || 10} Comment
        </div>
      </div>
    </div>
  );
}

export default Post;
