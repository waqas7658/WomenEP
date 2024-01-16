import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASEURL } from "../../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    authorId: user?.id,
    price: "",
    image: null, // Changed to null for the file input
    isFree: false,
  });
  console.log(courseData.isFree);
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setCourseData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseData?.title);
    formData.append("description", courseData?.description);
    formData.append("authorId", courseData?.authorId);
    formData.append("isFree", courseData?.isFree);
    formData.append("price", courseData?.price);
    formData.append("image", courseData?.image);

    try {
      const res = await axios.post(
        `${BASEURL}/api/blogs/createBlog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        // Clear the form states after successful submission
        setCourseData({
          title: "",
          description: "",
          authorId: user?.id,
          price: "",
          image: null,
          isFree: false,
        });

        toast.success("Course added successfully!");
        navigate("/mentor");
      } else {
        toast.error("Error adding course. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding course. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Is Free?</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="published-yes"
              name="isFree"
              value={true}
              checked={courseData.isFree === true}
              onChange={handleChange}
              className="mr-2 text-pink-500"
            />
            <label htmlFor="published-yes" className="mr-4">
              Yes
            </label>
            <input
              type="radio"
              id="published-no"
              name="isFree"
              value={false}
              checked={courseData.isFree === false}
              onChange={handleChange}
              className="mr-2 text-pink-500"
            />
            <label htmlFor="published-no">No</label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
