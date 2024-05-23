import { useNavigate } from "react-router-dom";
import courseImage from "/Images/courseImage.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { BASEURL } from "../../Utils/BaseUrl";

const SafetyCard = ({ item, setSafety }) => {
  const navigate = useNavigate();
  const { _id, title, description, image, location, date } = item;

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${BASEURL}/api/safety/deleteSafety/${id}`
      );
      if (response.status == 200) {
        console.log(response);
        toast.success("Safety Program Deleted Successfully");
        setSafety((prevSafety) =>
          prevSafety.filter((safety) => safety._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
      <a href="#">
        {image ? (
          <img
            className="rounded-t-lg h-[300px] w-full object-cover"
            src={`http://localhost:5000/safety/${image}`}
            alt={title}
          />
        ) : (
          <img
            className="rounded-t-lg h-[300px] w-full object-cover"
            src={courseImage}
            alt="Default Course"
          />
        )}
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 line-clamp-1">
            {title}
          </h5>
        </a>
        <p className="font-normal text-gray-700 mb-3 line-clamp-3">
          {description}
        </p>
        <p className="font-normal text-gray-700 mb-3">Location: {location}</p>
        <p className="font-normal text-gray-700 mb-3">
          Date: {new Date(date).toLocaleDateString()}
        </p>
        <button
          onClick={() => navigate(`/courseDetail/${_id}`)}
          className="text-white bg-pink-700 hover:bg-pink-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
        >
          Read more
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="ms-3 text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

SafetyCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string.isRequired,
  }).isRequired,
  setSafety: PropTypes.func.isRequired,
};

export default SafetyCard;
