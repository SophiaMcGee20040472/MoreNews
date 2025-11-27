import {
  ChatIcon,
  EmailIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa6";
import { FaNewspaper, FaClipboardList, FaUser } from "react-icons/fa";

export const iconMap = {
  HomeIcon: <FaHome style={{ marginRight: "8px", color: "#ff7600" }} />,           
  NewIcon: <FaNewspaper style={{ marginRight: "8px", color: "#ff7600" }} />, 
  PastIcon: <FaClipboardList style={{ marginRight: "8px", color: "#ff7600" }} />, 
  ChatIcon: <ChatIcon mr={2} color="#ff7600" />,  
  SubmitIcon: <EmailIcon style={{ marginRight: "8px", color: "#ff7600" }} />,             
  ShowIcon: <FaAlignCenter mr={2} style={{ marginRight: "8px", color: "#ff7600" }}  />,             
  TimeIcon: <TimeIcon mr={2} color="#ff7600" />,         
  FaUser: <FaUser style={{ marginRight: "8px", color: "#ff7600" }} />, 
};

export const navItems = [
  {
    name: "HOME",
    icon: "HomeIcon",  
    path: "/home",
  },
  {
    name: "NEW ",
    icon: "NewIcon", 
    path: "/New",
  },
  {
    name: "PAST",
    icon: "PastIcon", 
    path: "/Past",
  },
  {
    name: "ASK US",
    icon: "ChatIcon", 
    path: "/ask",
  },
  {
    name: "SHOW US",
    icon: "ShowIcon", 
    path: "/Show",
  },
  {
    name: "COMMENTS",
    icon: "TimeIcon", 
    path: "/Comments",
  },
  {
    name: "SUBMIT",
    icon: "SubmitIcon", 
    path: "/Submit",
  },
  {
    name: "LOGIN",
    icon: "FaUser", 
    path: "/Login",
  },
];
