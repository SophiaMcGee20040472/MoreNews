import {
  ChatIcon,
  EmailIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa6";
import { FaNewspaper, FaClipboardList, FaUser } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { styles } from "../styles/styles";
export const iconMap = {
  HomeIcon: <FaHome style={styles.icon} />,           
  NewIcon: <FaNewspaper style={styles.icon} />, 
  PastIcon: <FaClipboardList style={styles.icon} />, 
  ChatIcon: <ChatIcon mr={2} style={styles.icon}/>,  
  SubmitIcon: <EmailIcon style={styles.icon} />,             
  ShowIcon: <FaAlignCenter mr={2} style={styles.icon}  />,             
  TimeIcon: <TimeIcon mr={2} color="#ff7600" />,     
  JobIcon:<FaBriefcase mr={2} style={styles.icon}/>,
  FaUser: <FaUser style={styles.icon} />, 
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
    path: "Comments",
  },
    {
    name: "JOBS",
    icon: "JobIcon", 
    path: "/Jobs",
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
