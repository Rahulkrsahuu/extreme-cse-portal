import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  FileSpreadsheet,
  Download,
  ExternalLink,
  ChevronRight,
  Send,
  Search,
  Filter,
  Flame,
  Award,
  Users,
  Compass,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Shield,
  KeyRound,
  LogOut,
  RefreshCw,
  Copy,
  Check,
  UserCheck,
  ArrowRight
} from "lucide-react";

// Extreme CSE Official Logo Component (Matching GCET Department Colors: Fire Orange #E84125 & Carbon Navy #182232)
function ExtremeLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_12px_rgba(232,65,37,0.4)]">
        {/* Left Dark Carbon Slate Ribbon */}
        <path
          d="M 50 30 L 90 30 L 140 170 L 100 170 Z"
          fill="#1E2B42"
          stroke="#2D3F5E"
          strokeWidth="3"
        />
        <path
          d="M 50 170 L 90 170 L 140 30 L 100 30 Z"
          fill="#141C2B"
          stroke="#24334C"
          strokeWidth="3"
        />
        {/* Right Fire Orange Ribbon (Intertwined) */}
        <path
          d="M 110 30 L 150 30 L 90 170 L 50 170 Z"
          fill="#E84125"
          opacity="0.9"
        />
        <path
          d="M 70 70 L 130 130 L 155 130 L 95 70 Z"
          fill="#FF5533"
        />
      </svg>
    </div>
  );
}

