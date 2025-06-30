import {
  Button,
  CloseButton,
  Drawer,
  For,
  HStack,
  Portal,
} from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react";
import { BsLayoutSidebar } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import AvatarPreview from "./AvatarPreview";
import SidebarItems from "./SidebarItems";

export default function Sidebar(){
  return (
          <Drawer.Root key={"top"} placement={"start"} size="md">
            <Drawer.Trigger asChild>
              <Button variant="outline" size="sm">
                Open 
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner >
                <Drawer.Content
                  roundedBottom={"top" === "top" ? "l3" : undefined}
                backgroundColor={"#262626"}
                >
                  <Drawer.Header style={{padding:"0px"}}>
                        <chakra.div display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}
                        width={"100%"} margin={"20px"}>
                            
                            <chakra.div display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <AvatarPreview/>
                                <chakra.span margin={"20px"} fontWeight={"bold"} fontSize={"lg"} color={"white"}>Segun Adebayo</chakra.span>
                            </chakra.div>    
                            <div className="flex flex-row justify-center items-center">
                                <CiBellOn style={{height:"35px",width:"35px",margin:"0 10px 0 10px"}} color="white" fontWeight={"bold"}
                                cursor={"pointer"}/>
                                <Drawer.CloseTrigger asChild pos="initial" cursor={"pointer"}>
                                    <BsLayoutSidebar style={{height:"30px",width:"30px",margin:"0 10px 0 10px"}}
                                    color="white"/>
                                </Drawer.CloseTrigger>
                            </div>
                        </chakra.div>
                    </Drawer.Header>

                    <Drawer.Body>
                        <SidebarItems/>
                  </Drawer.Body>
                  <Drawer.Footer>
                  
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
  )
}
