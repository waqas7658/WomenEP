import React from "react";

const AboutPage = () => {
  return (
    <>
      {/* banner section  */}
      <section>
        <div class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('/Images/women3.jpg')] h-[500px]"></div>

        <div class="w-100 mx-auto px-6 sm:max-w-2xl md:max-w-3xl md:px-12 lg:max-w-5xl xl:max-w-7xl xl:px-32">
          <div class="text-center">
            <div class="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:py-16 md:px-12 mt-[-170px] backdrop-blur-[30px]">
              <h1 className="my-5 text-3xl font-bold tracking-tight md:text-5xl xl:text-5xl ">
                ABOUT US
              </h1>
              <h1 class="mt-2 mb-16 text-xl font-bold tracking-tight md:text-2xl xl:text-2xl ">
                "Empowering women is not just a movement; it's a catalyst for
                positive change, unlocking boundless potential and reshaping the
                world for the better." <br />
                {/* <span class="text-primary">for your business</span> */}
              </h1>
            </div>
          </div>
        </div>
        {/* OUR MISIION  */}
        <div className=" flex flex-col justify-center items-center p-24">
          <h1 className="my-5 text-3xl font-bold tracking-tight md:text-7xl xl:text-7xl text-pink-700">
            Our Mission
          </h1>
          <p className="my-5 text-xl font-bold tracking-tight md:text-2xl xl:text-2xl text-center text-pink-500">
            At WomenEP, we are dedicated to empowering women to unlock their
            full potential and achieve their dreams. We believe in fostering a
            supportive community where women can learn, grow, and inspire one
            another.
          </p>
        </div>

        {/* Who We ARE  */}
        <div className=" flex flex-col justify-center items-center p-24 overflow-hidden bg-cover bg-no-repeat bg-[url('/Images/women4.jpg')] bg-fixed">
          <h1 className="my-5 text-3xl font-bold tracking-tight md:text-7xl xl:text-7xl text-white">
            Who We Are
          </h1>
          <div className=" grid lg:grid-cols-2 gap-10 my-10">
            <div className=" flex flex-col justify-center items-center bg-white p-5 rounded-xl">
              <h1 className="my-5 text-2xl font-bold tracking-tight md:text-3xl xl:text-3xl">
                Educational Courses
              </h1>
              <p className=" text-justify ">
                Explore our curated courses designed to enhance skills, boost
                confidence, and foster personal and professional development.
                Our courses cover a range of topics, from career advancement to
                personal well-being.
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center bg-white p-5 rounded-xl">
              <h1 className="my-5 text-2xl font-bold tracking-tight md:text-3xl xl:text-3xl">
                Mentorship Programs
              </h1>
              <p className=" text-justify ">
                Connect with experienced mentors who are committed to guiding
                and supporting you on your journey. Our mentors bring a wealth
                of knowledge and real-world experience to help you navigate
                challenges and reach your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
