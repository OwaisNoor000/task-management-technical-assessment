import AutoresizeInput from "./AutoresizeInput";
import { IoTodayOutline } from "react-icons/io5";
import { CiFlag1 } from "react-icons/ci";
import PriorityDropDownList from "./PriorityDDList";
import CalendarDropdown from "./CalenderDD";

export default function TaskForm(){
    return (
        <div className="w-full border-2 border-gray-300 flex flex-col rounded-xl h-fit mt-4">
           <input className="border-0 focus:outline-none w-full h-10 my-1 text-gray-300 pl-4
           text-lg font-bold" placeholder="Enter an actionable Task"/>
           <AutoresizeInput className="border-0 focus:outline-none h-9 my-1 text-gray-400 pl-4
           text-lg max-h-[200px] resize-none overflow-hidden" placeholder="Description"
           />
           
           <div className="flex flex-row m-3">
                <div className="flex flex-row items-ned justify-center border-1 rounded-lg p-2 border-gray-500
                space-x-3 hover:bg-gray-500 hover:cursor-pointer m-2">
                    <IoTodayOutline className="text-white text-2xl"/>
                    <span className="text-white">Today</span>
                </div>
                <div className="flex flex-row items-ned justify-center border-1 rounded-lg p-2 border-gray-500
                space-x-3 hover:bg-gray-500 hover:cursor-pointer m-2">
                    <IoTodayOutline className="text-white text-2xl"/>
                    <span className="text-white">Tomorrow</span>
                </div>
                <CalendarDropdown>
                    <div className="flex flex-row items-ned justify-center border-1 rounded-lg p-2 border-gray-500
                    space-x-3 hover:bg-gray-500 hover:cursor-pointer m-2">
                        <IoTodayOutline className="text-white text-2xl"/>
                        <span className="text-white">Date</span>
                    </div>
                </CalendarDropdown>
                <PriorityDropDownList>
                    <div className="flex flex-row items-ned justify-center border-1 rounded-lg p-2 border-gray-500
                space-x-3 hover:bg-gray-500 hover:cursor-pointer m-2">
                        <CiFlag1 className="text-white text-2xl"/>
                        <span className="text-white">Priority</span>
                    </div>
                </PriorityDropDownList>
           </div>
           <div>
                <hr className="text-white"/>
                <div className="flex flex-row justify-end items-center p-3">
                    <button className="py-2 px-4 m-3 m rounded-lg bg-gray-500 font-bold text-white
                    hover:bg-gray-400 hover:cursor-pointer">Cancel</button>
                    <button className="py-2 px-4 m-3 m rounded-lg bg-[#DE4C4A] font-bold text-white
                    hover:bg-red-400 hover:cursor-pointer">Save Task</button>
                </div>
           </div>
        </div>
    )
}