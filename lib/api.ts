import axios from "axios";

const api = axios.create({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
