// src/socket.js
import { io } from "socket.io-client";

// Replace with your backend server URL
const SERVER_URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export const socket = io(SERVER_URL);
