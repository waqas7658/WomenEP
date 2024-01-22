import React from "react";
import { useNavigate } from "react-router-dom";
import courseImage from "/Images/courseImage.jpg";
const FormCard = ({ item }) => {
  const navigate = useNavigate();

  const { _id, title, description, image, isFree, price, comment } = item;

  return (
    <>
      <div className="">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
          <a href="#">
            {image ? (
              <img
                className="rounded-t-lg h-[300px] w-full object-cover"
                // src={item?.image}
                // src={`http://localhost:5000/${image.replace("\\", "/")}`}
                src={`http://localhost:5000/blog/${image}`}
                alt=""
              />
            ) : (
              <img className="rounded-t-lg" src={courseImage} alt="" />
            )}
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 line-clamp-1">
                {title}
              </h5>
            </a>
            <p className="font-normal text-gray-700 mb-3 line-clamp-1">
              {description}
            </p>
            <p className="font-normal text-gray-700 mb-3 line-clamp-1">
              Price: {price}
            </p>
            <button
              onClick={() => {
                navigate(`/courseDetail/${_id}`);
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

export default FormCard;
