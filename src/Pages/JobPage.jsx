import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/Courses/CommunityForm.css";


import { useNavigate } from "react-router-dom";


import { BASEURL } from "../Utils/BaseUrl";
import JobCardMain from "../Components/Jobs/JobCardMain";
const JobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(jobs);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/api/career/career-development`);

                setJobs(response?.data);
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
                        Career
                    </h1>
                </div>

                <div className=" grid lg:grid-cols-4 gap-2 p-10 ">
                    {jobs?.map((item, index) => (
                        <JobCardMain key={index} job={item} />
                    ))}
                </div>

            </section>
        </>
    );
};

export default JobPage;
