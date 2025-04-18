import axios from "axios";

const api = axios.create({
  baseURL: "https://eventhub-1qmq.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
