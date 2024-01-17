import React, { useEffect, useState } from "react";
import MentorCourseCard from "./MentorCourseCard/MentorCourseCard";
import { Link } from "react-router-dom";
import { BASEURL } from "../../Utils/BaseUrl";
import axios from "axios";

const MentorCourses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(blogData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/blogs/blog/659e9d1e027d6bec6db2a3fb`
        );

        setBlogData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <section className="community-form our_mission   py-20">
        <div className=" flex flex-col justify-center items-center  gap-5">
          <h1 className=" lg:text-[5rem]  text-[2rem] font-[900] text-white drop-shadow-xl">
            Mentor
          </h1>
        </div>
        <div className=" flex justify-start px-10">
          <Link
            to="/addcourse"
            className=" py-2 px-4 bg-pink-700 hover:bg-pink-500  text-white rounded"
          >
            ADD COURSE
          </Link>
        </div>
        <div className=" grid lg:grid-cols-4 gap-2 p-10 ">
          <MentorCourseCard />
        </div>
      </section>
    </>
  );
};

export default MentorCourses;