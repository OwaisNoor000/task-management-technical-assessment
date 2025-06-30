import {chakra} from "@chakra-ui/react";

export default function TaskInbox(){
    return(
        <chakra.div width={"50%"} minHeight={"50%"} display={"flex"} flexDirection={"flex-column"} margin={"100px 30px 20px 30px"}
         backgroundColor={"red"}>
            <chakra.span fontSize={"50px"} color={"white"}>Today</chakra.span>
            <chakra.span>Today</chakra.span>

        </chakra.div>
    )
}