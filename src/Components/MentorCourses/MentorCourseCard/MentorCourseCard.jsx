import React from "react";
import { useNavigate } from "react-router-dom";
const MentorCourseCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 line-clamp-1">
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
            <p className="font-normal text-gray-700 mb-3 line-clamp-3">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <button
              onClick={() => {
                navigate("/formDetail/1");
              }}
              className="text-white bg-pink-700 hover:bg-pink-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorCourseCard;
