import { LuBriefcase, LuGraduationCap } from "react-icons/lu";

export const experienceData = [
  {
    id: 1,
    type: "education",
    title: "Bachelor of Technology",
    subtitle: "Computer Science & Engineering",
    organization: "Maulana Abul Kalam Azad University of Technology",
    date: "2019 - 2023",
    description:
      "Focused on Data Structures, Algorithms, and Web Technologies. Maintained a CGPA of 8.91",
    icon: <LuGraduationCap size={20} />,
  },
  {
    id: 2,
    type: "work",
    title: "Frontend Developer",
    subtitle: "Nayagara Technologies",
    organization: "Bengaluru, Karnataka",
    date: "June 2023 - March 2026",
    description:
      "Developing responsive web applications using React and Tailwind CSS. Collaborating with cross-functional teams.",
    icon: <LuBriefcase size={20} />,
  },
];
