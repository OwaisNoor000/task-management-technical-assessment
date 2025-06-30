import { Stack,Icon } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import { IoMdAdd } from "react-icons/io";
import { FiInbox } from "react-icons/fi";
import { MdCalendarToday } from "react-icons/md";

export default function SidebarItems(){
    return(
        <Stack>
            <chakra.div display={"flex"} alignItems={"center"} borderRadius={"10px"} _hover={{backgroundColor:"#3C3C3C",cursor:"pointer"}}>
                <chakra.button backgroundColor={"#DE4C4A"} width={"40px"} height={"40px"} display={"flex"}
                justifyContent={"center"} alignItems={"center"} borderRadius={"50%"} margin={"20px"}>
                    <Icon size="lg"><IoMdAdd color="#262626" height={"20px"} width={"20px"}/></Icon>
                </chakra.button>
                <chakra.span color={"white"} fontSize={"20px"}>Add Task</chakra.span>
            </chakra.div>
            <chakra.div display={"flex"} alignItems={"center"} borderRadius={"10px"} _hover={{backgroundColor:"#3C3C3C",cursor:"pointer"}}>
                <chakra.button backgroundColor={"#DE4C4A"} width={"40px"} height={"40px"} display={"flex"}
                justifyContent={"center"} alignItems={"center"} borderRadius={"50%"} margin={"20px"}>
                    <Icon size="lg"><FiInbox color="#262626" height={"20px"} width={"20px"}/></Icon>
                </chakra.button>
                <chakra.span color={"white"} fontSize={"20px"}>Inbox</chakra.span>
            </chakra.div>
            <chakra.div display={"flex"} alignItems={"center"} borderRadius={"10px"} _hover={{backgroundColor:"#3C3C3C",cursor:"pointer"}}>
                <chakra.button backgroundColor={"#DE4C4A"} width={"40px"} height={"40px"} display={"flex"}
                justifyContent={"center"} alignItems={"center"} borderRadius={"50%"} margin={"20px"}>
                    <Icon size="lg"><MdCalendarToday color="#262626" height={"20px"} width={"20px"}/></Icon>
                </chakra.button>
                <chakra.span color={"white"} fontSize={"20px"}>Today</chakra.span>
            </chakra.div>
        </Stack>
    )
}