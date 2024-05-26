// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { BASEURL } from "../../Utils/BaseUrl";

// const SafetyDetail = () => {
//   const { id } = useParams();
//   const [safetyProgram, setSafetyProgram] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSafetyProgram = async () => {
//       try {
//         const response = await axios.get(
//           `${BASEURL}/api/safety/getSpecificSafety/${id}`
//         );
//         setSafetyProgram(response.data.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSafetyProgram();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8">
//         <h2 className="text-2xl font-semibold mb-4">{safetyProgram.title}</h2>
//         <img
//           src={`${BASEURL}/safety/${safetyProgram.image}`}
//           alt={safetyProgram.title}
//           className="mb-4 rounded-lg w-full h-[20rem] object-cover"
//         />
//         <p className="text-gray-700 mb-4">
//           {" "}
//           <span className="  font-semibold">Description: </span>
//           {safetyProgram.description}
//         </p>
//         <p className="text-gray-700 mb-4">
//           <span className=" font-semibold">Location:</span>{" "}
//           {safetyProgram.location}
//         </p>
//         <p className="text-gray-700 mb-4">
//           <span className=" font-semibold">Date:</span>{" "}
//           {new Date(safetyProgram.date).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SafetyDetail;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BASEURL } from "../../Utils/BaseUrl";

// Fix the default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SafetyDetail = () => {
  const { id } = useParams();
  const [safetyProgram, setSafetyProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchSafetyProgram = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/safety/getSpecificSafety/${id}`
        );
        setSafetyProgram(response.data.data);
        const location = response.data.data.location;
        geocodeAddress(location);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafetyProgram();
  }, [id]);

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: "json",
          },
        }
      );
      const data = response.data;
      if (data && data.length > 0) {
        const location = data[0];
        setCoordinates({
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">{safetyProgram.title}</h2>
        <img
          src={`${BASEURL}/safety/${safetyProgram.image}`}
          alt={safetyProgram.title}
          className="mb-4 rounded-lg w-full h-[20rem] object-cover"
        />
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Description: </span>
          {safetyProgram.description}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Location:</span>
          {safetyProgram.location}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Date:</span>
          {new Date(safetyProgram.date).toLocaleDateString()}
        </p>
        {coordinates && (
          <MapContainer
            center={coordinates}
            zoom={15}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates}>
              <Popup>{safetyProgram.location}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default SafetyDetail;
