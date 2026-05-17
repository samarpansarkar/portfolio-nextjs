import {
  LuGamepad2,
  LuHouse,
  LuLightbulb,
  LuLock,
  LuPhone,
  LuUser,
} from "react-icons/lu";

export const navbarData = {
  logoText1: "S",
  logoText2: "S",
  logoSubtext: "DEV.EXE",
  playerText: "1UP",
  highScore: "HI 999999",
  navLinks: [
    { path: "/#home", label: "HOME", icon: <LuHouse size={16} /> },
    { path: "/#about", icon: <LuUser size={16} />, label: "ABOUT" },
    {
      path: "/#skills",
      icon: <LuLightbulb size={16} />,
      label: "SKILLS",
    },
    {
      path: "/#contact",
      icon: <LuPhone size={16} />,
      label: "CONTACT",
    },
    {
      path: "/arcade",
      icon: <LuGamepad2 size={16} />,
      label: "ARCADE",
    },
    {
      path: "/samarpan/admin/login",
      icon: <LuLock size={16} />,
      label: "ADMIN",
    },
  ],
};
