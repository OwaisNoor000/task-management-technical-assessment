import Task from "./Task";
import { IoMdAdd } from "react-icons/io";
import TaskForm from "./TaskForm";


export default function TaskInbox(){
    return (
        <div className="w-2/3 min-h-[500px] mt-24  p-4">
            <span className="text-4xl font-bold text-white">Inbox</span>
            <Task/>

            <div className="flex flex-row items-center text-xl text-gray-300 hover:text-[#DE4C4A] hover:cursor-pointer">
                <IoMdAdd className="text-gray-300 mx-2 text-2xl"/>
                <span className="">Add Task</span>
            </div>
            <TaskForm/>
        </div>
    )
}