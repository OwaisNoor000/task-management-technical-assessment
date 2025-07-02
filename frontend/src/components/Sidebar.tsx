import "../output.css";
import Avatar from "./Avatar";
import {BellIcon,HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Menu} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import TaskContextProvider, { TaskContext } from "../hooks/TaskContext";

export default function Sidebar(){

    return(
        <div className="h-full w-[400px] bg-[#262626] p-4 ">
            <div className="flex flex-row justify-between">
                <Avatar />
                <div className="flex flex-row items-center">
                    <BellIcon className="w-[30px] h-[30px] text-gray-300 m-2"/>
                    <HamburgerMenuIcon className="w-[30px] h-[30px] text-gray-300 m-2"/>
                </div>
            </div>
            <div className="h-10"></div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer">
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">Add Task</span>
            </div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer">
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">Inbox</span>
            </div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer">
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">Today</span>
            </div>


        </div>
    )
}