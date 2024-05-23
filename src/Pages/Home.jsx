import React from "react";
import MainBanner from "../Components/MainBanner/MainBanner";

import OurMission from "../Components/OurMission/OurMission";
import Courses from "../Components/Courses/Courses";
import Jobs from "../Components/Jobs/Jobs";
import SafetyMain from "../Components/Safety/SafetyMain";

const Home = () => {
  return (
    <>
      <MainBanner />
      <OurMission />

      <Courses />
      <Jobs />
      <SafetyMain />
    </>
  );
};

export default Home;
