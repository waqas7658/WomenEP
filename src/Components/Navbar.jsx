import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import profile from "/Images/profile.jpg";
const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    const parsedUserData = isAuthenticated ? JSON.parse(isAuthenticated) : null;
    setUserData(parsedUserData);
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/");
  };

  return (
    <>
      <nav className="   border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="text-white   self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              WomenEP
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block font-bold py-2 px-3 text-pink-500 bg-pink-500 rounded md:bg-transparent md:text-pink-500 md:p-0 dark:text-pink-500 md:dark:text-pink-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="block font-bold py-2 px-3 text-pink-500 bg-pink-500 rounded md:bg-transparent md:text-pink-500 md:p-0 dark:text-pink-500 md:dark:text-pink-500"
                  aria-current="page"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            {userData ? (
              <div>
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                  type="button"
                >
                  {userData?.image ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={userData?.image}
                      alt="Rounded avatar"
                    />
                  ) : (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={profile}
                      alt="Rounded avatar"
                    />
                  )}

                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdown"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to="/profile"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}

            {userData ? (
              <button
                onClick={handleSignOut}
                className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
