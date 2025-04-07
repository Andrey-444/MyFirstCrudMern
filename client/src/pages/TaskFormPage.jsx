import { useForm } from "react-hook-form"
import { useTask, } from "../context/taskContext"
import { useNavigate } from "react-router"


export const TaskFormPage = () => {
  const { register, handleSubmit } = useForm()
  const {createTask} = useTask()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    createTask(data)
    navigate('/tasks')
  })
  return (
    <div className='flex h-[calc(100vh-50px)] items-center justify-center bg-zinc-900'>
      <div className='flex bg-zinc-700 max-w-md w-full p-10 items-center justify-center text-center'>

        <form onSubmit={onSubmit}> <h1 className=" text-white font-extrabold from-neutral-700 p-4 m-2  ">TAREAS</h1>
          <input type="text" placeholder="title"
            {...register("title")}
            className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md"
            autoFocus />

          <textarea name="" id="" placeholder="description"
            {...register("description")}
            className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md" ></textarea>

          <button className=' bg-green-500 text-white px-6 py-2 my-3 rounded-md justify-center '>save</button>
        </form>
      </div>
    </div>
  )
}
