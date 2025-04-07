import Task from '../models/task.model.js';

//el error de que aparezca las mismas tareas en todos los usuarios
//se soluciona con el populate, sirve para traer la informacion del usuario
//que creo la tarea

export const getTasks = async (req, res) => {
    const tasks = await Task.find(
        {user: req.user.id} //filtro para que solo muestre las tareas del usuario logueado
    ).populate('user');//para que muestre el nombre del usuario que creo la tarea
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id //importante ya que se necesita saber a que usuario pertenece la tarea
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
}
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
}

