// // import App from "./App.jsx";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // createRoot(document.getElementById("root")).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>
// // );

import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// Get the root element in your HTML
const rootElement = document.getElementById("root");

// Create the root using the new API and render the App component
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // import { createRoot } from "react-dom/client";
