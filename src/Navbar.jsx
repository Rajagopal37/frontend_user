import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate(); // For programmatic navigation using react-router-dom v6

  // const handleLogout = () => {
  //   logout();
  //   localStorage.removeItem("token"); // Clear the token from localStorage
  // };

  // Function to handle logout

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (token) {
      try {
        // Send a logout request to the backend
        await axios.post(
          "https://backend-task-app-cq1a.onrender.com/api/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Clear token and user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Call logout function from context to update user state
        logout();

        // Redirect to the login page or home
        navigate("/login"); // Programmatic navigation
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <nav className="navbar navbar-light mb-3">
      <Link className="navbar-brand " to="/">
        <h1 className="text-primary px-5 pt-2 ">Task Manager</h1>
      </Link>

      <ul className="navbar-nav px-5 pt-2  ">
        {user ? (
          <>
            <li className="nav-item ml-2">
              Welcome,<h5>{user.name}</h5>{" "}
            </li>
            <li className="nav-item ml-2">
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
                className="nav-link text-success fw-bold"
                style={{ fontSize: "1rem", backgroundColor: "white" }}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link text-success fw-bold"
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
