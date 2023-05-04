import Button from "react-bootstrap/Button";
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
        <Link className="btn btn-link" to="/register">Register</Link>
        <Link className="btn btn-primary btn-login" to="/login">Login</Link>
      </>
    );
  }

  return (
    <>
      <span>Welcome {user.user.username}!</span>
      &nbsp;
      <Button
        onClick={() => {
          signout();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export { AuthStatus };
