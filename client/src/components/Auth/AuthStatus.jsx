import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Utils/UserContext";
import { useContext } from "react";

const AuthStatus = () => {
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const signout = () => {
    navigate("/login");
    setUser({});
    localStorage.clear();
  };

  if (!user.isAuth) {
    return (
      <>
        <Link to="/login">Login</Link>
        &nbsp;
        <Link to="/register">Sign Up</Link>
      </>
    );
  }

  return (
    <>
      <span>Welcome {user.user.username}!</span>
      &nbsp;
      <button
        onClick={() => {
          signout();
        }}
      >
        Logout
      </button>
    </>
  );
};

export { AuthStatus };
