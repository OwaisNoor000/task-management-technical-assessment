import { Avatar, Menu, Icon,Box } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

export default function AvatarPreview(){
    return(
    <Menu.Root>
      <Menu.Trigger rounded="full" focusRing="outside" _hover={{cursor:"pointer",scale:"110%"}}>
        <Avatar.Root size="md">
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
      </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content backgroundColor={"#262626"} border={"2px solid white"}>
             <Menu.Item value="cut">
              <Icon color={"white"}><IoIosSettings /></Icon>
              <Box flex="1" color={"white"}>View Profile</Box>
            </Menu.Item>
            <Menu.Item value="copy">
              <Icon color={"white"}><IoIosLogOut /></Icon>
              <Box flex="1" color={"white"}>Log out</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
    </Menu.Root>
    )
}