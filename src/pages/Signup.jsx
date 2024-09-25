import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); // Log form data to ensure correct values
      const response = await axios.post(
        // "https://backend-task-app-cq1a.onrender.com/api/users/signup",
        formData
      );
      login(response.data.user);
      localStorage.setItem("token", response.data.token); // Store the JWT token
      navigate("/");
    } catch (error) {
      console.error(error); // Log the error for investigation
      setError("Error creating account");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="m-3 p-3 w-50 border border-3 border-primary rounded d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="m-3 p-1 w-75">
          {error && <p>{error}</p>}

          <h3 className="mb-4 d-flex justify-content-center text-primary">
            Create an Account
          </h3>

          <div className="form-group m-3 w-100">
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group m-3 w-100">
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group m-3 w-100 position-relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              name="password"
              className="form-control mb-2"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              type="button"
              className="position-absolute end-0 top-0 mt-2 me-2"
              onClick={togglePasswordVisibility}
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
            Already Have an Account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
