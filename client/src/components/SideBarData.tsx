import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import PeopleIcon from "@material-ui/icons/People";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MessageIcon from "@material-ui/icons/Message";
import SettingsIcon from "@material-ui/icons/Settings";

export const SideBarData = [
  {
    title: "Feed",
    icon: <HomeIcon />,
    link: "/feed",
  },
  {
    title: "Educational Content",
    icon: <CastForEducationIcon />,
    link: "/educational-content",
  },
  {
    title: "Companies",
    icon: <BusinessCenterIcon />,
    link: "/companies",
  },
  {
    title: "People",
    icon: <PeopleIcon />,
    link: "/people",
  },
  {
    title: "Deliverables",
    icon: <TurnedInIcon />,
    link: "/deliverables",
  },
  {
    title: "Calendar",
    icon: <CalendarTodayIcon />,
    link: "/calendar",
  },
  {
    title: "Messages",
    icon: <MessageIcon />,
    link: "/messages",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/settings",
  },
];
