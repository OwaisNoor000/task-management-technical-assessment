import AvatarPreview from "../components/AvatarPreview";
import Sidebar from "../components/Sidebar";
import TaskInbox from "../components/TaskInbox";
import {chakra} from "@chakra-ui/react";
import { Provider } from "../components/ui/provider";

export default function MainPage(){
    return (
        <Provider>
            <chakra.div height={"100vh"} width={"100vw"} backgroundColor={"#1E1E1E"}
            display={"flex"} flexDirection={"flex-column"} justifyContent={"center"} alignItems={"start"}>
                <Sidebar/>
                <TaskInbox/>
            </chakra.div>
        </Provider>
    )
}