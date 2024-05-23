import React from "react";
import MentorCourses from "../Components/MentorCourses/MentorCourses";
import Safety from "../Components/Safety/Safety";

const Mentor = () => {
  return (
    <>
      <section className="community-form our_mission   py-20">
        <MentorCourses />
        <Safety />
      </section>
    </>
  );
};

export default Mentor;
