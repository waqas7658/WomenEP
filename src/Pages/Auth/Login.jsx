import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make Axios POST request
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      // Handle the response as needed
      console.log("API response:", response.data.user);
      if (response.status === 200) {
        toast.success(`${response.data.user.userType} logged in successfully`);
        const userData = response.data.user;

        localStorage.setItem("user", JSON.stringify(userData));
        if (response.data.user.userType === "mentor") {
          navigate("/mentor");
        }
        if (response.data.user.userType === "student") {
          navigate("/");
        }

        location.reload();
      }

      // TODO: Add any additional logic based on the API response
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="grid lg:grid-cols-2 justify-center items-center">
      {/* Left side div */}
      <div className="flex flex-col justify-center items-center h-[100vh] p-5">
        <h1 className="text-5xl font-bold my-5">
          Empower Her <br />
          <span className="text-pink-500">A Blueprint for Women</span>
        </h1>
        <p className="font-bold lg:w-[35rem]">
          We envision a world where women stand shoulder to shoulder, breaking
          barriers, and challenging norms. We believe in the power of collective
          strength, and through empowerment, we aim to create positive change on
          both an individual and societal level.
        </p>
      </div>

      {/* Right side div */}
      <div className=" flex justify-center items-center ">
        <div className="flex min-h-full flex-col justify-center px-6 py-12  rounded-3xl shadow-2xl w-[25rem] ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="my-3">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
