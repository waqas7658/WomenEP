import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const Chat = (recieverId) => {
  console.log(recieverId)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  console.log(loggedInUser?.id);
  console.log(messages)
  useEffect(() => {
    // Listen for incoming messages
    socket.on("check", (message) => {
      setMessages([...messages, message]);
    });

    // Clean up function
    return () => {
      socket.off("message");
    };
  }, [messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Emit the message to the server
      socket.emit("sendMsg", { text: message, recieverId, senderId: loggedInUser?.id });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-80 bg-gray-100 text-gray-800 z-20">
      {/* <!-- Component Start --> */}
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {/* Display messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex w-full mt-2 space-x-3 max-w-xs justify-end"
            >
              <div className="bg-blue-600 text-white rounded-l-lg rounded-br-lg p-3">
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                {/* Display timestamp */}
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>

        {/* Input field for sending messages */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 p-4 flex items-center"
        >
          <input
            value={message}
            onChange={handleChange}
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Send
          </button>
        </form>
      </div>
      {/* <!-- Component End  --> */}
    </div>
  );
};

export default Chat;
