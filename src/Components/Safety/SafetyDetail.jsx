import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Utils/BaseUrl";

const SafetyDetail = () => {
  const { id } = useParams();
  const [safetyProgram, setSafetyProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSafetyProgram = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/safety/getSpecificSafety/${id}`
        );
        setSafetyProgram(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafetyProgram();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">{safetyProgram.title}</h2>
        <img
          src={`${BASEURL}/safety/${safetyProgram.image}`}
          alt={safetyProgram.title}
          className="mb-4 rounded-lg"
        />
        <p className="text-gray-700 mb-4">{safetyProgram.description}</p>
        <p className="text-gray-700 mb-4">Location: {safetyProgram.location}</p>
        <p className="text-gray-700 mb-4">
          Date: {new Date(safetyProgram.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SafetyDetail;
