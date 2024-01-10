import React from "react";
import "../CommunityForm/CommunityForm.css";
import FormCard from "./FormCard/FormCard";
const CommunityForm = () => {
  return (
    <>
      <section className="community-form our_mission   py-20">
        <div className=" flex flex-col justify-center items-center  gap-5">
          <h1 className=" lg:text-[5rem]  text-[2rem] font-[900] text-white drop-shadow-xl">
            Community Forms
          </h1>
        </div>

        <div className=" grid grid-cols-4 gap-2 p-10 ">
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
        </div>
      </section>
    </>
  );
};

export default CommunityForm;
