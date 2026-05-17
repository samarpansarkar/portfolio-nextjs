"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { LuMail, LuPhone, LuSend } from "react-icons/lu";

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
    <section id="contact" className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 animate-fade-in-up">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">
        {/* Contact Info */}
        <div className="w-full md:w-1/2 space-y-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full border border-primary/10">
            <LuPhone className="text-accent-primary" size={18} />
            <span className="text-sm font-medium text-secondary">Contact</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Le&#39;s Work <br />
              <span className="text-accent-secondary">Together</span>
            </h1>
            <p className="text-lg text-secondary">
              Have a project in mind or just want to say hi? I&#39;d love to
              hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 glass rounded-xl border border-primary/10 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="p-3 bg-accent-primary/10 rounded-full">
                <LuMail className="text-accent-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-secondary">Email me at</p>
                <a
                  href="mailto:samarpansarkar2005@gmail.com"
                  className="text-lg font-medium text-primary hover:text-accent-primary transition-colors"
                >
                  samarpansarkar2005@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 glass p-8 rounded-2xl border border-primary/10 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 glass border ${errors.name ? 'border-red-500' : 'border-primary/10'} rounded-lg focus:outline-none focus:border-accent-primary text-primary placeholder:text-secondary/50 transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 glass border ${errors.email ? 'border-red-500' : 'border-primary/10'} rounded-lg focus:outline-none focus:border-accent-primary text-primary placeholder:text-secondary/50 transition-colors`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">
                Message
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className={`w-full px-4 py-3 glass border ${errors.message ? 'border-red-500' : 'border-primary/10'} rounded-lg focus:outline-none focus:border-accent-primary text-primary placeholder:text-secondary/50 transition-colors resize-none`}
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-linear-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50"
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
    </section>
  );
};
export default ContactSection;
