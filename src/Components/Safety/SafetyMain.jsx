import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Courses/CommunityForm.css";
import { BASEURL } from "../../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import SafetyMainCard from "./SafetyMainCard";

const SafetyMain = () => {
  const [safetyPrograms, setSafetyPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/safety/getAllSafety`);
        setSafetyPrograms(response?.data.data);
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
      <section className="community-form our_mission py-20">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="lg:text-[5rem] text-[2rem] font-[900] text-white drop-shadow-xl">
            Safety Programs
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-2 p-10">
          {safetyPrograms.slice(0, 4).map((item, index) => (
            <SafetyMainCard key={index} item={item} />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => navigate("/safetyAndLegalSupport")}
            className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default SafetyMain;
