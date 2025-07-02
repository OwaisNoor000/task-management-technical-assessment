import Sidebar from "../components/Sidebar";
import TaskInbox from "../components/TaskInbox";
import TaskContextProvider from "../hooks/TaskContext";

export default function MainPage(){

    return(
        <TaskContextProvider>
        <div className="h-lvh w-lvw flex flex-row">
            <Sidebar/>
            <div className="flex flex-col justify-start items-center h-full w-full bg-[#1E1E1E]">
                <TaskInbox/>
            </div>
        </div>
        </TaskContextProvider>
    )
}