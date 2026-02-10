import Link from "next/link";
import { LuGithub } from "react-icons/lu";

const Github = () => {
  return (
    <Link
      className="w-36 border border-black h-12 z-10 fixed bottom-6 md:bottom-10 rounded-l-full -right-1 flex justify-start hover:bg-[#3d373d] hover:text-[#ffffff] transition-all duration-200 active:bg-zinc-300"
      href="https://github.com/samarpansarkar"
      target="_blank"
    >
      <div className="h-fit p-2.5 pt-3">
        <LuGithub size={24} />
      </div>
      <div>
        <h1 className="text-left align-middle text-2xl font-semibold font-rubix pt-1.5 relative top-0.5">
          Github
        </h1>
      </div>
    </Link>
  );
};
export default Github;
