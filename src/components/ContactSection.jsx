"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { LuMail, LuPhone, LuSend } from "react-icons/lu";
import { contactData } from "@/database/ContactSection";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
    } else {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    const SERVICE_ID = contactData.emailjs.SERVICE_ID;
    const TEMPLATE_ID = contactData.emailjs.TEMPLATE_ID;
    const PUBLIC_KEY = contactData.emailjs.PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: contactData.emailjs.to_name,
      message: message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setName("");
        setEmail("");
        setMessage("");
        setStatus("success");
        setTimeout(() => setStatus(""), 3000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setStatus("error");
      });
  };

  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 animate-fade-in-up">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10">
        
        {/* LEFT COLUMN: Stage Identity & Decrypted Channels */}
        <div className="w-full md:w-1/2 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Retro Stage Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 pixel-border bg-bg-secondary text-accent-secondary font-pixel text-xs">
            <LuPhone className="text-accent-secondary animate-glow-pulse" size={14} />
            <span className="tracking-widest uppercase">STAGE 05 // SECURE SIGNAL</span>
          </div>

          {/* Title and Decryption Readout */}
          <div className="space-y-3">
            <h1 className="font-pixel text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed">
              {contactData.heading1} <br />
              <span className="text-accent-primary animate-glow-pulse">{contactData.heading2}</span>
            </h1>
            <p className="font-terminal text-text-secondary text-sm sm:text-base leading-relaxed pl-4 border-l-4 border-accent-secondary/20">
              {contactData.description}
            </p>
          </div>

          {/* Copyable Resource Box */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 pixel-border bg-bg-secondary/90 hover:shadow-neon-pink hover:border-accent-secondary transition-all duration-300">
              <div className="p-2 border border-accent-primary/20 text-accent-primary bg-bg-primary">
                <LuMail className="text-accent-primary" size={20} />
              </div>
              <div 
                className="relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setCopied(false);
                }}
              >
                <p className={`font-terminal text-xs tracking-wider font-bold transition-colors duration-150 ${
                  copied 
                    ? "text-accent-secondary animate-glow-pulse" 
                    : isHovered 
                      ? "text-accent-tertiary" 
                      : "text-accent-primary"
                }`}>
                  {copied 
                    ? "[ 👾 COPIED TO CLIPBOARD! ]" 
                    : isHovered 
                      ? "[ 🎮 CLICK TO COPY ADDRESS ]" 
                      : "[ ENCRYPTED DIRECTORY ]"
                  }
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="font-terminal text-base font-bold text-white hover:text-accent-primary transition-colors cursor-pointer block text-left focus:outline-hidden mt-0.5"
                >
                  {contactData.email}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Terminal Transmitter Form */}
        <div className="w-full md:w-1/2 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 pixel-border-pink p-6 md:p-8 bg-bg-secondary/90 backdrop-blur-sm hover:shadow-neon-pink hover:border-accent-secondary transition-all duration-300"
          >
            {/* Header Readout */}
            <div className="border-b border-phosphor-green/20 pb-3 mb-2 font-terminal text-[10px] text-phosphor-green flex justify-between select-none">
              <span>COMMUNICATION TRANSMITTER</span>
              <span className="animate-blink">● SYSTEM READY</span>
            </div>

            {/* Input fields */}
            <div className="space-y-1.5">
              <label className="font-terminal text-accent-primary text-xs uppercase tracking-wider font-bold">0x01. YOUR NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 font-terminal text-sm border-2 ${errors.name ? 'border-red-500' : 'border-phosphor-green/20'} bg-bg-primary text-phosphor-green focus:outline-none focus:border-accent-primary placeholder:text-phosphor-green/30 transition-all font-bold`}
                placeholder="ENTER VISITOR IDENTITY..."
              />
              {errors.name && <p className="text-red-500 font-terminal text-xxs mt-1">ERROR: {errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="font-terminal text-accent-primary text-xs uppercase tracking-wider font-bold">0x02. EMAIL PORT</label>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2.5 font-terminal text-sm border-2 ${errors.email ? 'border-red-500' : 'border-phosphor-green/20'} bg-bg-primary text-phosphor-green focus:outline-none focus:border-accent-primary placeholder:text-phosphor-green/30 transition-all font-bold`}
                placeholder="ENTER EMAIL COORDINATES..."
              />
              {errors.email && <p className="text-red-500 font-terminal text-xxs mt-1">ERROR: {errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="font-terminal text-accent-primary text-xs uppercase tracking-wider font-bold">0x03. TRANSMISSION PACKET</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className={`w-full px-4 py-2.5 font-terminal text-sm border-2 ${errors.message ? 'border-red-500' : 'border-phosphor-green/20'} bg-bg-primary text-phosphor-green focus:outline-none focus:border-accent-primary placeholder:text-phosphor-green/30 transition-all resize-none font-bold`}
                placeholder="TYPE RETRO MESSAGES..."
              />
              {errors.message && <p className="text-red-500 font-terminal text-xxs mt-1">ERROR: {errors.message}</p>}
            </div>

            {/* Submit Trigger */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3.5 font-pixel text-xs border-2 border-accent-primary bg-accent-primary text-bg-primary hover:bg-bg-secondary hover:text-accent-primary hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 uppercase font-bold flex items-center justify-center space-x-2 disabled:opacity-50 select-none cursor-pointer"
            >
              {status === "sending" ? (
                <span className="animate-pulse">TRANSMITTING...</span>
              ) : status === "success" ? (
                <span>STAGE SUCCESS: MESSAGE SENT!</span>
              ) : (
                <>
                  <span>SEND SIGNAL</span>
                  <LuSend size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
