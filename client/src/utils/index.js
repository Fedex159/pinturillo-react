import axios from "axios";

export const createRoom = async (data) => {
  const response = await axios.post("http://localhost:3001/rooms", data);
  return response.data;
};
