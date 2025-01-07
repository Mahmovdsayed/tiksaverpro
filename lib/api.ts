import axios from "axios";

const api = axios.create({
  baseURL: "https://tiksaverpro.vercel.app",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
