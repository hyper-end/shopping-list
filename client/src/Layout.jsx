import { useState } from "react";
import { UserContext } from "./Utils/UserContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [user, setUser] = useState({
    user: {},
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default Layout;
