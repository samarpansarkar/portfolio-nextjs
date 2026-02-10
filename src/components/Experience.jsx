import { LuBriefcase, LuCalendar, LuGraduationCap } from "react-icons/lu";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      type: "education",
      title: "Bachelor of Technology",
      subtitle: "Computer Science & Engineering",
      organization: "University Name",
      date: "2021 - 2025",
      description:
        "Focused on Data Structures, Algorithms, and Web Technologies. Maintained a CGPA of 8.5.",
      icon: <LuGraduationCap size={20} />,
    },
    {
      id: 2,
      type: "work",
      title: "Frontend Developer Intern",
      subtitle: "Tech Company",
      organization: "Remote",
      date: "Jan 2024 - Present",
      description:
        "Developing responsive web applications using React and Tailwind CSS. Collaborating with cross-functional teams.",
      icon: <LuBriefcase size={20} />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-accent-primary/10 rounded-full">
          <LuBriefcase className="text-accent-primary" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">
          Experience & <span className="text-accent-secondary">Education</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-slate-700 ml-4 md:ml-6 space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-12 group">
            <div
              className={`absolute -left-2.25 top-0 w-4 h-4 rounded-full border-2 border-slate-900 transition-colors duration-300 ${
                exp.type === "work"
                  ? "bg-accent-primary"
                  : "bg-accent-secondary"
              }`}
            ></div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-accent-primary/30 transition-all duration-300 hover:bg-slate-800/50">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-2 rounded-lg ${
                      exp.type === "work"
                        ? "bg-accent-primary/10 text-accent-primary"
                        : "bg-accent-secondary/10 text-accent-secondary"
                    }`}
                  >
                    {exp.icon}
                  </span>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                </div>
                <p className="text-lg text-slate-300 font-medium">
                  {exp.subtitle}
                </p>
                <p className="text-sm text-slate-400">{exp.organization}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-2 min-w-fit">
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full">
                  <LuCalendar size={14} />
                  <span>{exp.date}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-slate-400 leading-relaxed pl-2 border-l-2 border-slate-700/50">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
