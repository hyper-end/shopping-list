import { useState } from "react";
import { UserContext } from "./Utils/UserContext";
import { Outlet } from "react-router-dom";
import { AuthStatus } from "./Components/Auth/AuthStatus";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Layout = () => {
  const [user, setUser] = useState({
    user: {},
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Hyper Do</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Navbar.Text>
                <AuthStatus />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="app-container">
          <Outlet />
        </div>
      </>
    </UserContext.Provider>
  );
};

export default Layout;
