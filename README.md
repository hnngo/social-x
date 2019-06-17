### Social X
Social X is a online social media. A small project using my basic knowledge about React.js, Redux, Node.js and MongoDB.

The website URL: https://sxmedia.herokuapp.com/

## Description
Social X is developed as a basic social media platform. Users can create account or login with their Gmail accounts. 
Users can post their like any other social media, edit their personal information such as birthday, career or living place. Besides, each user can change their personal avatar to their favourite image, like or edit old posts.
User can interact with others by commenting on their post, send friend request to other users or delete any comment of their own posts or their own comments only.

## Technology
# Back End Side: 
The application server is bootstrapped by [Node.js](https://nodejs.org/en/) and [Express.js](https://expressjs.com/) is used as a web application framework for [Node.js](https://nodejs.org/en/). [Express](https://expressjs.com/) is used to setup route logic for APIs.

[MongoDB Cloud](https://www.mongodb.com/) is the project database which store user information, post content and other relating files such as user avatar. Client can view up-to-date profile page in real-time by automatically updating if there are any changes in profile such as basic user information or incoming friend request thanks to [Socket.io](https://socket.io/).

Authentication process is handled using [Passport.js](http://www.passportjs.org/). User can both sign in/up by email and password and login with Google account using Google OAuth 2.0.

# Front End Side: 
Client side is bootstrapped by [create-react-app](https://github.com/facebook/create-react-app) and I used [Redux](https://redux.js.org/) as a state management for my project.

Other react or redux related package like [react-router](https://reacttraining.com/react-router/web/guides/quick-start), [redux-form](https://redux-form.com/8.2.2/) or [redux-thunk](https://github.com/reduxjs/redux-thunk) are used for making project work effectively and smoothly.

The responsive, mobile-first feature and other css prototype I used for this project is [Bootstrap](https://getbootstrap.com/).

## Dependencies
# Server side
```
  "bcrypt": "^3.0.6",
  "concurrently": "^4.1.0",
  "express": "^4.17.0",
  "express-session": "^1.16.1",
  "gridfs-stream": "^1.1.1",
  "lodash": "^4.17.11",
  "mongoose": "^5.5.10",
  "multer": "^1.4.1",
  "multer-gridfs-storage": "^3.2.3",
  "passport": "^0.4.0",
  "passport-google-oauth20": "^2.0.0",
  "passport-local": "^1.0.0",
  "socket.io": "^2.2.0"
```

# Client side
```
  "axios": "^0.19.0",
  "http-proxy-middleware": "^0.19.1",
  "lodash": "^4.17.11",
  "react": "^16.8.6",
  "react-dom": "^16.8.6",
  "react-linkify": "^1.0.0-alpha",
  "react-redux": "^7.0.3",
  "react-router-dom": "^5.0.0",
  "react-scripts": "3.0.1",
  "redux": "^4.0.1",
  "redux-form": "^8.2.0",
  "redux-thunk": "^2.3.0",
  "socket.io-client": "^2.2.0"
```
