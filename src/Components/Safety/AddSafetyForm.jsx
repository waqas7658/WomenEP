import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASEURL } from "../../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";

const AddSafetyForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [safetyData, setSafetyData] = useState({
    title: "",
    description: "",
    authorId: user?.id,
    location: "",
    date: "",
    image: null, // Changed to null for the file input
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setSafetyData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", safetyData.title);
    formData.append("description", safetyData.description);
    formData.append("authorId", safetyData.authorId);
    formData.append("location", safetyData.location);
    formData.append("date", safetyData.date);
    formData.append("image", safetyData.image);

    try {
      const res = await axios.post(
        `${BASEURL}/api/safety/createSafety`,
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
        setSafetyData({
          title: "",
          description: "",
          authorId: user?.id,
          location: "",
          date: "",
          image: null,
        });

        toast.success("Safety program added successfully!");
        navigate("/safety");
      } else {
        toast.error("Error adding safety program. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding safety program. Please try again.");
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
            value={safetyData.title}
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
            value={safetyData.description}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={safetyData.location}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={safetyData.date}
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

export default AddSafetyForm;
