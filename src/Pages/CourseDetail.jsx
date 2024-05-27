import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASEURL } from "../Utils/BaseUrl";
import toast from "react-hot-toast";
import profile from "/Images/profile.jpg";
// import Stripe from "stripe";
import {
  useStripe,
  CardElement,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import Checkout from "../Components/Checkout";
import Chat from "../Components/Chat";
import { io } from "socket.io-client";

const stripePromise = loadStripe(
  "pk_test_51MqAR9AaUQ4WyfXOQEq7XO6LKUoTsdTycKGed2oCsthMwjbvOT8GrZNQ4NxklNsO6VIkyeQUjJD5loawReFoHdwd000AEPBns9"
);
const socket = io("http://localhost:5000"); // Adjust the URL based on your server configuration

const CourseDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();

  const id = useParams();

  const [course, setCourse] = useState();
  const [chatModule, setChatModule] = useState(false);
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secret, setSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showChat, setShowChat] = useState(false); // State for chat visibility

  // State variables
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  console.log(messages);
  // Function to send a message via socket
  const sendMessage = (message) => {
    console.log(message);
    socket.emit("sendMsg", { text: message });
  };

  // Effect hook for receiving messages via socket
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setMessages([...messages, data.text]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [messages]);

  // Effect hook for online users via socket
  useEffect(() => {
    socket.on("onlineUsers", ({ users }) => {
      console.log("Online users:", users);
    });
    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const fetchPreviousMessages = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/chat/getMessages`, {
        // Add any necessary parameters
      });
      setPreviousMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  };

  useEffect(() => {
    fetchPreviousMessages();
  }, [comment]);

  /////////////// fetching course detail ////////////

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/blogs/blog/${id.id}`);
      console.log(response.data.data);
      setCourse(response?.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [comment]);

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
    if (user) {
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
    } else {
      navigate("/login");
    }
  };
  ///////////////////// Payment //////////////////////////

  const handleBuynow = async (e) => {
    e.preventDefault();
    const reqPacket = {
      amount: course?.price,
      currency: "USD",
      email: user?.email,
      userId: user?.id,
    };

    if (user) {
      try {
        const response = await axios.post(
          `${BASEURL}/api/payment/createPayment`,
          reqPacket
        );
        console.log(response);

        if (response.status === 200) {
          setSecret(response?.data.clientSecret);
          setShowCheckout(true);
        }

        if (error) {
          console.error(error);
          toast.error("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {showCheckout && (
        <Elements stripe={stripePromise} options={{ clientSecret: secret }}>
          <Checkout />
        </Elements>
      )}
      <div className="mt-6 bg-gray-50 relative">
        <div className="px-10 py-6 mx-auto">
          {/* Post Author */}
          <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
            <a href="#_" className="block ">
              <img
                className="object-cover w-full shadow-sm h-[500px]"
                // src={course?.image}
                src={`${BASEURL}/blog/${course?.image}`}
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
              <div className="flex justify-between items-center gap-3 mt-2">
                <div className=" flex  justify-between items-center gap-3 mt-2">
                  <p className=" font-medium text-xl "> Course Price: </p>
                  <p className="text-xl text-green-500 font-bold bg-gray-100 rounded-full py-2 px-3 hover:text-red-500">
                    $ {course?.price}
                  </p>
                </div>
                <button
                  onClick={handleBuynow}
                  className="py-2 px-4 bg-pink-700 hover:bg-pink-500 text-white rounded"
                >
                  Buy Now
                </button>
              </div>
              <div className="flex justify-between items-center gap-3 mt-2">
                <div className=" flex  justify-between items-center gap-3 mt-2">
                  <p className=" font-medium text-xl "> Course Instructor </p>
                  <p className="text-xl text-green-500 font-bold bg-gray-100 rounded-full py-2 px-3 hover:text-red-500">
                    {course?.authorId?.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="max-w-4xl px-10 mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
              {/* Content Body */}
              <div>
                <p className="pt-5 font-bold">Course Detail:</p>
              </div>
              <div>
                <p className=" p-8">{course?.description}</p>
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
                  className=" caret-pink-500 w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-pink-500 focus:outline-none"
                  placeholder="Write your comment"
                  rows="5"
                  cols="33"
                ></textarea>
                <button
                  type="submit"
                  name="submit"
                  className="text-white px-4 py-3 bg-pink-500 rounded-lg"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>
          <div></div>

          {/* Comments */}
          <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100 bg-white min-w-screen animation-fade animation-delay px-0 px-8 mx-auto sm:px-12 xl:px-5">
            <p className="mt-1 text-2xl font-bold text-left text-gray-900 md:text-2xl">
              Course Reviews
            </p>

            <ul className="mt-6 ">
              {course?.comments?.map((comment, index) => (
                <li key={index} className="flex flex-col mt-6">
                  <div className="flex items-center">
                    <img
                      src={profile}
                      alt="Profile"
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <h3 className="ml-4 text-sm font-medium text-gray-900">
                      {comment?.userId?.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-gray-600">{comment?.message}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Button */}
          <button
            onClick={toggleChat}
            className="fixed bottom-5 right-5 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
          >
            {showChat ? "Close Chat" : "Open Chat"}
          </button>

          {/* Chat Container */}
          {showChat && (
            <div className="fixed bottom-16 right-5 z-50 bg-white shadow-lg rounded-lg w-80 h-96 p-4">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`my-2 p-2 rounded-lg ${
                        message.type === "user" // Check if the message is sent by the user
                          ? "bg-blue-200 text-blue-900 self-end" // Apply user's message styling
                          : "bg-gray-200 text-gray-900" // Apply received message styling
                      }`}
                    >
                      <p className=" text-black"> {message}</p>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center mt-4"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-lg p-2"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
