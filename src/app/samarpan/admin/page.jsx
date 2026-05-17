"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import API from "@/utils/AxiosInstance";
import { fetchProjects } from "@/redux/slices/ProjectSlice";
import { fetchSkills } from "@/redux/slices/skillSlice";
import {
  LuPlus,
  LuTrash2,
  LuPencil,
  LuLogOut,
  LuFolderGit2,
  LuSparkles,
  LuLayoutGrid,
  LuWrench,
  LuX,
  LuExternalLink,
} from "react-icons/lu";
import Image from "next/image";

const AdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Authentication check
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("👾 Unauthorized! Authenticate first.");
      router.push("/samarpan/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // Tab State
  const [activeTab, setActiveTab] = useState("projects"); // "projects" or "skills"

  // Redux state
  const { projects } = useSelector((state) => state.projects);
  const { skills } = useSelector((state) => state.skills);

  useEffect(() => {
    if (authChecked) {
      dispatch(fetchProjects());
      dispatch(fetchSkills());
    }
  }, [dispatch, authChecked]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("project"); // "project" or "skill"
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentId, setCurrentId] = useState(null);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionType: "",
    onConfirm: null,
  });

  // Form States - Projects
  const [projectForm, setProjectForm] = useState({
    name: "",
    image: "",
    stack: "",
    category: "Web",
    githubLink: "",
    liveLink: "",
  });

  // Form States - Skills
  const [skillForm, setSkillForm] = useState({
    name: "",
    icon: "",
    category: "Web Development",
  });

  const skillCategories = ["Web Development", "Languages", "Tools & Others"];
  const projectCategories = ["Web", "Full Stack"];

  // Open Add Modals
  const openAddModal = (type) => {
    setModalType(type);
    setModalMode("add");
    setCurrentId(null);
    if (type === "project") {
      setProjectForm({
        name: "",
        image: "",
        stack: "",
        category: "Web",
        githubLink: "",
        liveLink: "",
      });
    } else {
      setSkillForm({
        name: "",
        icon: "",
        category: "Web Development",
      });
    }
    setIsModalOpen(true);
  };

  // Open Edit Modals
  const openEditModal = (type, item) => {
    setModalType(type);
    setModalMode("edit");
    setCurrentId(item._id);
    if (type === "project") {
      setProjectForm({
        name: item.name || "",
        image: item.image || "",
        stack: Array.isArray(item.stack) ? item.stack.join(", ") : "",
        category: item.category || "Web",
        githubLink: item.githubLink || "",
        liveLink: item.liveLink || "",
      });
    } else {
      setSkillForm({
        name: item.name || "",
        icon: item.icon || "",
        category: item.category || "Web Development",
      });
    }
    setIsModalOpen(true);
  };

  // Form Submit Trigger Handler
  const handleFormSubmitTrigger = (e) => {
    e.preventDefault();

    // Quick client validation
    if (modalType === "project") {
      if (!projectForm.name || !projectForm.image || !projectForm.category || !projectForm.stack || !projectForm.githubLink || !projectForm.liveLink) {
        toast.error("👾 Please fill in all required fields!");
        return;
      }
    } else {
      if (!skillForm.name || !skillForm.icon || !skillForm.category) {
        toast.error("👾 Please fill in all required fields!");
        return;
      }
    }

    const title = modalMode === "add" ? "🎮 CREATE SEQUENCE 🎮" : "⚡ UPDATE SEQUENCE ⚡";
    const message = modalMode === "add"
      ? `DO YOU WANT TO INITIALIZE & CREATE THIS NEW ${modalType.toUpperCase()}?`
      : `DO YOU WANT TO COMPILE & OVERWRITE THIS EXISTING ${modalType.toUpperCase()}?`;

    setConfirmModal({
      isOpen: true,
      title,
      message,
      actionType: modalMode === "add" ? "create" : "update",
      onConfirm: () => executeFormSubmit(),
    });
  };

  // Actual Form Submit Execution
  const executeFormSubmit = async () => {
    const loadingToast = toast.loading("👾 Saving data...");

    try {
      if (modalType === "project") {
        const payload = {
          ...projectForm,
          stack: projectForm.stack.split(",").map((s) => s.trim()).filter(Boolean),
        };

        if (modalMode === "add") {
          await API.post("/projects", payload);
          toast.success("🎮 Project created successfully!", { id: loadingToast });
        } else {
          await API.put(`/projects/${currentId}`, payload);
          toast.success("⚡ Project updated successfully!", { id: loadingToast });
        }
        dispatch(fetchProjects());
      } else {
        if (modalMode === "add") {
          await API.post("/skills", skillForm);
          toast.success("🎮 Skill added successfully!", { id: loadingToast });
        } else {
          await API.put(`/skills/${currentId}`, skillForm);
          toast.success("⚡ Skill updated successfully!", { id: loadingToast });
        }
        dispatch(fetchSkills());
      }
      setIsModalOpen(false);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || "Failed to save.";
      toast.error(`❌ Error: ${errMsg}`, { id: loadingToast });
    }
  };

  // Delete Action Trigger Handler
  const handleDeleteTrigger = (type, id) => {
    setConfirmModal({
      isOpen: true,
      title: "💥 ERASE SEQUENCE 💥",
      message: `ARE YOU SURE YOU WANT TO PERMANENTLY ERASE THIS ${type.toUpperCase()}?`,
      actionType: "delete",
      onConfirm: () => executeDelete(type, id),
    });
  };

  // Actual Delete Execution
  const executeDelete = async (type, id) => {
    const loadingToast = toast.loading("💥 Erasing data...");
    try {
      if (type === "project") {
        await API.delete(`/projects/${id}`);
        toast.success("💥 Project deleted!", { id: loadingToast });
        dispatch(fetchProjects());
      } else {
        await API.delete(`/skills/${id}`);
        toast.success("💥 Skill deleted!", { id: loadingToast });
        dispatch(fetchSkills());
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || "Failed to delete.";
      toast.error(`❌ Error: ${errMsg}`, { id: loadingToast });
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("🔒 Logged out successfully!");
    router.push("/samarpan/admin/login");
  };

  if (!authChecked) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='font-pixel text-accent-primary animate-pulse'>LOADING ADMIN CONSOLE...</div>
      </div>
    );
  }

  return (
    <div className='space-y-10 py-8 px-4'>
      {/* Header controls bar */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b-4 border-accent-primary/20'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded bg-accent-primary/10 border-2 border-accent-primary shadow-neon-cyan'>
            <LuWrench className='text-accent-primary w-8 h-8 animate-spin' style={{ animationDuration: "6s" }} />
          </div>
          <div>
            <h1 className='font-pixel text-xl md:text-2xl text-gradient'>ADMIN CONSOLE</h1>
            <p className='font-terminal text-phosphor-green text-sm tracking-wider'>
              PLAYER 1 - SYSTEM OVERLORD MODE
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-4 justify-center'>
          <button
            onClick={() => openAddModal(activeTab === "projects" ? "project" : "skill")}
            className='font-pixel text-xxs px-4 py-3 border-4 border-accent-secondary bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary hover:shadow-neon-pink transition-all active:translate-y-1 cursor-pointer flex items-center gap-2'
          >
            <LuPlus /> ADD NEW {activeTab === "projects" ? "PROJECT" : "SKILL"}
          </button>
          
          <button
            onClick={handleLogout}
            className='font-pixel text-xxs px-4 py-3 border-4 border-accent-tertiary bg-bg-secondary text-accent-tertiary hover:bg-accent-tertiary hover:text-bg-primary hover:shadow-neon-yellow transition-all active:translate-y-1 cursor-pointer flex items-center gap-2'
          >
            <LuLogOut /> LOGOUT
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex justify-center gap-4'>
        <button
          onClick={() => setActiveTab("projects")}
          className={`font-pixel text-xs px-6 py-3 border-4 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === "projects"
              ? "border-accent-primary bg-accent-primary text-bg-primary shadow-neon-cyan"
              : "border-primary/10 bg-bg-secondary text-text-secondary hover:border-accent-primary/50"
          }`}
        >
          <LuFolderGit2 /> PROJECTS ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`font-pixel text-xs px-6 py-3 border-4 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === "skills"
              ? "border-accent-primary bg-accent-primary text-bg-primary shadow-neon-cyan"
              : "border-primary/10 bg-bg-secondary text-text-secondary hover:border-accent-primary/50"
          }`}
        >
          <LuSparkles /> SKILLS ({skills.length})
        </button>
      </div>

      {/* Grid displays */}
      <div className='crt-frame'>
        <div className='crt-screen bg-bg-primary/95 p-6 min-h-[400px]'>
          
          {/* Projects View */}
          {activeTab === "projects" && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {projects.length === 0 ? (
                <div className='col-span-full text-center py-20 font-terminal text-accent-tertiary text-lg'>
                  NO PROJECTS FOUND IN DATABASE. CLICK &quot;ADD NEW&quot;!
                </div>
              ) : (
                projects.map((proj) => (
                  <div key={proj._id} className='pixel-border bg-bg-secondary/60 p-4 relative group flex flex-col justify-between min-h-[300px]'>
                    <div>
                      <div className='relative w-full h-36 bg-bg-primary border border-accent-primary/20 rounded mb-4 overflow-hidden'>
                        <Image
                          src={proj.image}
                          alt={proj.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='flex justify-between items-start gap-2 mb-2'>
                        <h3 className='font-pixel text-sm text-accent-primary'>{proj.name}</h3>
                        <span className='font-terminal text-xxs text-accent-tertiary border border-accent-tertiary px-1 rounded'>
                          {proj.category}
                        </span>
                      </div>
                      <div className='flex flex-wrap gap-1 mb-4'>
                        {proj.stack.map((t, idx) => (
                          <span key={idx} className='font-terminal text-xxs bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded'>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='flex gap-2 pt-4 border-t border-accent-primary/10'>
                      <button
                        onClick={() => openEditModal("project", proj)}
                        className='flex-1 py-2 font-pixel text-xxs border-2 border-accent-tertiary bg-bg-secondary text-accent-tertiary hover:bg-accent-tertiary hover:text-bg-primary transition-all flex justify-center items-center gap-1.5 cursor-pointer'
                      >
                        <LuPencil size={12} /> EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteTrigger("project", proj._id)}
                        className='flex-1 py-2 font-pixel text-xxs border-2 border-accent-secondary bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary transition-all flex justify-center items-center gap-1.5 cursor-pointer'
                      >
                        <LuTrash2 size={12} /> DELETE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Skills View */}
          {activeTab === "skills" && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
              {skills.length === 0 ? (
                <div className='col-span-full text-center py-20 font-terminal text-accent-tertiary text-lg'>
                  NO SKILLS FOUND IN DATABASE. CLICK &quot;ADD NEW&quot;!
                </div>
              ) : (
                skills.map((skill) => (
                  <div key={skill._id} className='pixel-border-pink bg-bg-secondary/60 p-4 flex flex-col justify-between items-center text-center'>
                    <div className='w-12 h-12 relative mb-3'>
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <div className='space-y-1 mb-4'>
                      <h4 className='font-pixel text-xs text-text-primary'>{skill.name}</h4>
                      <p className='font-terminal text-xxs text-accent-secondary uppercase tracking-wider'>
                        {skill.category.replace("Development", "Dev")}
                      </p>
                    </div>

                    <div className='flex gap-2 w-full pt-3 border-t border-accent-secondary/10'>
                      <button
                        onClick={() => openEditModal("skill", skill)}
                        className='flex-1 py-1 text-center font-pixel text-xxs border border-accent-tertiary bg-bg-secondary text-accent-tertiary hover:bg-accent-tertiary hover:text-bg-primary transition-all flex justify-center items-center cursor-pointer'
                        title='Edit Skill'
                      >
                        <LuPencil size={10} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrigger("skill", skill._id)}
                        className='flex-1 py-1 text-center font-pixel text-xxs border border-accent-secondary bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary transition-all flex justify-center items-center cursor-pointer'
                        title='Delete Skill'
                      >
                        <LuTrash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {/* CRUD Pop-up Modal Cabinet */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm p-4 overflow-y-auto'>
          <div className='w-full max-w-lg relative my-8'>
            <div className='absolute -inset-2 bg-linear-to-r from-accent-primary to-accent-secondary rounded-2xl blur-md opacity-70 animate-glow-pulse'></div>
            
            <div className='relative crt-frame'>
              <div className='crt-screen bg-bg-secondary p-6'>
                <div className='flex justify-between items-center pb-3 border-b-2 border-accent-primary/20 mb-6'>
                  <h2 className='font-pixel text-sm md:text-base text-accent-primary flex items-center gap-2'>
                    <LuLayoutGrid /> {modalMode.toUpperCase()} {modalType.toUpperCase()}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='text-text-secondary hover:text-accent-secondary p-1 border-2 border-transparent hover:border-accent-secondary hover:bg-bg-primary rounded cursor-pointer'
                  >
                    <LuX size={18} />
                  </button>
                </div>

                <form onSubmit={handleFormSubmitTrigger} className='space-y-4'>
                  {modalType === "project" ? (
                    <>
                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>PROJECT NAME</label>
                        <input
                          type='text'
                          required
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                          placeholder='E.G. ARCADE PORTFOLIO'
                        />
                      </div>

                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>IMAGE URL</label>
                        <input
                          type='text'
                          required
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                          placeholder='E.G. /icons/portfolio.png'
                        />
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                          <label className='font-pixel text-xxs text-accent-tertiary'>CATEGORY</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary cursor-pointer'
                          >
                            {projectCategories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className='space-y-1'>
                          <label className='font-pixel text-xxs text-accent-tertiary'>TECH STACK (COMMA SEPARATED)</label>
                          <input
                            type='text'
                            required
                            value={projectForm.stack}
                            onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                            className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                            placeholder='React, Next.js, Tailwind'
                          />
                        </div>
                      </div>

                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>GITHUB LINK</label>
                        <input
                          type='url'
                          required
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                          placeholder='https://github.com/...'
                        />
                      </div>

                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>LIVE DEMO LINK</label>
                        <input
                          type='url'
                          required
                          value={projectForm.liveLink}
                          onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                          placeholder='https://...'
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>SKILL NAME</label>
                        <input
                          type='text'
                          required
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                          placeholder='E.G. NODE.JS'
                        />
                      </div>

                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>SKILL ICON SLUG/URL</label>
                        <input
                          type='text'
                          required
                          value={skillForm.icon}
                          onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary'
                          placeholder='E.G. https://skillicons.dev/icons?i=nodejs'
                        />
                      </div>

                      <div className='space-y-1'>
                        <label className='font-pixel text-xxs text-accent-tertiary'>CATEGORY</label>
                        <select
                          value={skillForm.category}
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                          className='w-full p-2.5 font-terminal text-sm bg-bg-primary border-2 border-accent-primary/40 rounded focus:outline-hidden focus:border-accent-primary text-text-primary cursor-pointer'
                        >
                          {skillCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className='pt-6 flex gap-4'>
                    <button
                      type='submit'
                      className='flex-1 font-pixel text-xxs p-4 border-4 border-accent-primary bg-bg-secondary text-accent-primary hover:bg-accent-primary hover:text-bg-primary hover:shadow-neon-cyan transition-all cursor-pointer'
                    >
                      CONFIRM & SAVE
                    </button>
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      className='flex-1 font-pixel text-xxs p-4 border-4 border-primary/20 bg-bg-secondary text-text-secondary hover:border-accent-secondary hover:text-accent-secondary hover:shadow-neon-pink transition-all cursor-pointer'
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Confirmation Modal Popup */}
      {confirmModal.isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/95 backdrop-blur-md p-4'>
          <div className='w-full max-w-md relative'>
            <div className='absolute -inset-2 bg-accent-tertiary rounded-2xl blur-md opacity-60 animate-glow-pulse'></div>
            
            <div className='relative crt-frame'>
              <div className='crt-screen bg-bg-secondary p-6 text-center space-y-6'>
                <div className='pb-3 border-b-2 border-accent-tertiary/20 flex justify-center items-center gap-2'>
                  <span className='w-2 h-2 rounded bg-accent-tertiary animate-ping'></span>
                  <h3 className='font-pixel text-xs md:text-sm text-accent-tertiary uppercase tracking-widest'>
                    {confirmModal.title}
                  </h3>
                </div>

                <p className='font-terminal text-sm md:text-base text-text-primary tracking-wide leading-relaxed uppercase py-4'>
                  {confirmModal.message}
                </p>

                <div className='flex gap-4 pt-2'>
                  <button
                    onClick={() => {
                      if (confirmModal.onConfirm) confirmModal.onConfirm();
                      setConfirmModal({ ...confirmModal, isOpen: false });
                    }}
                    className='flex-1 font-pixel text-xxs p-4 border-4 border-accent-tertiary bg-bg-secondary text-accent-tertiary hover:bg-accent-tertiary hover:text-bg-primary hover:shadow-neon-yellow transition-all cursor-pointer font-bold'
                  >
                    ▶ YES, COMPLY
                  </button>
                  <button
                    onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                    className='flex-1 font-pixel text-xxs p-4 border-4 border-primary/20 bg-bg-secondary text-text-secondary hover:border-accent-secondary hover:text-accent-secondary hover:shadow-neon-pink transition-all cursor-pointer font-bold'
                  >
                    ▶ NO, ABORT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
