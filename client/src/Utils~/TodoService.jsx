import axios from "../Utils/axios";

const GetAllTodo = async (status) => {
  try {
    const response = await axios.get(`/api/todos/?status=${status}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { GetAllTodo };
