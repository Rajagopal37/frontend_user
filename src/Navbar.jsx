import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token"); // Clear the token from localStorage
  };

  return (
    <nav className="navbar navbar-light">
      <Link className="navbar-brand " to="/">
        <h2 className="text-primary px-5 pt-2 ">Task Manager</h2>
      </Link>
      <ul className="navbar-nav ml-3">
        {user ? (
          <>
            <li className="nav-item">
              Welcome,<h5>{user.name}</h5>{" "}
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link text-danger fw-bold"
                style={{ fontSize: "1rem", backgroundColor: "white" }}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link text-danger fw-bold"
                style={{ fontSize: "1rem", backgroundColor: "white" }}
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
