// Import required modules
import { useState } from "react";
import { UserContext } from "./Utils/UserContext";
import { Outlet } from "react-router-dom";
import { AuthStatus } from "./Components/Auth/AuthStatus";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

// Define Layout component
const Layout = () => {
  // Initialize user state
  const [user, setUser] = useState({
    user: {},
  });

  // Return JSX
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <>
        {/* Navigation bar */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Hyper Do</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Navbar.Text>
                {/* Show authentication status */}
                <AuthStatus />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Application container */}
        <div className="app-container">
          {/* Render nested components */}
          <Outlet />
        </div>
      </>
    </UserContext.Provider>
  );
};

// Export the Layout component
export default Layout;