import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASEURL } from "../Utils/BaseUrl";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const id = useParams();

  const [course, setCourse] = useState();
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/blogs/blog/${id.id}`);

        setCourse(response?.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  ///////////////  Posting comment //////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      userId: user?.id,
      blogId: id?.id,
      message: comment,
    };

    try {
      const response = await axios.post(
        `${BASEURL}/api/blogs/addComment`,
        requestData
      );

      if (response.status == 200) {
        console.log(response);
        toast.success("Commented Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-6 bg-gray-50">
        <div className="px-10 py-6 mx-auto">
          {/* Post Author */}
          <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
            <a
              href="#_"
              className="block transition duration-200 ease-out transform hover:scale-110"
            >
              <img
                className="object-cover w-full shadow-sm h-full"
                src={course?.image}
                alt="Banner"
              />
            </a>

            {/* Post Heading */}
            <div className="mt-2">
              <h1
                href="#"
                className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-pink-500 hover:underline"
              >
                {course?.title}
              </h1>

              {/* Post Views */}
              <div className="flex justify-start items-center gap-3 mt-2">
                <p className=" font-medium text-xl "> Course Price: </p>
                <p className="text-xl text-green-500 font-bold bg-gray-100 rounded-full py-2 px-3 hover:text-red-500">
                  {course?.price}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="max-w-4xl px-10 mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
              {/* Content Body */}
              <div>
                <p className="mt-2 p-8">{course?.description}</p>
              </div>
            </div>
          </div>

          {/* Comment Form */}
          <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
            <div className="w-full mt-16 md:mt-0">
              <form
                onSubmit={handleSubmit}
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
              >
                <h3 className="mb-6 text-2xl font-medium text-center">
                  Write a comment
                </h3>
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  name="comment"
                  className="w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                  placeholder="Write your comment"
                  rows="5"
                  cols="33"
                ></textarea>
                <button
                  type="submit"
                  name="submit"
                  className="text-white px-4 py-3 bg-blue-500 rounded-lg"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>

          {/* Comments */}
          <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100 bg-white min-w-screen animation-fade animation-delay px-0 px-8 mx-auto sm:px-12 xl:px-5">
            <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
              All comments on this post
            </p>

            {/* Comment 1 */}
            <div className="flex items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
              <a href="#" className="flex items-center mt-6 mb-6 mr-6">
                <img
                  src="https://avatars.githubusercontent.com/u/71964085?v=4"
                  alt="avatar"
                  className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                />
              </a>
              <div>
                <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                  By James Amos
                </h3>
                <p className="text-sm font-bold text-gray-300">
                  August 22, 2021
                </p>
                <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                  Please help with how you did the migrations for the blog
                  database fields. I tried mine using exactly what you
                  instructed but it's not working!!.
                </p>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
              <a href="#" className="flex items-center mt-6 mb-6 mr-6">
                <img
                  src="https://avatars.githubusercontent.com/u/71964085?v=4"
                  alt="avatar"
                  className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                />
              </a>
              <div>
                <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                  By James Amos
                </h3>
                <p className="text-sm font-bold text-gray-300">
                  August 22, 2021
                </p>
                <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                  Especially I don't understand the concepts of multiple models.
                  What really is the difference between the blog model and
                  blogApp model? Am stuck
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;