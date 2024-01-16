import React, { useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { BASEURL } from "../../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [userType, setUserType] = useState("mentor");

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle user type change
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData, userType);

    try {
      const response = await axios.post(`${BASEURL}/api/user/signup`, {
        email: formData.email,
        name: formData.username,
        password: formData.password,
        userType: userType,
      });
      if (response.status === 200) {
        navigate("/login");
        toast.success("Successfully toasted!");
        console.log("API response:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`${error}, TRY Again `);
    }
  };

  return (
    <>
      {/* Left side div */}
      <section className="grid lg:grid-cols-2 justify-center items-center">
        <div className="flex flex-col justify-center items-center h-[100vh] p-5">
          <h1 className="text-5xl font-bold my-5">
            Empower Her <br />
            <span className="text-pink-500">A Blueprint for Women</span>
          </h1>
          <p className="font-bold lg:w-[35rem]">
            We envision a world where women stand shoulder to shoulder, breaking
            barriers, and challenging norms. We believe in the power of
            collective strength, and through empowerment, we aim to create
            positive change on both an individual and societal level.
          </p>
        </div>

        {/* Right side div */}
        <div className="flex justify-center items-center ">
          <div className="flex min-h-full flex-col justify-center px-6 py-12  rounded-3xl shadow-2xl w-[25rem] ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
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

                {/* Username Input */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-1">
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

                {/* ROLE */}
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="mentor"
                      checked={userType === "mentor"}
                      onChange={handleUserTypeChange}
                      className="form-radio h-5 w-5 text-pink-600"
                    />
                    <span className="ml-2">Mentor</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      value="student"
                      checked={userType === "student"}
                      onChange={handleUserTypeChange}
                      className="form-radio h-5 w-5 text-pink-600"
                    />
                    <span className="ml-2">Student</span>
                  </label>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignUp;
