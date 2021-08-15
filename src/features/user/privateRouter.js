import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({ component, path, ...props }) => {
  const user = useSelector((state) => state.user);
  const Component = component;
  return (
    <Route path={path} {...props}>
      {user.token !== "" ? (
        <Component />
      ) : (
        <Redirect replace to={{ pathname: "/signin", state: { from: path } }} />
      )}
    </Route>
  );
};
