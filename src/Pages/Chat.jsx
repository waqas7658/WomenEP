// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import { BASEURL } from "../Utils/BaseUrl";

// const Chat = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [socket, setSocket] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user.id);

//   useEffect(() => {
//     // Fetch contacts when the component mounts
//     fetchContacts();
//     // Initialize socket connection
//     const newSocket = io("http://localhost:5000");
//     setSocket(newSocket);
//     return () => newSocket.close(); // Close socket connection when component unmounts
//   }, []);

//   // Fetch contacts from the backend
//   const fetchContacts = async () => {
//     try {
//       const response = await axios.post(`${BASEURL}/api/chat/getContacts`);
//       console.log(response.data.contacts);
//       setContacts(response.data.contacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   // Fetch messages between the current user and the selected contact
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (selectedContact) {
//         try {
//           const response = await axios.post(
//             `${BASEURL}/api/chat/getContactMessages`,
//             {
//               userId: user?.id,
//               reciepentId: selectedContact?._id,
//             }
//           );
//           console.log(response.data.messages);
//           setMessages(response.data.messages.messages);
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       }
//     };
//     fetchMessages();
//   }, [selectedContact]);

//   // Send message to the selected contact
//   // Send message to the selected contact
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       const messageData = {
//         senderId: user?.id,
//         receiverId: selectedContact?._id,
//         text: newMessage,
//       };
//       socket.emit("sendMsg", messageData);
//       setMessages((prevMessages) => [...prevMessages, messageData]);
//       setNewMessage("");
//     }
//   };

//   useEffect(() => {
//     if (!socket) return;
//     socket.on("getMessage", (data) => {
//       // Update messages state with the new message
//       setMessages((prevMessages) => [...prevMessages, data.newMessages]);
//     });
//     return () => socket.off("getMessage");
//   }, [socket]);

//   // Select a contact to display messages
//   const handleContactClick = (contact) => {
//     setSelectedContact(contact);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white border-r border-gray-300">
//         {/* Sidebar Header */}
//         <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
//           <h1 className="text-2xl font-semibold">Chat Web</h1>
//         </header>

//         {/* Contact List */}
//         <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
//           {/* Contacts */}
//           <ul>
//             {contacts.map((contact) => (
//               <li
//                 key={contact._id}
//                 onClick={() => handleContactClick(contact)}
//                 className={`py-2 px-4 cursor-pointer ${
//                   selectedContact === contact ? "bg-gray-200" : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   {console.log(contacts)}

//                   {contact.name}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1">
//         {/* Chat Header */}
//         <header className="bg-white p-4 text-gray-700">
//           <h1 className="text-2xl font-semibold">
//             {selectedContact ? selectedContact.name : "Chat"}
//           </h1>
//         </header>

//         {/* Chat Messages */}
//         {/* Chat Messages */}
//         <div className="h-screen overflow-y-auto p-4 pb-36">
//           <ul>
//             {messages.map((message, index) => (
//               <li
//                 key={index}
//                 className={`mb-2 ${
//                   message.senderId === user.id
//                     ? "flex justify-end"
//                     : "flex justify-start"
//                 }`}
//               >
//                 <div
//                   className={`bg-slate-500 p-3 rounded ${
//                     message.senderId === user.id ? "text-white" : ""
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Chat Input */}
//         <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
//           <div className="flex items-center">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button
//               className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
//               onClick={handleSendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { BASEURL } from "../Utils/BaseUrl";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);

  useEffect(() => {
    // Fetch contacts when the component mounts
    fetchContacts();
    // Initialize socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.close(); // Close socket connection when component unmounts
  }, []);

  // Fetch contacts from the backend
  const fetchContacts = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/chat/getContacts`);
      console.log(response.data.contacts);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Fetch messages between the current user and the selected contact
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedContact) {
        try {
          const response = await axios.post(
            `${BASEURL}/api/chat/getContactMessages`,
            {
              userId: user?.id,
              reciepentId: selectedContact?._id,
            }
          );
          console.log(response.data.messages);
          setMessages(response.data.messages.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [selectedContact, user?.id]);

  // Send message to the selected contact
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        senderId: user?.id,
        receiverId: selectedContact?._id,
        text: newMessage,
      };
      socket.emit("sendMsg", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (data) => {
      // Update messages state with the new message
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => socket.off("getMessage");
  }, [socket]);

  // Select a contact to display messages
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat</h1>
        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {/* Contacts */}
          <ul>
            {contacts.map((contact) => (
              <li
                key={contact._id}
                onClick={() => handleContactClick(contact)}
                className={`py-2 px-4 cursor-pointer ${
                  selectedContact === contact ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {contact.name[0]}
                  </div>
                  <div>{contact.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 relative">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">
            {selectedContact ? selectedContact.name : "Chat"}
          </h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className={`mb-2 flex ${
                  message.sender === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === user.id
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {message.text}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
