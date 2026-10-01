import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Cpu,
  Layers,
  Shield,
  Code2,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Send,
  Upload,
  UserCheck,
  Search,
  Filter,
  Copy,
  Check,
  Flame,
  Award,
  Users,
  Compass,
  Globe,
  Radio,
  Lock,
  RefreshCw,
  FolderCode
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [logoUrl, setLogoUrl] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [savedWebhook, setSavedWebhook] = useState(
    localStorage.getItem("extreme_cse_webhook") || ""
  );
  const [isCopied, setIsCopied] = useState(false);

  // Applicant list stored locally as fallback cache
  const [applications, setApplications] = useState(() => {
    const local = localStorage.getItem("extreme_cse_auditions_2026");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: "ECSE-26-891",
        timestamp: "2026-10-01 19:42",
        fullName: "Aarav Sharma",
        rollNo: "24CS089",
        year: "2nd Year",
        branch: "Computer Science & Engineering",
        email: "aarav.sharma@example.edu",
        whatsapp: "+91 98765 43210",
        primaryWing: "AI & Neural Tech",
        secondaryWing: "Full Stack & Distributed",
        github: "https://github.com/aarav-cs",
        portfolio: "https://aarav.dev",
        resumeLink: "https://drive.google.com/file/d/sample1/view",
        skills: "Python, PyTorch, LangChain, React, FastAPI",
        experience: "Built an open-source agentic legal bot. Won 2nd runner-up in Smart India Hackathon.",
        status: "Shortlisted"
      },
      {
        id: "ECSE-26-442",
        timestamp: "2026-10-02 01:15",
        fullName: "Ananya Verma",
        rollNo: "25CS104",
        year: "1st Year",
        branch: "CSE (AI & ML)",
        email: "ananya.v@example.edu",
        whatsapp: "+91 98111 22334",
        primaryWing: "UI/UX & Creative Tech",
        secondaryWing: "Community & Media",
        github: "https://github.com/ananya-design",
        portfolio: "https://framer.com/@ananya",
        resumeLink: "https://drive.google.com/file/d/sample2/view",
        skills: "Figma, Framer, Tailwind CSS, Spline 3D",
        experience: "Designed UI systems for college tech-fest with 4000+ daily visitors.",
        status: "Under Review"
      }
    ];
  });

  // Filter & Search states for Admin View
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWing, setFilterWing] = useState("All");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    rollNo: "",
    year: "1st Year",
    branch: "Computer Science & Engineering",
    email: "",
    whatsapp: "",
    primaryWing: "AI & Neural Tech",
    secondaryWing: "Full Stack & Distributed",
    github: "",
    portfolio: "",
    resumeLink: "",
    skills: "",
    experience: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedToken, setSubmittedToken] = useState("");
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("extreme_cse_auditions_2026", JSON.stringify(applications));
  }, [applications]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const handleWebhookSave = (e) => {
    e.preventDefault();
    localStorage.setItem("extreme_cse_webhook", webhookUrl.trim());
    setSavedWebhook(webhookUrl.trim());
    alert("Google Apps Script Webhook URL successfully configured!");
  };

  const wings = [
    {
      id: "ai",
      title: "AI & Neural Tech",
      icon: Cpu,
      color: "from-cyan-500 to-blue-600",
      border: "border-cyan-500/40",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.25)]",
      desc: "LLMs, Computer Vision, Autonomous Agents, and fine-tuning neural architectures.",
      lead: "Research & Benchmarks Squad"
    },
    {
      id: "fullstack",
      title: "Full Stack & Distributed",
      icon: Code2,
      color: "from-emerald-400 to-teal-600",
      border: "border-emerald-500/40",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      desc: "High-throughput APIs, modern Next.js/React frontends, microservices, and databases.",
      lead: "Core Infrastructure Team"
    },
    {
      id: "cyber",
      title: "CyberSec & Red Team",
      icon: Shield,
      color: "from-purple-500 to-indigo-600",
      border: "border-purple-500/40",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]",
      desc: "CTF competitions, binary exploitation, penetration testing, and zero-day defense.",
      lead: "Defensive Operations Lab"
    },
    {
      id: "cloud",
      title: "Cloud & DevOps Ops",
      icon: Layers,
      color: "from-amber-400 to-orange-600",
      border: "border-amber-500/40",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
      desc: "Docker orchestration, Kubernetes clusters, CI/CD pipelines, and cloud telemetry.",
      lead: "SRE & Deploy Matrix"
    },
    {
      id: "design",
      title: "UI/UX & Creative Tech",
      icon: Sparkles,
      color: "from-pink-500 to-rose-600",
      border: "border-pink-500/40",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.25)]",
      desc: "Interactive 3D visuals, high-conversion typography, Framer motion, and brand design.",
      lead: "Visual Experience Squad"
    },
    {
      id: "community",
      title: "Community & Media PR",
      icon: Users,
      color: "from-yellow-400 to-amber-500",
      border: "border-yellow-500/40",
      glow: "shadow-[0_0_20px_rgba(234,179,8,0.25)]",
      desc: "Event organizing, outreach, corporate sponsorships, podcasts, and member logistics.",
      lead: "Growth & Operations"
    }
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const newId = `ECSE-26-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newEntry = {
      id: newId,
      timestamp,
      ...formData,
      status: "Submitted"
    };

    // Attempt to post to Google Sheets Webhook if provided
    let webhookSuccess = false;
    const targetWebhook = savedWebhook || webhookUrl;

    if (targetWebhook) {
      try {
        await fetch(targetWebhook, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newEntry)
        });
        webhookSuccess = true;
      } catch (err) {
        console.warn("Webhook push failed, using local caching", err);
      }
    }

    // Save locally
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
      primaryWing: "AI & Neural Tech",
      secondaryWing: "Full Stack & Distributed",
      github: "",
      portfolio: "",
      resumeLink: "",
      skills: "",
      experience: ""
    });
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Timestamp",
      "Full Name",
      "Roll No",
      "Year",
      "Branch",
      "Email",
      "WhatsApp",
      "Primary Wing",
      "Secondary Wing",
      "GitHub",
      "Portfolio",
      "Resume Link",
      "Skills",
      "Experience",
      "Status"
    ];

    const rows = applications.map((app) => [
      `"${app.id}"`,
      `"${app.timestamp}"`,
      `"${app.fullName}"`,
      `"${app.rollNo}"`,
      `"${app.year}"`,
      `"${app.branch}"`,
      `"${app.email}"`,
      `"${app.whatsapp}"`,
      `"${app.primaryWing}"`,
      `"${app.secondaryWing}"`,
      `"${app.github || ""}"`,
      `"${app.portfolio || ""}"`,
      `"${app.resumeLink || ""}"`,
      `"${(app.skills || "").replace(/"/g, '""')}"`,
      `"${(app.experience || "").replace(/"/g, '""')}"`,
      `"${app.status}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Extreme_CSE_Auditions_2026_27_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWing = filterWing === "All" || app.primaryWing === filterWing;
    return matchesSearch && matchesWing;
  });

  const appsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create headers if first row is blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Token ID", "Timestamp", "Full Name", "Roll No", "Year", 
        "Branch", "Email", "WhatsApp", "Primary Wing", 
        "Secondary Wing", "GitHub", "Portfolio", "Resume Link", 
        "Skills", "Experience", "Status"
      ]);
      sheet.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#00f0ff").setFontColor("#000000");
    }
    
    sheet.appendRow([
      data.id || "N/A",
      data.timestamp || new Date(),
      data.fullName || "",
      data.rollNo || "",
      data.year || "",
      data.branch || "",
      data.email || "",
      data.whatsapp || "",
      data.primaryWing || "",
      data.secondaryWing || "",
      data.github || "",
      data.portfolio || "",
      data.resumeLink || "",
      data.skills || "",
      data.experience || "",
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
    <div className="min-h-screen bg-[#060810] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Background Cyber Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
          backgroundSize: "4rem 4rem"
        }}
      />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#060810]/80 border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="relative group cursor-pointer w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 p-1 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              title="Click to Upload Custom Logo"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono font-bold tracking-tighter text-cyan-300">EXT</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Upload className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleLogoUpload} 
            />

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-lg tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  EXTREME CSE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 animate-pulse">
                  RECRUITMENT 26-27
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Department of Computer Science & Engineering</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { id: "home", label: "Overview", icon: Compass },
              { id: "audition", label: "Audition Form", icon: Flame, special: true },
              { id: "database", label: "Live Sheet Hub", icon: FileSpreadsheet },
              { id: "webhook", label: "Sheet Integration", icon: RefreshCw }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    tab.special && !isActive
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                      : isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold shadow-[0_0_18px_rgba(0,240,255,0.4)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 relative z-10">
        
        {/* TAB 1: HOME & OVERVIEW */}
        {activeTab === "home" && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center relative py-12 md:py-20 border border-cyan-500/20 rounded-3xl bg-gradient-to-b from-[#0e1628]/70 via-[#070b14]/90 to-[#060810] p-6 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.08)]">
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-3/4 h-32 bg-cyan-400/10 blur-[100px] pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
                <span>OFFICIAL AUDITION DRIVE • SESSION 2026-27 ACTIVE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                BUILD THE{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent underline decoration-cyan-500/40 decoration-wavy">
                  NEXT ERA
                </span>{" "}
                OF TECH.
              </h1>

              <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed">
                <strong className="text-cyan-300 font-semibold">Extreme CSE</strong> is the premier engineering powerhouse and departmental society — building national hackathon squads, research-backed AI deployments, and industry-grade architectures.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
                {[
                  { value: "45+ Wins", label: "National Hackathons" },
                  { value: "500+ Cracks", label: "Codeforces & LeetCode" },
                  { value: "100%", label: "Hands-on Projects" },
                  { value: "1:1 Mentorship", label: "Senior SDE Guidance" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">{stat.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTab("audition")}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold tracking-wide flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 transition-all text-sm sm:text-base"
                >
                  <Flame className="w-5 h-5" />
                  <span>Enter 2026-27 Auditions</span>
                </button>
                <button
                  onClick={() => setActiveTab("database")}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 font-medium flex items-center gap-2 transition-all text-sm sm:text-base hover:bg-slate-800"
                >
                  <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                  <span>Check Sheet Records</span>
                </button>
              </div>
            </div>

            {/* Specialized Wings Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-cyan-400 font-mono text-xs tracking-wider uppercase">Squad Architecture</span>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-slate-100">
                    Choose Your Specialization Wing
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                  Candidates can select one primary wing and one secondary wing during their application.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wings.map((wing) => {
                  const Icon = wing.icon;
                  return (
                    <div
                      key={wing.id}
                      className={`p-6 rounded-2xl bg-[#0b0f1a]/80 border ${wing.border} transition-all duration-300 hover:-translate-y-1.5 hover:${wing.glow} flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${wing.color} text-black`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                            {wing.lead}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mt-4 text-slate-100">{wing.title}</h3>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{wing.desc}</p>
                      </div>

                      <button
                        onClick={() => {
                          setFormData({ ...formData, primaryWing: wing.title });
                          setActiveTab("audition");
                        }}
                        className="mt-6 flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Apply for this Wing</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audition Process Roadmap */}
            <div className="p-8 rounded-3xl bg-[#090d18] border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-center mb-8">Audition Timeline & Selection Stages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Registration Form",
                    desc: "Submit your technical background, GitHub, and statement of interest before deadline."
                  },
                  {
                    step: "02",
                    title: "Portfolio Shortlisting",
                    desc: "Evaluation of past projects, code quality, design sensibilities, or domain aptitude."
                  },
                  {
                    step: "03",
                    title: "Technical Audition",
                    desc: "Live problem-solving, domain discussion, and collaborative coding challenge."
                  },
                  {
                    step: "04",
                    title: "Final Induction",
                    desc: "Onboarding into Extreme CSE core squad, access to cloud compute, and mentor allocation."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-3xl font-mono font-black text-cyan-500/30">{item.step}</span>
                    <h3 className="font-bold text-base text-slate-200 mt-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDITION REGISTRATION FORM */}
        {activeTab === "audition" && (
          <div className="max-w-3xl mx-auto">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c101c]/90 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
              {submitSuccess ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                    Audition Application Dispatched!
                  </h2>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Your candidate profile has been recorded in the central database. Keep your application token for interview rounds.
                  </p>
                  <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/40 inline-flex items-center gap-3 font-mono">
                    <span className="text-slate-400 text-xs">Application Token:</span>
                    <span className="text-cyan-400 font-bold text-lg">{submittedToken}</span>
                  </div>
                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-all"
                    >
                      Submit Another Response
                    </button>
                    <button
                      onClick={() => setActiveTab("database")}
                      className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      View Live Sheet Database
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400">Extreme CSE Audition Portal</span>
                      <span className="text-xs font-mono text-slate-400">Step 1 of 1</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-slate-100">
                      Join The 2026-27 Core Team
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Fill accurate details. Submissions sync in real-time with our Google Sheet evaluation matrix.
                    </p>
                  </div>

                  {/* Personal & Academic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="e.g. Rahul Sahu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        University Roll No / College ID <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="rollNo"
                        required
                        value={formData.rollNo}
                        onChange={handleFormChange}
                        placeholder="e.g. 23CS004"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Academic Year (2026-27) <span className="text-cyan-400">*</span>
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400 text-sm"
                      >
                        <option value="1st Year">1st Year (Freshers - 2026 Batch)</option>
                        <option value="2nd Year">2nd Year (Sophomores)</option>
                        <option value="3rd Year">3rd Year (Juniors)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Branch / Specialization <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="branch"
                        required
                        value={formData.branch}
                        onChange={handleFormChange}
                        placeholder="CSE / IT / AIML / DS"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Official / Personal Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="name@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        WhatsApp Contact Number <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Domain Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Primary Wing Choice <span className="text-cyan-400">*</span>
                      </label>
                      <select
                        name="primaryWing"
                        value={formData.primaryWing}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 focus:outline-none focus:border-cyan-400 text-sm font-medium"
                      >
                        {wings.map((w) => (
                          <option key={w.id} value={w.title} className="bg-slate-900 text-slate-100">
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
                        name="secondaryWing"
                        value={formData.secondaryWing}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 focus:outline-none focus:border-cyan-400 text-sm"
                      >
                        {wings.map((w) => (
                          <option key={w.id} value={w.title} className="bg-slate-900 text-slate-100">
                            {w.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Links: GitHub, Portfolio, Resume */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleFormChange}
                        placeholder="https://github.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Portfolio / Behance
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleFormChange}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Resume Google Drive Link
                      </label>
                      <input
                        type="url"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleFormChange}
                        placeholder="https://drive.google.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                      />
                    </div>
                  </div>

                  {/* Technical Strengths */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Key Technical Skills & Tools (Languages, Frameworks) <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="skills"
                      required
                      value={formData.skills}
                      onChange={handleFormChange}
                      placeholder="e.g. C++, Java, React, Node.js, PyTorch, Docker, Figma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>

                  {/* Motivation / Experience */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Past Projects, Hackathons, or Why do you want to join Extreme CSE? <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      name="experience"
                      rows={3}
                      required
                      value={formData.experience}
                      onChange={handleFormChange}
                      placeholder="Briefly tell us about a project you loved building or what you bring to the society..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-black font-extrabold tracking-wide text-base flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all disabled:opacity-50"
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

                  <p className="text-[11px] text-center text-slate-500">
                    By submitting, your data is securely logged in the Extreme CSE central registry for recruitment review.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN & SHEET DATABASE HUB */}
        {activeTab === "database" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0c101c] border border-cyan-500/20">
              <div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-slate-100">Live Application Records</h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Viewing real-time submissions received. Filter, verify applicant credentials, or download CSV for Google Sheets.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={exportCSV}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Google Sheet (CSV)</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by candidate name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterWing}
                  onChange={(e) => setFilterWing(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Wings</option>
                  {wings.map((w) => (
                    <option key={w.id} value={w.title}>
                      {w.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-cyan-500/20 bg-[#090d18] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-cyan-500/20 bg-slate-900/80 text-cyan-300 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">Token & Time</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Academic</th>
                      <th className="py-3 px-4">Domain Preference</th>
                      <th className="py-3 px-4">Skills & Profile</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-cyan-400 font-bold block">{app.id}</span>
                            <span className="text-[10px] text-slate-500">{app.timestamp}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-200">{app.fullName}</div>
                            <div className="text-[11px] text-slate-400">{app.email}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{app.whatsapp}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-300 font-mono">{app.rollNo}</div>
                            <div className="text-[11px] text-slate-400">{app.year} • {app.branch}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px]">
                              {app.primaryWing}
                            </span>
                            {app.secondaryWing && (
                              <div className="text-[10px] text-slate-500 mt-1">2nd: {app.secondaryWing}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="truncate text-slate-300 font-mono text-[11px]">{app.skills}</p>
                            <div className="flex gap-2 mt-1.5">
                              {app.github && (
                                <a
                                  href={app.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-400 hover:underline text-[10px] flex items-center gap-0.5"
                                >
                                  GH <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              {app.resumeLink && (
                                <a
                                  href={app.resumeLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:underline text-[10px] flex items-center gap-0.5"
                                >
                                  Resume <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${
                                app.status === "Shortlisted"
                                  ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                                  : app.status === "Under Review"
                                  ? "bg-amber-950/80 border border-amber-500/40 text-amber-300"
                                  : "bg-cyan-950/80 border border-cyan-500/40 text-cyan-300"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                          No audition records matching the search filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE SHEET APPS SCRIPT WEBHOOK GUIDE */}
        {activeTab === "webhook" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 rounded-2xl bg-[#0c101c] border border-cyan-500/30">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-cyan-400" />
                Live Google Sheet Webhook Sync
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Connect your website directly to an official Google Sheet in 2 minutes. When students submit the form, their details will automatically append as a new row in your spreadsheet.
              </p>

              {/* Set Webhook URL */}
              <form onSubmit={handleWebhookSave} className="mt-6">
                <label className="block text-xs font-mono text-cyan-300 mb-2">
                  Enter Your Deployed Google Apps Script Web App URL:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={webhookUrl || savedWebhook}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-sm hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all whitespace-nowrap"
                  >
                    Save & Activate
                  </button>
                </div>
                {savedWebhook && (
                  <p className="text-xs text-emerald-400 mt-2 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Connected to: {savedWebhook.substring(0, 45)}...
                  </p>
                )}
              </form>
            </div>

            {/* Step-by-step Apps Script Instruction */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-200">How to setup Google Sheets in 3 Steps:</h3>
              <ol className="list-decimal list-inside space-y-3 text-sm text-slate-300">
                <li>
                  Open a new <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google Sheet</a>.
                </li>
                <li>
                  Click on <strong>Extensions &gt; Apps Script</strong> in the top menu.
                </li>
                <li>
                  Delete all existing code in the script editor and paste the code below:
                </li>
              </ol>

              {/* Code Box */}
              <div className="relative rounded-xl bg-black/80 border border-slate-700 p-4 font-mono text-xs overflow-x-auto">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(appsScriptCode);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  className="absolute top-3 right-3 px-3 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center gap-1 hover:bg-cyan-900 text-[11px]"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? "Copied" : "Copy Code"}</span>
                </button>
                <pre className="text-cyan-300/90 whitespace-pre leading-relaxed">{appsScriptCode}</pre>
              </div>

              <div className="pt-2 text-sm text-slate-300 space-y-2">
                <p>
                  4. Click <strong>Deploy &gt; New Deployment</strong>.
                </p>
                <p>
                  5. Select type: <strong>Web App</strong>, set <em>Execute as: Me</em>, and set <strong>Who has access: Anyone</strong>.
                </p>
                <p>
                  6. Copy the generated Web App URL and paste it into the input box above!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-[#04060b] py-6 px-4 text-center font-mono text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026-27 Extreme CSE. Departmental Student Society of Computer Science & Engineering.</p>
          <div className="flex items-center gap-4 text-cyan-400/80">
            <span>Built for High-Octane Engineering</span>
            <span>•</span>
            <span>Neon Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
