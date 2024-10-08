import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Renamed for clarity
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-task-app-cq1a.onrender.com/api/users/login",
        credentials
      );
      login(response.data.user);
      localStorage.setItem("token", response.data.token); // Store the JWT token
      navigate("/");
    } catch (error) {
      setError("Invalid credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="m-3 p-3 w-50 border border-3 border-primary rounded d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="m-3 p-1 w-75">
          <h3 className="mb-4 d-flex justify-content-center text-success">
            Login
          </h3>
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          {/* Error message display */}
          <div className="form-group m-3 w-100">
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required // Added required attribute
            />
          </div>
          <div className="form-group m-3 w-100 position-relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              name="password"
              className="form-control mb-2"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required // Added required attribute
            />
            <span
              role="button"
              className="position-absolute end-0 top-0 mt-2 me-2"
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility" // Added accessibility label
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye text-primary"></i>
              )}
            </span>
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary text-white fw-normal rounded"
            >
              Submit
            </button>
          </div>
          <div className="text-center my-3">
            Not Registered Yet? <Link to="/signup">SignUp</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
