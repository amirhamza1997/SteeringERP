import { Redirect, Route } from "react-router-dom";
import Cookies from 'js-cookie'

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = Cookies.get('isAuthenticated');
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated === "true" ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
      }
    />
  );
}

export default ProtectedRoute;