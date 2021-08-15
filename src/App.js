import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "./features/user/privateRouter";
import { setUserFromLocalStorage } from "./features/user/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Landing,
  Signin,
  Signup,
  UploadPhoto,
  Feed,
  PostPage,
  Search,
  CreatePost,
  Notifications,
  Profile,
} from "./pages";
import styled, { Theam } from "styled-components";
import StoryPage from "./features/story/StoryPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, []);
  const { accessToken } = useSelector((state) => state.user);

  console.log("accessToken", accessToken);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <AppWrapper>
          <Route exact path="/">
            {accessToken ? <Redirect to="/feed" /> : <Landing />}
          </Route>

          <Route exact path="/signup">
            {accessToken ? <Redirect to="/feed" /> : <Signup />}
          </Route>
          <Route exact path="/signin">
            {accessToken ? <Redirect to="/feed" /> : <Signin />}
          </Route>

          <PrivateRoute exact path="/feed" component={Feed} />
          <PrivateRoute exact path="/search" component={Search} />
          <PrivateRoute exact path="/create-post" component={CreatePost} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <PrivateRoute exact path="/create-story" component={StoryPage} />

          <PrivateRoute exact name="/post-page" path="/:postId" component={PostPage} />
          <Route path="/upload-photo/profile">
            <UploadPhoto photoType="Profile" />
          </Route>
          <Route path="/upload-photo/cover">
            <UploadPhoto photoType="Cover" />
          </Route>
        </AppWrapper>
      </Switch>
    </div>
  );
}

const AppWrapper = styled.div`
  width: 90%;
  /* position: relative; */
  margin: auto;
`;

export default App;
