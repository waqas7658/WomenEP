import React, { useState } from "react";
import axios from "axios";
import { BASEURL } from "../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProfile = ({ SetEdit }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  // States to store form data
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send files (like images)
    const formData = new FormData();

    formData.append("userId", user?.id);
    formData.append("name", name);
    formData.append("phone", phone);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        `${BASEURL}/api/user/updateUserProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      if (response.status == 200) {
        toast.success("Profile Updated Successfully");
        console.log("Response from API:", response.data);
        SetEdit(false);
        navigate("/profile");
      }
    } catch (error) {
      // Handle errors
      console.error("Error posting data:", error);
    }
  };

  // Function to handle file input change
  const handleImageChange = (e) => {
    // Get the first selected file from the input
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full caret-pink-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Phone:</span>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full caret-pink-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 border rounded w-full caret-pink-500"
          />
        </label>

        <button
          type="submit"
          className="bg-pink-700 text-white p-2 rounded hover:bg-pink-500 focus:outline-none focus:shadow-outline-blue active:bg-pink-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
