import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

// export const updateTaskRequest = async (task, id) =>
//     axios.put(`/tasks/${id}`, task);
export const updateTaskRequest = async (task) =>
    axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);//no le pasamos el task porque solo necesitamos el id

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
