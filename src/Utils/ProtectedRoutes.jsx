// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const isAuthenticated = localStorage.getItem("user");

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoutes;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Assuming 'role' is a property in the user object that represents the user's role
  const userRole = user ? user.userType : null;

  // Define the allowed roles for the /mentor route
  const allowedRolesForMentorRoute = ["mentor"];

  // Check if the user has the required role for the /mentor route
  const canAccessMentorRoute = allowedRolesForMentorRoute.includes(userRole);

  return canAccessMentorRoute ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
