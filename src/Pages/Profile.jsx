import React, { useEffect, useState } from "react";
import { BASEURL } from "../Utils/BaseUrl";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import EditProfile from "../Components/EditProfile";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  const [profileData, setProfileData] = useState();
  const [edit, SetEdit] = useState(false);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/user/getUserProfile/${user?.id}`
      );
      setProfileData(response?.data.user);
      console.log(response?.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [edit]);

  return (
    <>
      <div className="bg-gray-100 h-[100vh]">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div>
                  <button
                    onClick={() => {
                      SetEdit(true);
                    }}
                  >
                    <FaUserEdit className=" h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    // src={profileData?.image}
                    src={`${BASEURL}/user/${profileData?.image}`}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">{profileData?.name}</h1>
                </div>
                <hr className="my-6 border-t border-gray-300" />

                <p>
                  Email: <span>{profileData?.email}</span>
                </p>
                <p>
                  Phone: <span>{profileData?.phone}</span>
                </p>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              {edit ? (
                <EditProfile SetEdit={SetEdit} />
              ) : (
                <div className="bg-white shadow rounded-lg p-6">
                  <h1 classNameName=" text-black text-4xl">Bought Courses</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
