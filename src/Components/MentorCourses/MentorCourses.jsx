import React, { useEffect, useState } from "react";
import MentorCourseCard from "./MentorCourseCard/MentorCourseCard";
import { Link } from "react-router-dom";
import { BASEURL } from "../../Utils/BaseUrl";
import axios from "axios";
import FormCard from "../Courses/FormCard/FormCard";

const MentorCourses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(courses);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/blogs/getBlogsByMentorId/${user.id}`
        );

        setCourses(response?.data.data);
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
          {courses.map((item, index) => (
            <FormCard key={index} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MentorCourses;
