import axios from "axios";

export const createRoom = async (data) => {
  const response = await axios.post("/rooms", data);
  return response.data;
};

export const joinRoom = async (id, password) => {
  const response = await axios.get(`/rooms?id=${id}&password=${password}`);
  return response.data;
};

export const getUsersRoom = async (id) => {
  const response = await axios.get(`/rooms/users/${id}`);
  return response.data;
};

export const getWords = async () => {
  const response = await axios.get("/words");
  return response.data;
};
