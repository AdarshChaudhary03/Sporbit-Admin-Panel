import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Pay and Play",
    path: "/pay&play",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Academies",
    path: "/academies",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Sign Out",
    path: "/",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
