import React from "react";
import "./MainBanner.css";
// import Home from "../assets/Home.jpg"
const MainBanner = () => {
  return (
    <>
      {/* <section class="py-8 z-10 font-serif">
        <div class="flex flex-col md:flex-row items-center max-w-6xl px-6 py-8 mx-auto">
          <div class="w-full md:w-1/2 py-8">
            <h1 class="text-pink-900 text-7xl font-semibold leading-none tracking-tighter">
              Welcome to <br />
              <span class="text-pink-500 capitalize">
                WomenEP, <br />
              </span>{" "}
              Elevate Your Strength, Ignite Your Potential
            </h1>
          </div>
          <div class="w-full md:w-1/2 py-8">
            <img
              src="https://www.svgrepo.com/show/493509/person-who-invests.svg"
              class="g-image"
            />
          </div>
        </div>
      </section> */}
      <div className="home-banner flex justify-center items-center">
        <div className=" w-[30rem]">
          <h1 class="text-pink-900 lg:text-7xl text-3xl font-semibold leading-none tracking-tighter text-center">
            Welcome to <br />
            <span class="text-pink-500 capitalize">
              WomenEP, <br />
            </span>{" "}
            Elevate Your Strength, Ignite Your Potential
          </h1>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
