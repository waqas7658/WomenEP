import React, { useState, useEffect } from "react";
import api from "../../Utils/ChatApi";
import axios from "axios";
import { BASEURL } from "../../Utils/BaseUrl";

const ChatWindow = ({ conversationId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log(messages);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(`${BASEURL}/api/chat/getMessages`, {
          conversationId,
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data.newMessages]);
    });
  }, []);

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/chat/sendMsg`, {
        senderId: userId,
        receiverId: "RECEIVER_ID", // Replace with actual receiver ID
        text: newMessage,
      });
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id}>
            <b>{msg.sender.username}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
