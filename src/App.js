import React, { useEffect, Suspense } from "react";
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
import Loader from "react-loader";
import { PrivateRoute } from "./features/user/privateRouter";
import { setUserFromLocalStorage } from "./features/user/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import styled, { Theam } from "styled-components";
import StoryPage from "./features/story/StoryPage";
import { loaderOptions } from "./utils/utils";

const Landing = React.lazy(() => import("./pages/Landing"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));
const UploadPhoto = React.lazy(() => import("./pages/UploadPhoto"));
const Feed = React.lazy(() => import("./pages/Feed"));
const PostPage = React.lazy(() => import("./pages/PostPage"));
const Search = React.lazy(() => import("./pages/Search"));
const CreatePost = React.lazy(() => import("./pages/CreatePost"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Explore = React.lazy(() => import("./pages/Explore"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, []);
  const { accessToken } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Suspense fallback={<Loader options={loaderOptions} />}>
        <Switch>
          <PrivateRoute exact path="/profile/:userId" component={Profile} />
          <PrivateRoute exact path="/post-page/:postId" component={PostPage} />
          <Route exact path="/">
            {accessToken ? <Redirect to="/feed" /> : <Landing />}
          </Route>
          <AppWrapper>
            <Route exact path="/signup">
              {accessToken ? <Redirect to="/feed" /> : <Signup />}
            </Route>
            <Route exact path="/signin">
              {accessToken ? <Redirect to="/feed" /> : <Signin />}
            </Route>

            <PrivateRoute exact path="/feed" component={Feed} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/create-post" component={CreatePost} />
            <PrivateRoute exact path="/explore" component={Explore} />
            <PrivateRoute exact path="/create-story" component={StoryPage} />

            <Route path="/upload-photo/profile">
              <UploadPhoto photoType="Profile" />
            </Route>
            <Route path="/upload-photo/cover">
              <UploadPhoto photoType="Cover" />
            </Route>
            <Route path="/upload-photo/story">
              <UploadPhoto photoType="Story" />
            </Route>
          </AppWrapper>
        </Switch>
      </Suspense>
    </div>
  );
}

const AppWrapper = styled.div`
  width: 90%;
  padding-bottom: 2rem;
  /* position: relative; */
  margin: auto;
  @media (min-width: 725px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;

export default App;
