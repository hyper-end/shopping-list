// Import the required libraries/modules

import config from "./config";
import axios from "./axios";
import { UserContext } from "./UserContext";

const { useContext, useEffect, useState } = require("react");
const { useLocation, Navigate } = require("react-router-dom");

const ProtectedRoute = ({ children }) => {
  const [result, setResult] = useState(<></>); // declare state to store result
  const { setUser } = useContext(UserContext); // get setUser function from UserContext
  const location = useLocation(); // get current location

  useEffect(() => {
    // run effect when component mounts
    const checkUser = async () => {
      // define async function to check user authentication
      const jwt = localStorage.getItem("token"); // get JWT from localStorage

      if (jwt === null) {
        // if JWT is null, clear localStorage and redirect to login page
        localStorage.clear();
        setResult(
          <Navigate to="/login" replace state={{ path: location.pathname }} />
        );
        return;
      }

      const response = await axios.get(`${config.app.api}api/users/token`, {
        // check token validity by making GET request to server with JWT
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const userData = response.data.user; // extract user data from response
      const isAuth = userData && userData.username; // check if user is authenticated

      if (isAuth) {
        // if user is authenticated, render the protected route
        setResult(<>{children}</>);
      } else {
        // if user is not authenticated, redirect to login page
        setResult(
          <Navigate to="/login" replace state={{ path: location.pathname }} />
        );
      }

      localStorage.setItem("user", JSON.stringify(userData)); // store user data in localStorage
      setUser((prev) => {
        // update user context with user data and JWT
        return {
          ...prev,
          user: userData,
          token: jwt,
          isAuth,
        };
      });
    };

    checkUser(); // call the async function to check user authentication
  }, [children, setUser, location]); // dependencies for the effect

  return result; // return the result (either the protected route or a redirect)
};

export default ProtectedRoute;
