import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({ component, path, ...props }) => {
  const userState = useSelector((state) => state.user);
  const Component = component;
  return (
    <Route path={path} {...props}>
      {userState.accessToken ? (
        <Component />
      ) : (
        <Redirect replace to={{ pathname: "/signin", state: { from: path } }} />
      )}
    </Route>
  );
};
