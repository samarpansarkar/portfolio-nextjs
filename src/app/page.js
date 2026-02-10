import Github from "@/components/Github";
import Resume from "@/components/Resume";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuInstagram, LuLinkedin } from "react-icons/lu";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-100px)]">
      <div className="w-full md:w-1/2 space-y-8 text-center md:text-left animate-fade-in-up">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium text-accent-primary tracking-wide">
            Hello,I&apos;m
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold font-rubik bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Samarpan
            <br />
            <span className="text-accent-secondary">Sarkar</span>
          </h1>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-200">
            Passionate Software Engineer
          </h3>
          <p className="text-lg text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Specializing in Web & Android Development. Building digital
            experiences that merge functionality with premium aesthetics.
          </p>
        </div>

        <div className="flex justify-center md:justify-start gap-4">
          {[
            {
              icon: <FaXTwitter size={20} />,
              href: "https://x.com/Samarpan_209",
            },
            {
              icon: <LuLinkedin size={20} />,
              href: "https://www.linkedin.com/in/samarpan-sarkar-",
            },
            {
              icon: <LuInstagram size={20} />,
              href: "https://www.instagram.com/samarpan_209/",
            },
            {
              icon: <LuFacebook size={20} />,
              href: "https://www.facebook.com/samrpan.sarkar/",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
          <Resume />
          <Github />
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end relative">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 bg-linear-to-tr from-accent-primary to-accent-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>

          <Image
            src="/icons/picofme.png"
            width={100}
            height={100}
            loading="eager"
            alt="Samarpan Sarkar"
            className="relative w-full h-full object-cover rounded-full border-2 border-slate-700/50 shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
