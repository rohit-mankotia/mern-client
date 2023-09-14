import axios from "axios";

const URL = "https://mern-server-gl64.onrender.com";
// const URL = "http://localhost:4000";

const jwtToken = localStorage.getItem("token");

const APICall = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwtToken}`, // Set the "Authorization" header with the JWT token
  },
});

const get = async (endpoint) => {
  try {
    const res = await APICall.get(endpoint);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const post = async (endpoint, data) => {
  try {
    const res = await APICall.post(endpoint, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { get, post };
