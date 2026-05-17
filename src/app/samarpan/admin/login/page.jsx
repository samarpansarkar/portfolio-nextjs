"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { LuGamepad, LuShieldAlert, LuTerminal, LuUser } from "react-icons/lu";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/samarpan/admin");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("👾 Please insert username & password!");
      return;
    }

    setLoading(true);
    const loadToast = toast.loading("🎮 Authenticating player...");

    try {
      const response = await axios.post("/api/admin/login", {
        username,
        password,
      });

      if (response.data?.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("🔓 Access Granted! Welcome back.", { id: loadToast });
        router.push("/samarpan/admin");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid credentials!";
      toast.error(`❌ System Alert: ${errorMsg}`, { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-200px)] py-10 px-4'>
      <div className='w-full max-w-md relative'>
        {/* Glow behind the cabinet */}
        <div className='absolute -inset-4 rounded-3xl bg-linear-to-br from-accent-primary/25 via-accent-secondary/25 to-accent-tertiary/25 blur-xl opacity-80 animate-glow-pulse'></div>

        <div className='relative crt-frame'>
          <div className='crt-screen bg-bg-primary/90 p-8 flex flex-col items-center'>
            
            {/* Retro arcade header info */}
            <div className='w-full flex justify-between items-center mb-6 pb-2 border-b border-accent-secondary/30'>
              <div className='flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-accent-secondary animate-glow-pulse'></span>
                <span className='font-terminal text-accent-secondary text-xs tracking-widest'>SECURE AREA</span>
              </div>
              <span className='font-terminal text-accent-tertiary text-xs tracking-widest'>PORT: 3000</span>
            </div>

            {/* Cabinet branding/marquee */}
            <div className='w-full text-center mb-8'>
              <div className='inline-block pixel-border-pink p-3 bg-bg-secondary/60 mb-3 hover:scale-105 transition-all duration-300'>
                <LuGamepad className='text-accent-secondary animate-bounce h-12 w-12 mx-auto' />
              </div>
              <h1 className='font-pixel text-xl md:text-2xl text-gradient tracking-wide mb-1'>
                ADMIN SYSTEM
              </h1>
              <p className='font-terminal text-phosphor-green text-sm tracking-wider uppercase animate-glow-pulse'>
                -- PLAYER 1 AUTHORIZATION --
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className='w-full space-y-6'>
              <div className='space-y-2'>
                <label className='font-pixel text-xxs text-accent-primary flex items-center gap-2'>
                  <LuUser className='inline-block' /> USERNAME
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='ENTER OPERATOR NAME'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    className='w-full p-3 font-terminal text-base tracking-wider bg-bg-secondary/90 border-2 border-accent-primary rounded-lg text-text-primary focus:outline-hidden focus:border-accent-secondary focus:shadow-neon-pink transition-all'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='font-pixel text-xxs text-accent-primary flex items-center gap-2'>
                  <LuShieldAlert className='inline-block' /> ACCESS CODE
                </label>
                <input
                  type='password'
                  placeholder='ENTER SECURITY KEY'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className='w-full p-3 font-terminal text-base tracking-widest bg-bg-secondary/90 border-2 border-accent-primary rounded-lg text-text-primary focus:outline-hidden focus:border-accent-secondary focus:shadow-neon-pink transition-all'
                />
              </div>

              {/* Submit button decorated like arcade "Insert Coin" button */}
              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full font-pixel text-xs p-4 border-4 border-accent-secondary bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary hover:shadow-neon-pink hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer text-center relative group flex justify-center items-center gap-2'
                >
                  <LuTerminal className='animate-pulse' />
                  <span>{loading ? "CONNECTING..." : "▶ INSERT COIN ◀"}</span>
                </button>
              </div>
            </form>

            <div className='mt-8 text-center font-terminal text-xxs text-text-secondary tracking-widest'>
              SYSTEM SHUTDOWN CAPABILITY: ENABLED
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
