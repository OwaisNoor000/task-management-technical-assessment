import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";


export default function Avatar(){
    const [menuDisplay,setMenuDisplay] = useState<"none"|"block">("none");

    const toggleMenu = ()=>{
        console.log("works");
        menuDisplay==="none"?setMenuDisplay("block"):setMenuDisplay("none");
    }

    return (
        <div className="flex flex-row items-center relative hover:bg-gray-600 hover:cursor-pointer rounded-xl" onClick={toggleMenu}>
            <div className=" m-2 p-6 w-[30px] h-[30px] rounded-full  bg-[#5297FF] text-white font-bold
            flex flex-row justify-center items-center">
                ON
            </div >
            <span className="m-2 font-bold text-white text-lg">Owais Noor</span>
            
        {/*Dropdown Menu */}
            <div className="absolute  bg-[#1E1E1E] border-white border-2 bottom-0 translate-y-25 left-0 rounded-2xl" style={{display:menuDisplay}}>
                <div className="mx-5 my-2 text-white text-md font-bold flex flex-row items-center hover:bg-gray-600 hover:cursor-pointer">
                    <FaEye className="mr-5 text-2xl"/>
                    View Profile
                </div>        
                    <hr className="text-white"/>
                <div className="mx-5 my-2 text-white text-md font-bold flex flex-row items-center hover:bg-gray-600 hover:cursor-pointer">
                    <IoLogOut className="mr-5 text-2xl"/>
                    Log Out
                </div>        
            </div>
            
            
        </div>
    )
}