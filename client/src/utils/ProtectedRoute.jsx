import config from "./config";
import axios from "./axios";
import { UserContext } from "./UserContext";

const { useContext, useEffect, useState } = require("react");
const { useLocation, Navigate } = require("react-router-dom");

const ProtectedRoute = ({ children }) => {
  const [result, setResult] = useState(<></>);
  const { setUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const jwt = localStorage.getItem("token");

      if (jwt === null) {
        localStorage.clear();
        setResult(
          <Navigate to="/login" replace state={{ path: location.pathname }} />
        );
        return;
      }

      const response = await axios.get(`${config.app.api}api/users/token`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const userData = response.data.user;
      const isAuth = userData && userData.username;

      if (isAuth) {
        setResult(<>{children}</>);
      } else {
        setResult(
          <Navigate to="/login" replace state={{ path: location.pathname }} />
        );
      }

      localStorage.setItem("user", JSON.stringify(userData));
      setUser((prev) => {
        return {
          ...prev,
          user: userData,
          token: jwt,
        };
      });
    };

    checkUser();
  }, [children, setUser, location]);

  return result;
};

export default ProtectedRoute;
