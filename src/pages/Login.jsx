import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-url.com/api/users/login",
        credentials
      );
      login(response.data.user);
      localStorage.setItem("token", response.data.token); // Store the JWT token
      navigate("/");
    } catch (error) {
      setError("Invalid credentials", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="m-3 p-3 w-50 border border-3 border-primary rounded d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="m-3 p-1 w-75">
          <h3 className="mb-4 d-flex justify-content-center text-primary">
            Login
          </h3>

          <div className="form-group m-3 w-100">
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
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
            Not Registered Yet? <Link to="/signup">SignUp</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import { useState, useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [errors, setError] = useState("");
//   const { login } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://backend-url.com/api/login",
//         credentials
//       );
//       login(response.data.user);
//       navigate("/");
//     } catch (error) {
//       setError("Invalid credentials", error);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-center align-items-center">
//         <div className="m-3 p-3 w-50 border border-3 border-primary rounded d-flex justify-content-center align-items-center">
//           <form onSubmit={handleSubmit} className="m-3 p-1 w-75">
//             <h3 className="mb-4 d-flex justify-content-center text-primary">
//               Login
//             </h3>

//             <div className="form-group m-3 w-100">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control mb-2"
//                 placeholder="Email"
//                 value={credentials.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group m-3 w-100 position-relative">
//               <input
//                 type={showPassword ? "text" : "password"} // Toggle between text and password type
//                 name="password"
//                 className="form-control mb-2"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={handleChange}
//               />

//               <span
//                 type="button"
//                 className="position-absolute end-0 top-0 mt-2 me-2"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? (
//                   <i className="bi bi-eye-slash"></i>
//                 ) : (
//                   <i className="bi bi-eye text-primary"></i>
//                 )}
//               </span>
//               {errors.password && (
//                 <small className="text-danger">{errors.password}</small>
//               )}
//             </div>

//             <div className="mt-3 d-flex justify-content-center">
//               <button
//                 type="submit"
//                 className="btn btn-primary text-white fw-normal rounded"
//               >
//                 Submit
//               </button>
//             </div>

//             <div className="text-center my-3">
//               Not Registered Yet?{" "}
//               <Link to="/signup" className="text-decoration-none">
//                 <span className="text-success fs-4 fw-semibold"> SignUp</span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
