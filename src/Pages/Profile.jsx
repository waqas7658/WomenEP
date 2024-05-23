import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import EditProfile from "../Components/EditProfile";
import toast from "react-hot-toast";
import JobForm from "../Components/Jobs/JobForm";
import JobCard from "../Components/Jobs/JobCard";
import WellnessCard from "../Components/Wellness/WellnessCard";
import { BASEURL } from "../Utils/BaseUrl";
import WellnessForm from "../Components/Wellness/WellnessForm";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profileData, setProfileData] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showWellness, setShowWellness] = useState(false);
  const [wellness, setWellness] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/user/getUserProfile/${user?.id}`);
      setProfileData(response?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCareerJobs = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/career/career-development/user/${user?.id}`);
      setJobData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWellness = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/wellness/getWellness/${user?.id}`);
      setWellness(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`${BASEURL}/api/career/career-development/${jobId}`);
      toast.success("Job Deleted Successfully");
      setJobData(jobData.filter(job => job._id !== jobId));
    } catch (error) {
      console.log("error", error);
      toast.error("Unable To Delete The Job. Please Try Again!");
    }
  };

  const deleteWellness = async (wellnessId) => {
    try {
      await axios.delete(`${BASEURL}/api/wellness/deleteWellness/${wellnessId}`);
      toast.success("Wellness Program Deleted Successfully");
      setWellness(wellness.filter(item => item._id !== wellnessId));
    } catch (error) {
      console.log("error", error);
      toast.error("Unable To Delete The Wellness Program. Please Try Again!");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCareerJobs();
    fetchWellness();
  }, [edit]);

  const handleJob = () => {
    setShowJob(!showJob);
  };

  const handleWellness = () => {
    setShowWellness(!showWellness);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div>
                <button onClick={() => setEdit(true)}>
                  <FaUserEdit className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={`${BASEURL}/user/${profileData?.image}`}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="profile"
                />
                <h1 className="text-xl font-bold">{profileData?.name}</h1>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <p>Email: <span>{profileData?.email}</span></p>
              <p>Phone: <span>{profileData?.phone}</span></p>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            {edit ? (
              <EditProfile setEdit={setEdit} />
            ) : (
              <div className="">
                <div className="bg-white shadow rounded-lg p-6">
                  <h1 className="text-black text-2xl">Bought Courses</h1>
                </div>
                <div className="bg-white shadow rounded-lg p-6 my-5">
                  <h1 className="text-black text-2xl font-bold">Post Job</h1>
                  <div className="text-right">
                    <button onClick={handleJob} className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded">
                      {showJob ? "Cancel" : "Add Job"}
                    </button>
                  </div>
                  <div>
                    {showJob ? (
                      <JobForm setShowJob={setShowJob} showJob={showJob} />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {jobData.map((job, index) => (
                          <JobCard key={index} job={job} onDelete={deleteJob} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h1 className="text-black text-2xl font-bold">Personal Wellness</h1>
                  <div className="text-right">
                    <button onClick={handleWellness} className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded">
                      {showWellness ? "Cancel" : "Add Wellness"}
                    </button>
                  </div>
                  {showWellness ? (
                    <WellnessForm setShowWellness={setShowWellness} showWellness={showWellness} />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {wellness.map((item, index) => (
                        <WellnessCard key={index} item={item} onDelete={deleteWellness} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