export default function App() {
  // Navigation & Role Management
  const [userRole, setUserRole] = useState("student"); // 'student' | 'admin'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");
  const [studentTab, setStudentTab] = useState("apply"); // 'apply' | 'status'

  // Webhook
  const [webhookUrl, setWebhookUrl] = useState("");
  const [savedWebhook, setSavedWebhook] = useState(
    localStorage.getItem("extreme_gcet_webhook") || ""
  );
  const [isCopied, setIsCopied] = useState(false);

  // Application Storage
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("extreme_cse_candidates_2026");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: "EXT-26-101",
        timestamp: "2026-10-01 10:14",
        fullName: "Aarav Sharma",
        rollNo: "24CS089",
        year: "2nd Year",
        branch: "Computer Science & Engineering",
        email: "aarav.sharma@gcet.edu",
        whatsapp: "+91 98765 43210",
        primaryWing: "AI & Machine Learning",
        secondaryWing: "Full Stack & Web3",
        github: "https://github.com/aarav-cs",
        portfolio: "https://aarav.dev",
        resumeLink: "https://drive.google.com/file/d/sample1",
        skills: "Python, PyTorch, LangChain, React",
        experience: "Winner in College Intra-Hackathon 2025. Contributor to PyTorch open-source docs.",
        status: "Selected"
      },
      {
        id: "EXT-26-204",
        timestamp: "2026-10-01 12:45",
        fullName: "Ananya Verma",
        rollNo: "25CS104",
        year: "1st Year",
        branch: "CSE (AI & ML)",
        email: "ananya.v@gcet.edu",
        whatsapp: "+91 98111 22334",
        primaryWing: "UI/UX & Creative Tech",
        secondaryWing: "Public Relations & Media",
        github: "https://github.com/ananya-design",
        portfolio: "https://framer.com/@ananya",
        resumeLink: "https://drive.google.com/file/d/sample2",
        skills: "Figma, Framer, Tailwind, Spline 3D",
        experience: "Designed posters and interfaces for tech fests. Passionate about cyber neon visual design.",
        status: "Interview Scheduled"
      },
      {
        id: "EXT-26-308",
        timestamp: "2026-10-01 16:30",
        fullName: "Rohan Gupta",
        rollNo: "24CS045",
        year: "2nd Year",
        branch: "Information Technology",
        email: "rohan.g@gcet.edu",
        whatsapp: "+91 98222 33445",
        primaryWing: "Cyber Security & CTF",
        secondaryWing: "Cloud & DevOps",
        github: "https://github.com/rohan-sec",
        portfolio: "",
        resumeLink: "https://drive.google.com/file/d/sample3",
        skills: "Wireshark, Burp Suite, Linux, Python",
        experience: "Participated in PicoCTF 2025 (Global rank top 10%). Solved 70+ rooms on TryHackMe.",
        status: "Shortlisted"
      }
    ];
  });

  // Search & Filter (Admin and Student Results)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWing, setFilterWing] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Student Form State
  const [formData, setFormData] = useState({
    fullName: "",
    rollNo: "",
    year: "1st Year",
    branch: "Computer Science & Engineering",
    email: "",
    whatsapp: "",
    primaryWing: "AI & Machine Learning",
    secondaryWing: "Full Stack & Web3",
    github: "",
    portfolio: "",
    resumeLink: "",
    skills: "",
    experience: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToken, setSubmittedToken] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("extreme_cse_candidates_2026", JSON.stringify(applications));
  }, [applications]);

  const wings = [
    { title: "AI & Machine Learning", icon: Cpu, desc: "Autonomous LLMs, Vision models, PyTorch & Research Squad." },
    { title: "Full Stack & Web3", icon: Code2, desc: "React, Next.js, Microservices, Node.js, and Smart Contracts." },
    { title: "Cyber Security & CTF", icon: Shield, desc: "Binary Exploitation, Reverse Engineering, Penetration Testing." },
    { title: "Cloud & DevOps", icon: Layers, desc: "Docker orchestration, Kubernetes, CI/CD and AWS/GCP clusters." },
    { title: "UI/UX & Creative Tech", icon: Sparkles, desc: "Figma design systems, 3D interactive graphics & animation." },
    { title: "Public Relations & Media", icon: Users, desc: "Event management, sponsorships, hackathon logistics & branding." }
  ];

  // Admin Login Handle
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === "extreme2026" || adminPasscode === "admin123") {
      setIsAdminLoggedIn(true);
      setAdminError("");
      setAdminPasscode("");
    } else {
      setAdminError("Invalid Passcode. Use 'extreme2026' to access admin dashboard.");
    }
  };

  // Change Candidate Status
  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // Submit Candidate Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newId = `EXT-26-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newEntry = {
      id: newId,
      timestamp,
      ...formData,
      status: "Submitted"
    };

    // Push to Google Sheets Webhook if set
    const webhook = savedWebhook || webhookUrl;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry)
        });
      } catch (err) {
        console.warn("Webhook offline, cached locally", err);
      }
    }

    setApplications((prev) => [newEntry, ...prev]);
    setSubmittedToken(newId);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset Form
    setFormData({
      fullName: "",
      rollNo: "",
      year: "1st Year",
      branch: "Computer Science & Engineering",
      email: "",
      whatsapp: "",
      primaryWing: "AI & Machine Learning",
      secondaryWing: "Full Stack & Web3",
      github: "",
      portfolio: "",
      resumeLink: "",
      skills: "",
      experience: ""
    });
  };

  // Export CSV for Excel/Google Sheets
  const exportCSV = () => {
    const headers = [
      "Token ID", "Timestamp", "Full Name", "Roll No", "Year", "Branch",
      "Email", "WhatsApp", "Primary Wing", "Secondary Wing", "GitHub",
      "Portfolio", "Resume Link", "Skills", "Experience", "Status"
    ];

    const rows = applications.map((a) => [
      `"${a.id}"`, `"${a.timestamp}"`, `"${a.fullName}"`, `"${a.rollNo}"`,
      `"${a.year}"`, `"${a.branch}"`, `"${a.email}"`, `"${a.whatsapp}"`,
      `"${a.primaryWing}"`, `"${a.secondaryWing}"`, `"${a.github || ""}"`,
      `"${a.portfolio || ""}"`, `"${a.resumeLink || ""}"`,
      `"${(a.skills || "").replace(/"/g, '""')}"`,
      `"${(a.experience || "").replace(/"/g, '""')}"`,
      `"${a.status}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Extreme_CSE_GCET_Auditions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const appsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Token ID", "Timestamp", "Full Name", "Roll No", "Year", 
        "Branch", "Email", "WhatsApp", "Primary Wing", 
        "Secondary Wing", "GitHub", "Portfolio", "Resume Link", 
        "Skills", "Experience", "Status"
      ]);
      sheet.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#E84125").setFontColor("#ffffff");
    }
    sheet.appendRow([
      data.id || "N/A", data.timestamp || new Date(), data.fullName || "",
      data.rollNo || "", data.year || "", data.branch || "",
      data.email || "", data.whatsapp || "", data.primaryWing || "",
      data.secondaryWing || "", data.github || "", data.portfolio || "",
      data.resumeLink || "", data.skills || "", data.experience || "",
      data.status || "Submitted"
    ]);
    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col font-sans selection:bg-[#E84125]/30 selection:text-[#FF6B4A]">
      {/* Background Cyber Glow */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-[#E84125]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#182232]/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070A10]/90 border-b border-[#E84125]/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Society Brand */}
          <div className="flex items-center gap-3">
            <ExtremeLogo className="w-10 h-10" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
                  EXTREME <span className="text-[#E84125]">CSE</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E84125]/10 border border-[#E84125]/40 text-[#FF5533]">
                  2026-27 AUDITIONS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E84125] inline-block animate-ping" />
                CSE DEPARTMENT GCET
              </p>
            </div>
          </div>

          {/* Portal Switcher (Student vs Admin) */}
          <div className="flex items-center gap-2">
            <div className="bg-[#0D1424] p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setUserRole("student")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  userRole === "student"
                    ? "bg-[#E84125] text-white shadow-[0_0_15px_rgba(232,65,37,0.4)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Student Window
              </button>
              <button
                onClick={() => setUserRole("admin")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  userRole === "admin"
                    ? "bg-[#182232] text-white border border-[#E84125]/50 shadow-[0_0_15px_rgba(24,34,50,0.5)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E84125]" />
                <span>Admin Command</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        
        {/* ========================================================= */}
        {/* 1. STUDENT WINDOW                                         */}
        {/* ========================================================= */}
        {userRole === "student" && (
          <div className="space-y-10">
            {/* Student Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1424] border border-[#E84125]/20">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStudentTab("apply")}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    studentTab === "apply"
                      ? "bg-gradient-to-r from-[#E84125] to-[#FF5533] text-white shadow-[0_0_15px_rgba(232,65,37,0.4)]"
                      : "bg-slate-900/80 text-slate-300 hover:text-white"
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>Audition Registration Form</span>
                </button>
                <button
                  onClick={() => setStudentTab("status")}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    studentTab === "status"
                      ? "bg-gradient-to-r from-[#E84125] to-[#FF5533] text-white shadow-[0_0_15px_rgba(232,65,37,0.4)]"
                      : "bg-slate-900/80 text-slate-300 hover:text-white"
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Audition Status & Selection List</span>
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Total Applicants Registered: <span className="text-[#FF5533] font-bold">{applications.length}</span>
              </div>
            </div>

            {/* TAB: AUDITION FORM */}
            {studentTab === "apply" && (
              <div className="max-w-3xl mx-auto">
                {submitSuccess ? (
                  <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1424] border border-[#E84125]/40 text-center space-y-6 shadow-[0_0_40px_rgba(232,65,37,0.15)]">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Audition Form Successfully Submitted!
                    </h2>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Your entry has been securely registered in the Extreme CSE recruitment registry. You can check your shortlisting status in the Selection List tab anytime.
                    </p>
                    <div className="p-4 rounded-xl bg-black/60 border border-[#E84125]/40 inline-flex items-center gap-3 font-mono">
                      <span className="text-slate-400 text-xs">Your Token ID:</span>
                      <span className="text-[#FF5533] font-bold text-lg">{submittedToken}</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                      >
                        Submit Another Entry
                      </button>
                      <button
                        onClick={() => setStudentTab("status")}
                        className="px-6 py-2.5 rounded-xl bg-[#E84125] hover:bg-[#FF5533] text-white text-xs font-bold shadow-[0_0_15px_rgba(232,65,37,0.4)]"
                      >
                        Check Selection Board
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="p-6 sm:p-10 rounded-3xl bg-[#0D1424] border border-[#E84125]/30 space-y-6 shadow-[0_0_30px_rgba(232,65,37,0.08)]">
                    <div>
                      <span className="text-xs font-mono text-[#FF5533] tracking-wider uppercase">Official Student Intake</span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
                        Apply for Extreme CSE (Session 2026-27)
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Open for 1st, 2nd, and 3rd year students of Galgotias College of Engineering & Technology (GCET).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Full Name <span className="text-[#E84125]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sahu"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          GCET Roll No / Admission ID <span className="text-[#E84125]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.rollNo}
                          onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                          placeholder="e.g. 24CS089"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Current Academic Year <span className="text-[#E84125]">*</span>
                        </label>
                        <select
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 focus:outline-none focus:border-[#E84125] text-sm"
                        >
                          <option value="1st Year">1st Year (Freshers - 2026 Batch)</option>
                          <option value="2nd Year">2nd Year (Sophomores)</option>
                          <option value="3rd Year">3rd Year (Juniors)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Branch / Department <span className="text-[#E84125]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          placeholder="CSE / IT / AIML / DS"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 focus:outline-none focus:border-[#E84125] text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Email Address <span className="text-[#E84125]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          WhatsApp Mobile Number <span className="text-[#E84125]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Primary Wing Choice <span className="text-[#E84125]">*</span>
                        </label>
                        <select
                          value={formData.primaryWing}
                          onChange={(e) => setFormData({ ...formData, primaryWing: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-[#E84125]/40 text-[#FF6B4A] font-medium focus:outline-none focus:border-[#E84125] text-sm"
                        >
                          {wings.map((w, idx) => (
                            <option key={idx} value={w.title} className="bg-[#070A10] text-slate-100">
                              {w.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Secondary Wing Choice
                        </label>
                        <select
                          value={formData.secondaryWing}
                          onChange={(e) => setFormData({ ...formData, secondaryWing: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-300 focus:outline-none focus:border-[#E84125] text-sm"
                        >
                          {wings.map((w, idx) => (
                            <option key={idx} value={w.title} className="bg-[#070A10] text-slate-100">
                              {w.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">GitHub Profile Link</label>
                        <input
                          type="url"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#E84125]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Portfolio / Website</label>
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#E84125]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Resume Drive Link</label>
                        <input
                          type="url"
                          value={formData.resumeLink}
                          onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                          placeholder="https://drive.google.com/..."
                          className="w-full px-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#E84125]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Technical Skills & Frameworks <span className="text-[#E84125]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. C++, Java, React, Node.js, PyTorch, Figma, Docker"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Past Projects / Why join Extreme CSE? <span className="text-[#E84125]">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="Briefly state your passion, past projects or what you aim to build with Extreme CSE..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E84125] to-[#FF5533] text-white font-extrabold tracking-wide text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,65,37,0.5)] hover:scale-[1.01] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Transmitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Audition Registration</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB: SELECTION LIST & LIVE STATUS (STUDENT VIEW) */}
            {studentTab === "status" && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#E84125]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Award className="w-6 h-6 text-[#E84125]" />
                      Audition Shortlisting & Selection Board
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Check your application status live. Search by your Name or College Roll Number.
                    </p>
                  </div>

                  <div className="w-full sm:w-72 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Enter Roll No or Name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#070A10] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E84125]"
                    />
                  </div>
                </div>

                {/* Candidate Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applications
                    .filter((a) =>
                      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      a.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((candidate) => (
                      <div
                        key={candidate.id}
                        className="p-5 rounded-2xl bg-[#0D1424]/90 border border-slate-800 hover:border-[#E84125]/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-slate-400">{candidate.id}</span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                                candidate.status === "Selected"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                  : candidate.status === "Interview Scheduled"
                                  ? "bg-[#E84125]/20 text-[#FF6B4A] border border-[#E84125]/40"
                                  : candidate.status === "Shortlisted"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                                  : candidate.status === "Not Selected"
                                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                  : "bg-slate-800 text-slate-400 border border-slate-700"
                              }`}
                            >
                              {candidate.status === "Selected" && <CheckCircle2 className="w-3.5 h-3.5" />}
                              {candidate.status === "Interview Scheduled" && <Clock className="w-3.5 h-3.5" />}
                              {candidate.status === "Not Selected" && <XCircle className="w-3.5 h-3.5" />}
                              <span>{candidate.status}</span>
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-white mt-2">{candidate.fullName}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                            <span>{candidate.rollNo}</span>
                            <span>•</span>
                            <span>{candidate.year} ({candidate.branch})</span>
                          </div>

                          <div className="mt-3">
                            <span className="inline-block px-2.5 py-1 rounded-lg bg-black/50 border border-slate-800 text-xs font-medium text-[#FF6B4A]">
                              Wing: {candidate.primaryWing}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>Applied on: {candidate.timestamp}</span>
                          <span className="text-slate-400">GCET CSE Dept</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. ADMIN COMMAND DESK                                     */}
        {/* ========================================================= */}
        {userRole === "admin" && (
          <div>
            {!isAdminLoggedIn ? (
              /* Admin Lock Screen */
              <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-[#0D1424] border border-[#E84125]/30 text-center space-y-6 shadow-[0_0_40px_rgba(232,65,37,0.15)]">
                <div className="w-14 h-14 rounded-2xl bg-[#E84125]/10 border border-[#E84125]/40 flex items-center justify-center mx-auto text-[#E84125]">
                  <KeyRound className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Admin Authentication</h2>
                  <p className="text-xs text-slate-400 mt-1">Extreme CSE Executive Core & Leads Only</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="Enter Admin Passcode (e.g. extreme2026)"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070A10] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#E84125] text-sm text-center"
                    />
                    {adminError && <p className="text-xs text-rose-400 mt-2 font-mono">{adminError}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#E84125] hover:bg-[#FF5533] text-white font-bold text-sm shadow-[0_0_20px_rgba(232,65,37,0.4)] transition-all"
                  >
                    Unlock Admin Command Center
                  </button>
                  <p className="text-[11px] font-mono text-slate-500">Default passcode: extreme2026</p>
                </form>
              </div>
            ) : (
              /* Authenticated Admin Command Desk */
              <div className="space-y-8">
                {/* Admin Top Dashboard Bar */}
                <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#E84125]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <h2 className="text-2xl font-extrabold text-white">Admin Recruitment Control Desk</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Review all candidate applications, update shortlisting status, and export real-time sheets.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportCSV}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export to Excel / CSV</span>
                    </button>
                    <button
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Lock Desk</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search applicant name or roll no..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1424] border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E84125]"
                    />
                  </div>

                  <div>
                    <select
                      value={filterWing}
                      onChange={(e) => setFilterWing(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0D1424] border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E84125]"
                    >
                      <option value="All">All Wings</option>
                      {wings.map((w, i) => (
                        <option key={i} value={w.title}>{w.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0D1424] border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E84125]"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Selected">Selected</option>
                      <option value="Not Selected">Not Selected</option>
                    </select>
                  </div>
                </div>

                {/* Detailed Candidate Cards for Admin Review */}
                <div className="space-y-4">
                  {applications
                    .filter((a) => {
                      const matchesSearch =
                        a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesWing = filterWing === "All" || a.primaryWing === filterWing;
                      const matchesStatus = filterStatus === "All" || a.status === filterStatus;
                      return matchesSearch && matchesWing && matchesStatus;
                    })
                    .map((cand) => (
                      <div
                        key={cand.id}
                        className="p-6 rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-[#E84125]/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                      >
                        {/* Candidate Details */}
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#FF5533]">{cand.id}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-xs text-slate-400 font-mono">{cand.timestamp}</span>
                            <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-800 text-[11px] text-slate-300 font-mono">
                              {cand.year} • {cand.branch}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            {cand.fullName}
                            <span className="text-xs font-mono text-slate-400">({cand.rollNo})</span>
                          </h3>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                            <span>Email: <strong className="text-slate-200">{cand.email}</strong></span>
                            <span>WhatsApp: <strong className="text-slate-200">{cand.whatsapp}</strong></span>
                          </div>

                          <div className="pt-2 flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-md bg-[#E84125]/10 border border-[#E84125]/40 text-[#FF6B4A]">
                              Primary: {cand.primaryWing}
                            </span>
                            {cand.secondaryWing && (
                              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                                2nd: {cand.secondaryWing}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 pt-1">
                            <strong className="text-[#FF5533] font-mono">Skills:</strong> {cand.skills}
                          </p>

                          {cand.experience && (
                            <p className="text-xs text-slate-400 bg-black/40 p-2.5 rounded-xl border border-slate-800/80">
                              "{cand.experience}"
                            </p>
                          )}

                          {/* Action Links */}
                          <div className="flex gap-3 pt-1">
                            {cand.github && (
                              <a
                                href={cand.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-mono text-[#FF5533] hover:underline flex items-center gap-1"
                              >
                                GitHub <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {cand.portfolio && (
                              <a
                                href={cand.portfolio}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                              >
                                Portfolio <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {cand.resumeLink && (
                              <a
                                href={cand.resumeLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                              >
                                Resume Drive <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Status Manager Control */}
                        <div className="p-4 rounded-xl bg-black/50 border border-slate-800 flex flex-col justify-between gap-3 min-w-[220px]">
                          <div>
                            <span className="text-[11px] font-mono text-slate-400 block mb-1">Update Status:</span>
                            <select
                              value={cand.status}
                              onChange={(e) => handleStatusChange(cand.id, e.target.value)}
                              className={`w-full px-3 py-2 rounded-lg font-mono text-xs font-bold border transition-all ${
                                cand.status === "Selected"
                                  ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                                  : cand.status === "Interview Scheduled"
                                  ? "bg-[#E84125]/20 border-[#E84125] text-[#FF6B4A]"
                                  : cand.status === "Shortlisted"
                                  ? "bg-blue-950/80 border-blue-500 text-blue-300"
                                  : cand.status === "Not Selected"
                                  ? "bg-rose-950/80 border-rose-500 text-rose-300"
                                  : "bg-slate-900 border-slate-700 text-slate-300"
                              }`}
                            >
                              <option value="Submitted">Submitted (Pending)</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Selected">Selected for Core Team</option>
                              <option value="Not Selected">Not Selected</option>
                            </select>
                          </div>

                          <div className="text-[11px] text-slate-500 font-mono">
                            Status changes are instantly visible on the student selection board.
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Google Sheet Sync & Webhook Section */}
                <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#E84125]/30 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#E84125]" />
                    Google Sheets Webhook Sync Configuration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Paste your Google Apps Script Web App URL below to automatically append submissions directly into your live Google Sheet.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={webhookUrl || savedWebhook}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#070A10] border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E84125]"
                    />
                    <button
                      onClick={() => {
                        localStorage.setItem("extreme_gcet_webhook", webhookUrl.trim());
                        setSavedWebhook(webhookUrl.trim());
                        alert("Google Sheet Webhook Saved!");
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#E84125] text-white font-bold text-xs hover:bg-[#FF5533]"
                    >
                      Save Webhook
                    </button>
                  </div>

                  {/* Ready to copy script */}
                  <div className="relative p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs overflow-x-auto">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(appsScriptCode);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="absolute top-3 right-3 px-3 py-1 rounded bg-[#E84125]/20 border border-[#E84125]/40 text-[#FF6B4A] flex items-center gap-1 text-[11px]"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? "Copied" : "Copy Code"}</span>
                    </button>
                    <pre className="text-slate-300">{appsScriptCode}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E84125]/20 bg-[#04060A] py-6 px-4 text-center font-mono text-xs text-slate-500">
        <p>© 2026-27 Extreme CSE • Department of Computer Science & Engineering, GCET Greater Noida</p>
      </footer>
    </div>
  );
}
