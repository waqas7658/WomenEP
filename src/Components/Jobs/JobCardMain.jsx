// JobCard.js

import axios from "axios";
import React from "react";
import { BASEURL } from "../../Utils/BaseUrl";
import toast, { Toaster } from "react-hot-toast";

const JobCardMain = ({ job }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const handleApplyJob = async (jobId, user) => {
    console.log(jobId, "==========", user);
    const reqPacket = {
      applicantId: user?.id,
      careerId: jobId,
    };
    console.log(reqPacket);
    try {
      if (user) {
        const response = await axios.post(
          `${BASEURL}/api/career/career-development-apply`,
          reqPacket
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("Email sent");
        }
      } else {
        toast.error("Please login first");
      }
    } catch (error) {
      // Extract the error message from the error object
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white">
      <Toaster />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Job Title: {job.name}</div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold mb-1">Goals:</h2>
          <ul className="list-disc list-inside">
            {job.goals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold mb-1">Trainings:</h2>
          <ul className="list-disc list-inside">
            {job.trainings.map((training, index) => (
              <li key={index}>
                {training.title} -{" "}
                {new Date(training.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-1">Qualifications:</h2>
          <ul className="list-disc list-inside">
            {job.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>
        <div className=" my-2">
          <button
            onClick={() => handleApplyJob(job?._id, user)}
            className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardMain;
