import React from "react";
import MainBanner from "../Components/MainBanner/MainBanner";

import OurMission from "../Components/OurMission/OurMission";
import Courses from "../Components/Courses/Courses";
import Jobs from "../Components/Jobs/Jobs";

const Home = () => {
  return (
    <>
      <MainBanner />
      <OurMission />

      <Courses />
      <Jobs />
    </>
  );
};

export default Home;
