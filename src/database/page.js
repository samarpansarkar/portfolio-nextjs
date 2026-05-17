import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuInstagram, LuLinkedin } from "react-icons/lu";

export const heroData = {
  terminalText: `> INITIALIZING DEVELOPER PROFILE...
> NAME: SAMARPAN SARKAR
> ROLE: FULL STACK DEVELOPER
> STATUS: READY FOR NEW CHALLENGES
> _`,
  playerName: "SAMARPAN SARKAR",
  level: "LVL 9-10",
  socialLinks: [
    {
      icon: <FaXTwitter size={24} />,
      href: "https://x.com/Samarpan_209",
      color: "cyan",
    },
    {
      icon: <LuLinkedin size={24} />,
      href: "https://www.linkedin.com/in/samarpan-sarkar-",
      color: "pink",
    },
    {
      icon: <LuInstagram size={24} />,
      href: "https://www.instagram.com/samarpan_209/",
      color: "yellow",
    },
    {
      icon: <LuFacebook size={24} />,
      href: "https://www.facebook.com/samrpan.sarkar/",
      color: "cyan",
    },
  ],
};
