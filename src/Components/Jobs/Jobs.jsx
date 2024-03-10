import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Courses/CommunityForm.css";

import { BASEURL } from "../../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";

import JobCardMain from "./JobCardMain";
const Jobs = () => {
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
                    {jobs?.slice(0, 4).map((item, index) => (
                        <JobCardMain key={index} job={item} />
                    ))}
                </div>
                <div className=" flex justify-center items-center">
                    <button
                        onClick={() => {
                            navigate("/career");
                        }}
                        className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
                    >
                        Load More
                    </button>
                </div>
            </section>
        </>
    );
};

export default Jobs;
