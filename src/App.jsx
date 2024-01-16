import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Navbar from "./Components/Navbar";
import FormDetail from "./Pages/FormDetail";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import Mentor from "./Pages/Mentor";
import AddCourses from "./Components/MentorCourses/AddCourses";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/addcourse" element={<AddCourses />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/formDetail/:id" element={<FormDetail />} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
