import axios from "axios";

export const createRoom = async (data) => {
  const response = await axios.post("http://localhost:3001/rooms", data);
  return response.data;
};

export const joinRoom = async (id, password) => {
  const response = await axios.get(
    `http://localhost:3001/rooms?id=${id}&password=${password}`
  );
  return response.data;
};

export const getUsersRoom = async (id) => {
  const response = await axios.get(`http://localhost:3001/rooms/users/${id}`);
  return response.data;
};
