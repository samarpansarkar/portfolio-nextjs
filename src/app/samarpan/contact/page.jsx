"use client";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { LuMail, LuPhone, LuSend } from "react-icons/lu";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    const SERVICE_ID = "service_k57rv1a";
    const TEMPLATE_ID = "template_1fhl5yt";
    const PUBLIC_KEY = "KGA50qE-Dfc9S-GEq";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "samarpan",
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

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 animate-fade-in-up">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">
        {/* Contact Info */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
            <LuPhone className="text-accent-primary" size={18} />
            <span className="text-sm font-medium text-slate-300">Contact</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Le&#39;s Work <br />
              <span className="text-accent-secondary">Together</span>
            </h1>
            <p className="text-lg text-slate-400">
              Have a project in mind or just want to say hi? I&#39;d love to
              hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div className="p-3 bg-accent-primary/10 rounded-full">
                <LuMail className="text-accent-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Email me at</p>
                <a
                  href="mailto:samarpansarkar2005@gmail.com"
                  className="text-lg font-medium text-white hover:text-accent-primary transition-colors"
                >
                  samarpansarkar2005@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-accent-primary text-white placeholder-slate-500 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-accent-primary text-white placeholder-slate-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-accent-primary text-white placeholder-slate-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {status === "sending" ? (
                <span>Sending...</span>
              ) : status === "success" ? (
                <span>Message Sent!</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <LuSend size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
