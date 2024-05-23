import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Utils/BaseUrl";
import SafetyMainCard from "../Components/Safety/SafetyMainCard";

const SafetyAndLegal = () => {
  const [safetyPrograms, setSafetyPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSafetyPrograms = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/safety/getAllSafety`);
        setSafetyPrograms(response?.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafetyPrograms();
  }, []);

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
          {safetyPrograms.map((item) => (
            <SafetyMainCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SafetyAndLegal;
