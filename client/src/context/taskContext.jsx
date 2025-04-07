import { createContext, useContext, useState, } from 'react'
import { createTaskRequest, deleteTaskRequest, getTasksRequest } from '../api/tasks';
import { useAuth } from './authContext';
const TaskContext = createContext();

//boilerplate code esto significa que es un codigo que se repite mucho
// y que se puede reutilizar
export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context;
}


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    // const { isAuthenticated, user } = useAuth();

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data)
            console.log(res.data)
        } catch (error) {
            console.error(error.response.data)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTasks([...tasks, res.data]) //
            console.log(res.data)
        } catch (error) {
            console.error(error.response.data)
        }
    }


    // useEffect(() => {
    //     if (isAuthenticated) {
    //       getTasks();
    //     } else {
    //       setTasks([]);
    //     }
    //   }, [isAuthenticated, user]);

    const deleteTask = async (id) => {
        // const res = await deleteTaskRequest(id)
        // console.log(res);
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 200) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const clearTasks = () => {
        setTasks([]); // Limpia el estado de las tareas
    };

    return (
        <TaskContext.Provider value={
            {
                tasks,
                createTask,
                getTasks,
                deleteTask,
                clearTasks
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}
