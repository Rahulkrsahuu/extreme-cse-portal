import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Zap,
  Cpu,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Eye,
  Settings,
  Code2,
  Users,
  Trophy,
  Rocket,
  Flame,
  Search,
  Filter,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  X,
  Volume2,
  VolumeX,
  Camera,
  HelpCircle,
  ChevronDown,
  Globe,
  Radio,
  Share2,
  FileText,
  Briefcase,
  ArrowRight
} from 'lucide-react';

const DOMAINS = [
  {
    id: 'ai-ml',
    title: 'AI, ML & Autonomous Systems',
    code: 'WING-01',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/40 hover:border-cyan-400',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    icon: Cpu,
    tag: 'Artificial Intelligence',
    description: 'Neural agent architectures, custom LLM fine-tuning, computer vision pipelines, and production edge inference.',
    requirements: 'Python, PyTorch / TensorFlow, Math for ML, Hugging Face, Curiosity.'
  },
  {
    id: 'fullstack',
    title: 'Web & Systems Engineering',
    code: 'WING-02',
    color: 'from-emerald-400 to-teal-600',
    border: 'border-emerald-500/40 hover:border-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(52,211,153,0.25)]',
    icon: Code2,
    tag: 'Full Stack & Distributed',
    description: 'High-throughput microservices, Next.js/React ecosystems, WebSockets, real-time sync engines, and distributed databases.',
    requirements: 'JavaScript/TypeScript, React, Node.js or Go, SQL/NoSQL databases.'
  },
  {
    id: 'cybersec',
    title: 'Cyber Security & Offensive Defense',
    code: 'WING-03',
    color: 'from-rose-500 to-red-600',
    border: 'border-rose-500/40 hover:border-rose-400',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.25)]',
    icon: Shield,
    tag: 'SecOps & CTF',
    description: 'Vulnerability assessment, reverse engineering, binary exploitation, cryptographic audits, and capture-the-flag battle squads.',
    requirements: 'Linux CLI, Wireshark, Bash/Python scripting, OWASP Top 10.'
  },
  {
    id: 'devops',
    title: 'Cloud Native & DevOps Engineering',
    code: 'WING-04',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/40 hover:border-purple-400',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    icon: Terminal,
    tag: 'Cloud & Infrastructure',
    description: 'Automated CI/CD pipelines, Kubernetes orchestration, Docker virtualization, serverless architectures, and zero-trust cloud security.',
    requirements: 'Docker, Linux, Git & GitHub Actions, AWS/GCP fundamentals.'
  },
  {
    id: 'uiux',
    title: 'Creative Design & UI/UX',
    code: 'WING-05',
    color: 'from-pink-500 to-fuchsia-600',
    border: 'border-pink-500/40 hover:border-pink-400',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.25)]',
    icon: Sparkles,
    tag: 'Product Experience',
    description: 'Design systems, micro-interaction physics, 3D WebGL visuals, cinematic motion graphics, and user research heuristics.',
    requirements: 'Figma, Visual aesthetics, Typography, Wireframing, Prototyping.'
  },
  {
    id: 'pr-lead',
    title: 'PR, Corporate Outreach & Leadership',
    code: 'WING-06',
    color: 'from-amber-400 to-orange-500',
    border: 'border-amber-500/40 hover:border-amber-400',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.25)]',
    icon: Users,
    tag: 'Operations & Growth',
    description: 'Industry partnerships, national hackathon hosting, corporate sponsor acquisition, content production, and community evangelism.',
    requirements: 'Public speaking, negotiation, high ownership, event coordination.'
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 'EXT-2026-001',
    name: 'Aarav Sharma',
    rollNo: '24CSE1042',
    year: '1st Year (Freshman)',
    branch: 'Computer Science & Engineering',
    email: 'aarav.sharma@campus.edu',
    phone: '+91 98765 43210',
    primaryDomain: 'Web & Systems Engineering',
    secondaryDomain: 'Cloud Native & DevOps Engineering',
    github: 'https://github.com/aarav-sharma-dev',
    portfolio: 'https://aarav.dev',
    resumeUrl: 'https://drive.google.com/file/d/mock-resume-aarav',
    skills: 'React, Node.js, PostgreSQL, Docker, TailwindCSS',
    whyJoin: 'I want to build real distributed apps and represent Extreme CSE in national hackathons like Smart India Hackathon.',
    status: 'Shortlisted',
    timestamp: '2026-10-01 16:20:10'
  },
  {
    id: 'EXT-2026-002',
    name: 'Rhea Sen',
    rollNo: '23CSE0891',
    year: '2nd Year (Sophomore)',
    branch: 'CSE (Artificial Intelligence & ML)',
    email: 'rhea.ai@campus.edu',
    phone: '+91 98111 22334',
    primaryDomain: 'AI, ML & Autonomous Systems',
    secondaryDomain: 'Creative Design & UI/UX',
    github: 'https://github.com/rhea-neural',
    portfolio: 'https://rhea-portfolio.vercel.app',
    resumeUrl: 'https://drive.google.com/file/d/mock-resume-rhea',
    skills: 'PyTorch, Hugging Face, OpenCV, LangChain, Streamlit',
    whyJoin: 'Extreme CSE has the highest research and hackathon output on campus. I want to build autonomous agentic workflows.',
    status: 'Round 2 Interview',
    timestamp: '2026-10-01 19:45:30'
  },
  {
    id: 'EXT-2026-003',
    name: 'Devansh Kulkarni',
    rollNo: '24IT0312',
    year: '1st Year (Freshman)',
    branch: 'Information Technology',
    email: 'devansh.k@campus.edu',
    phone: '+91 99882 11009',
    primaryDomain: 'Cyber Security & Offensive Defense',
    secondaryDomain: 'Web & Systems Engineering',
    github: 'https://github.com/devansh-pwn',
    portfolio: 'https://devansh.security',
    resumeUrl: 'https://drive.google.com/file/d/mock-resume-devansh',
    skills: 'Linux, Bash, Wireshark, Metasploit, Cryptography',
    whyJoin: 'Aiming to form our premier CTF squad to conquer national cybersecurity competitions.',
    status: 'Under Review',
    timestamp: '2026-10-02 01:10:15'
  }
];

const GOOGLE_SCRIPT_SNIPPET = `// ================================================================
// EXTREME CSE 2026-27 AUDITION SCRIPT (GOOGLE APPS SCRIPT)
// ================================================================
// 1. Open Google Sheet -> Extensions -> Apps Script
// 2. Paste this entire code into Code.gs and save.
// 3. Click 'Deploy' -> 'New Deployment' -> Select 'Web app'
// 4. Set 'Execute as' to 'Me' & 'Who has access' to 'Anyone'
// 5. Copy the Web App URL and paste it in the Extreme CSE Admin Webhook box!

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create styled header row if brand new sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Token / App ID",
        "Timestamp (IST)",
        "Candidate Name",
        "Roll No",
        "Year of Study",
        "Degree / Branch",
        "Email Address",
        "WhatsApp Contact",
        "Primary Wing",
        "Secondary Wing",
        "GitHub Link",
        "Portfolio Link",
        "Resume Drive URL",
        "Key Skills",
        "Statement of Purpose",
        "Review Status"
      ]);
      sheet.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#060810").setFontColor("#00f0ff");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.id || ("EXT-2026-" + Math.floor(1000 + Math.random() * 9000)),
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name,
      data.rollNo,
      data.year,
      data.branch,
      data.email,
      data.phone,
      data.primaryDomain,
      data.secondaryDomain,
      data.github || "",
      data.portfolio || "",
      data.resumeUrl || "",
      data.skills,
      data.whyJoin,
      data.status || "Under Review"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Audition recorded in Google Sheet!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`;

const FAQS = [
  {
    q: 'Can 1st year (freshers) with zero prior coding experience audition?',
    a: 'Absolutely YES! Extreme CSE does NOT judge beginners on how many frameworks they know. We evaluate raw curiosity, logic, willingness to grind, and problem-solving mindset. We have dedicated foundation mentors for freshers.'
  },
  {
    q: 'Can I apply for multiple wings?',
    a: 'Yes, our audition form allows you to select both a Primary Wing and a Secondary Wing. In Round 2, you can showcase tasks or interest in either or both fields.'
  },
  {
    q: 'How does the Google Sheet webhook sync work?',
    a: 'When you submit the audition form, your application details are asynchronously posted directly to your society’s Google Sheet via a lightweight Google Apps Script Web App. A backup copy is also cached locally in the browser so no response is ever lost.'
  },
  {
    q: 'What perks do Extreme CSE core members receive?',
    a: 'Members get fully-funded national hackathon travel, 24/7 access to high-performance GPU cluster credits, direct senior mentorship for placements/internships, exclusive swag kits, and leadership credentials.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'apply' | 'admin' | 'webhookGuide'
  const [customLogo, setCustomLogo] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Google Sheets Webhook URL state
  const [googleScriptUrl, setGoogleScriptUrl] = useState(() => {
    return localStorage.getItem('extreme_cse_webhook_url') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  // Auditions database
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('extreme_cse_auditions_2026_db');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Admin filter and search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    year: '1st Year (Freshman - Batch 2026-30)',
    branch: 'Computer Science & Engineering (Core)',
    email: '',
    phone: '',
    primaryDomain: DOMAINS[0].title,
    secondaryDomain: DOMAINS[1].title,
    github: '',
    portfolio: '',
    resumeUrl: '',
    skills: '',
    whyJoin: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [confirmationToken, setConfirmationToken] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('extreme_cse_auditions_2026_db', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if (googleScriptUrl) {
      localStorage.setItem('extreme_cse_webhook_url', googleScriptUrl);
    }
  }, [googleScriptUrl]);

  const playCyberSound = (type) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.08);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomLogo(reader.result);
        playCyberSound('success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.rollNo.trim()) errors.rollNo = 'College roll / student ID is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid institutional or personal email required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit WhatsApp number required';
    if (!formData.skills.trim()) errors.skills = 'Please list key skills, languages or tools';
    if (!formData.whyJoin.trim()) errors.whyJoin = 'Please describe your motivation and what makes you unique';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      playCyberSound('beep');
      return;
    }
    setFormErrors({});

    const token = `EXT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    const newRecord = {
      id: token,
      ...formData,
      status: 'Under Review',
      timestamp: nowTime
    };

    setIsSubmitting(true);
    playCyberSound('beep');

    // 1. Save directly into state and browser memory
    setApplications(prev => [newRecord, ...prev]);
    setConfirmationToken(token);

    // 2. Dispatch to live Google Sheet if webhook provided
    if (googleScriptUrl.trim()) {
      try {
        await fetch(googleScriptUrl.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        });
        setSubmissionFeedback('Dispatched to Google Sheet & registered in Extreme CSE central roster!');
      } catch (err) {
        console.warn('Webhook transmission error:', err);
        setSubmissionFeedback('Cached securely in portal roster. (Ensure your Google Sheet script has access permissions).');
      }
    } else {
      setSubmissionFeedback('Cached securely in local Extreme CSE roster! (Connect your Google Apps Script webhook to mirror rows in real-time).');
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
    playCyberSound('success');
  };

  const exportToCSV = () => {
    playCyberSound('beep');
    const headers = [
      'Token ID',
      'Timestamp',
      'Candidate Name',
      'Roll Number',
      'Year',
      'Branch',
      'Email',
      'Phone',
      'Primary Wing',
      'Secondary Wing',
      'GitHub',
      'Portfolio',
      'Resume URL',
      'Skills',
      'Statement',
      'Review Status'
    ];

    const rows = applications.map(app => [
      `"${app.id}"`,
      `"${app.timestamp}"`,
      `"${app.name}"`,
      `"${app.rollNo}"`,
      `"${app.year}"`,
      `"${app.branch}"`,
      `"${app.email}"`,
      `"${app.phone}"`,
      `"${app.primaryDomain}"`,
      `"${app.secondaryDomain}"`,
      `"${app.github || ''}"`,
      `"${app.portfolio || ''}"`,
      `"${app.resumeUrl || ''}"`,
      `"${(app.skills || '').replace(/"/g, '""')}"`,
      `"${(app.whyJoin || '').replace(/"/g, '""')}"`,
      `"${app.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Extreme_CSE_Auditions_2026_27_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(GOOGLE_SCRIPT_SNIPPET);
    setCopiedCode(true);
    playCyberSound('success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const filteredApplicants = applications.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = filterDomain === 'All' || app.primaryDomain === filterDomain || app.secondaryDomain === filterDomain;
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;

    return matchesSearch && matchesDomain && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 font-sans selection:bg-cyan-400 selection:text-black relative overflow-x-hidden">
      
      {/* Background Cybernetic Ambient Light Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[450px] bg-gradient-to-br from-cyan-600/15 via-purple-600/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-emerald-600/15 via-blue-600/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff07_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff07_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060810]/75 to-[#060810]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#060810]/85 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo and Identity */}
          <div 
            onClick={() => { setActiveTab('home'); playCyberSound('beep'); }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {customLogo ? (
              <img 
                src={customLogo} 
                alt="Extreme CSE Logo" 
                className="w-11 h-11 object-contain rounded-xl border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] p-1 bg-black/80" 
              />
            ) : (
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-emerald-400 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#070b16] rounded-xl flex items-center justify-center font-black font-mono text-cyan-400 text-lg tracking-tighter">
                  X<span className="text-emerald-400">C</span>
                </div>
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  EXTREME CSE
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  2026-27
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
                Apex Engineering Society & Innovation Lab
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-white/10 backdrop-blur">
            <button
              onClick={() => { setActiveTab('home'); playCyberSound('beep'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'home'
                  ? 'bg-cyan-500 text-black shadow-[0_0_18px_rgba(6,182,212,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Overview & Wings
            </button>
            <button
              onClick={() => { setActiveTab('apply'); playCyberSound('beep'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'apply'
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-[0_0_18px_rgba(52,211,153,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Audition Form
            </button>
            <button
              onClick={() => { setActiveTab('admin'); playCyberSound('beep'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-fuchsia-600 text-white shadow-[0_0_18px_rgba(217,70,239,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Sheet Database ({applications.length})
            </button>
            <button
              onClick={() => { setActiveTab('webhookGuide'); playCyberSound('beep'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'webhookGuide'
                  ? 'bg-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Webhook Setup
            </button>
          </nav>

          {/* Controls: Audio & Custom Logo Trigger */}
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleLogoUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Upload Extreme CSE Official Logo"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono hover:bg-cyan-900/40 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{customLogo ? 'Replace Logo' : 'Upload Logo'}</span>
            </button>

            <button
              onClick={() => { setSoundEnabled(!soundEnabled); playCyberSound('beep'); }}
              title="Toggle Audio Feedback"
              className="p-2.5 rounded-xl border border-white/10 hover:border-cyan-400/50 bg-slate-900/80 text-slate-300 hover:text-cyan-400 transition-all"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => { setActiveTab('apply'); playCyberSound('beep'); }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              Apply Now
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Content */}
      <main className="relative z-10">

        {/* ========================================================= */}
        {/* VIEW 1: HOME (ABOUT, MISSION, WINGS, STATS, ROADMAP, FAQS) */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SESSION 2026-27 AUDITIONS OPEN // BATCH OF 2026-2029
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
                WHERE CODE MEETS <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  EXTREME AMBITION.
                </span>
              </h1>

              <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
                <strong className="text-cyan-300 font-semibold">Extreme CSE</strong> is the apex technical collective dedicated to grooming elite software engineers, AI innovators, and tech leaders. We build production systems, win flagship national hackathons, and accelerate campus talent into top-tier global tech roles.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => { setActiveTab('apply'); playCyberSound('beep'); }}
                  className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 transition-all flex items-center gap-2.5 font-mono"
                >
                  <Rocket className="w-4 h-4 text-black fill-black" />
                  Register for Auditions
                </button>

                <button
                  onClick={() => { setActiveTab('admin'); playCyberSound('beep'); }}
                  className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 hover:border-cyan-400 backdrop-blur shadow-xl transition-all flex items-center gap-2.5 font-mono"
                >
                  <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                  Live Audition Roster
                </button>
              </div>

              {/* Real-time Impact Metrics */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-400">45+</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">Hackathons Won</div>
                  <div className="text-[11px] text-slate-500 mt-2">Smart India Hackathon, ETHIndia, HackHarvard.</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">500+</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">Active Alumni & Members</div>
                  <div className="text-[11px] text-slate-500 mt-2">Engineers at Google, Microsoft, Atlassian & startups.</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-purple-400">24+</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">Shipped Production Apps</div>
                  <div className="text-[11px] text-slate-500 mt-2">Campus ERP tools, open source packages & neural bots.</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/20 backdrop-blur shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">₹18 LPA</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">Avg Core Team Package</div>
                  <div className="text-[11px] text-slate-500 mt-2">High-growth referrals through alumni matrix.</div>
                </div>
              </div>

            </section>

            {/* What is Extreme CSE Section */}
            <section className="py-20 bg-slate-950/70 border-y border-cyan-500/20 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
                      The Society Core
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                      What Exactly is <span className="text-cyan-400">Extreme CSE</span>?
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Extreme CSE is not just another textbook college society. It is an industry-modeled engineering incubator. We bridge the chasm between rote academics and real world architectural mastery.
                    </p>
                    
                    <div className="space-y-4 pt-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Competitive Squad Deployment</div>
                          <div className="text-xs text-slate-400 mt-0.5">We sponsor and dispatch 4-member battle squads with all travel and registration covered to conquer national hackathons.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0 mt-0.5">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Compute & Hardware Lab Access</div>
                          <div className="text-xs text-slate-400 mt-0.5">Access high-performance GPU instances for machine learning models, cloud credits, and Raspberry Pi / ESP32 kits.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">1-on-1 Senior-to-Junior Peer Mentorship</div>
                          <div className="text-xs text-slate-400 mt-0.5">Every inductee is paired with a 3rd/4th-year senior mentor who guides your DSA roadmaps, resume polishing, and project commits.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Code Visualizer */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border border-cyan-500/30 bg-[#070b14] overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] font-mono text-xs">
                      <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500" />
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-slate-400 text-[11px] ml-2">extreme_cse_manifesto.ts</span>
                        </div>
                        <span className="text-cyan-400 text-[10px]">Session: 2026-27</span>
                      </div>

                      <div className="p-5 text-slate-300 space-y-2 leading-relaxed">
                        <p><span className="text-purple-400">interface</span> <span className="text-cyan-300">ExtremeCSERecruit</span> &#123;</p>
                        <p className="pl-4">name: <span className="text-amber-300">string</span>;</p>
                        <p className="pl-4">curiosityIndex: <span className="text-emerald-400">100</span> | <span className="text-emerald-400">Infinity</span>;</p>
                        <p className="pl-4">preferredWing: <span className="text-cyan-300">"AI"</span> | <span className="text-cyan-300">"FullStack"</span> | <span className="text-cyan-300">"SecOps"</span> | <span className="text-cyan-300">"Cloud"</span>;</p>
                        <p className="pl-4">readinessToShip: <span className="text-purple-400">boolean</span>;</p>
                        <p>&#125;</p>
                        <br />
                        <p><span className="text-slate-500">// Welcome to the 2026-27 Induction</span></p>
                        <p><span className="text-purple-400">export async function</span> <span className="text-blue-400">joinTheElite</span>() &#123;</p>
                        <p className="pl-4 text-emerald-300">const drive = await ExtremeCSE.openAuditions("2026-27");</p>
                        <p className="pl-4 text-cyan-200">const candidate = await auditionForm.submit();</p>
                        <p className="pl-4 text-purple-300">candidate.syncToGoogleSheets(&#123; realTime: true &#125;);</p>
                        <p className="pl-4 text-amber-200">return "Welcome to the Inner Circle of Extreme CSE.";</p>
                        <p>&#125;</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Wings & Domains Showcase */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/30">
                  Specialized Wings
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-4">
                  Choose Your Domain
                </h2>
                <p className="text-slate-400 mt-4 text-sm sm:text-base">
                  Auditions are open across 6 core wings. You can apply for both a Primary and Secondary preference in the application form.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DOMAINS.map((domain) => {
                  const IconComp = domain.icon;
                  return (
                    <div
                      key={domain.id}
                      className={`p-7 rounded-3xl bg-[#090d1a]/80 border ${domain.border} ${domain.glow} backdrop-blur transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-tr ${domain.color} text-black font-bold`}>
                            <IconComp className="w-5 h-5 text-black" />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-400 border border-white/10 px-2 py-0.5 rounded">
                            {domain.code}
                          </span>
                        </div>

                        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                          {domain.tag}
                        </div>
                        <h3 className="text-xl font-black text-white mt-1">
                          {domain.title}
                        </h3>

                        <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="text-[11px] font-mono text-slate-400">
                          <strong className="text-slate-200">Recommended Skills:</strong> {domain.requirements}
                        </div>
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, primaryDomain: domain.title }));
                            setActiveTab('apply');
                            playCyberSound('beep');
                          }}
                          className="mt-4 w-full py-2.5 rounded-xl border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 font-mono"
                        >
                          Audition for this Wing <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Audition Process Timeline */}
            <section className="py-20 bg-slate-950/80 border-t border-cyan-500/20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold px-3 py-1 rounded bg-purple-950/40 border border-purple-500/30">
                    Recruitment Arc
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-3">
                    Audition Stages (Session 2026-27)
                  </h2>
                </div>

                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Phase 1: Online Application & Portfolio Drop', desc: 'Submit your profile, GitHub, past projects or ideas. Beginners are evaluated on enthusiasm and logic rather than years of experience.' },
                    { step: '02', title: 'Phase 2: Wing-Specific Micro Task', desc: 'Shortlisted candidates receive an interesting 48-hour build challenge tailored to their primary wing (e.g. mini API, UI prototype, or research summary).' },
                    { step: '03', title: 'Phase 3: Technical & Culture Fit Interview', desc: 'In-person conversation with Extreme CSE Core Leads to discuss your approach, curiosity, teamwork spirit, and vision for 2026-27.' },
                    { step: '04', title: 'Phase 4: Official Induction & Core Allocation', desc: 'Welcome ceremony, onboarding kit, assignment of mentors, and enrollment into national hackathon preparation sprints.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6 items-start p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black text-lg flex items-center justify-center shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold px-3 py-1 rounded bg-amber-950/40 border border-amber-500/30">
                  Got Doubts?
                </span>
                <h2 className="text-3xl font-black uppercase text-white mt-3">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div 
                    key={idx}
                    onClick={() => { setOpenFaq(openFaq === idx ? null : idx); playCyberSound('beep'); }}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        {faq.q}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-cyan-400' : ''}`} />
                    </div>
                    {openFaq === idx && (
                      <p className="text-xs sm:text-sm text-slate-300 mt-3 pt-3 border-t border-white/5 leading-relaxed font-mono">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: AUDITION APPLICATION FORM (WITH DIRECT SYNC)      */}
        {/* ========================================================= */}
        {activeTab === 'apply' && (
          <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/40">
                Official Candidate Intake 2026-27
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-3">
                Extreme CSE Auditions
              </h2>
              <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
                Fill your details accurately. Submissions are synced directly to our centralized review database and Google Sheet.
              </p>
            </div>

            {/* Success Box after Submission */}
            {formSubmitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/60 shadow-[0_0_50px_rgba(52,211,153,0.3)] text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                    Audition Application Dispatched!
                  </h3>
                  <div className="text-sm font-mono text-cyan-400 mt-2">
                    Application ID: <span className="font-bold underline">{confirmationToken}</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-3 max-w-md mx-auto">
                    Your candidate profile has been recorded in the Extreme CSE roster. Our technical committee will review your profile and contact you via WhatsApp & Email for Phase 2.
                  </p>
                </div>

                {submissionFeedback && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                    {submissionFeedback}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        rollNo: '',
                        year: '1st Year (Freshman - Batch 2026-30)',
                        branch: 'Computer Science & Engineering (Core)',
                        email: '',
                        phone: '',
                        primaryDomain: DOMAINS[0].title,
                        secondaryDomain: DOMAINS[1].title,
                        github: '',
                        portfolio: '',
                        resumeUrl: '',
                        skills: '',
                        whyJoin: ''
                      });
                      playCyberSound('beep');
                    }}
                    className="px-6 py-2.5 rounded-xl border border-white/20 text-xs font-mono uppercase hover:border-cyan-400 hover:text-cyan-400 transition-all"
                  >
                    Submit Another Application
                  </button>

                  <button
                    onClick={() => { setActiveTab('admin'); playCyberSound('beep'); }}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-mono font-bold uppercase hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    View in Sheet Hub
                  </button>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={handleFormSubmit}
                className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6"
              >
                {/* Sync status indicator */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Google Sheet Sync Status:</span>
                    <span className={googleScriptUrl ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                      {googleScriptUrl ? 'Active & Connected' : 'Local Storage Mode (Webhook Optional)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('webhookGuide')}
                    className="underline hover:text-white"
                  >
                    Configure Webhook
                  </button>
                </div>

                {/* Section 1: Candidate Info */}
                <div>
                  <h3 className="text-sm font-mono uppercase text-cyan-400 font-bold tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    01. Student Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aryan Mehra"
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                      {formErrors.name && <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        College Roll / Student ID <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="text"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                        placeholder="e.g. 24CSE089"
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                      {formErrors.rollNo && <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.rollNo}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Current Year of Study</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      >
                        <option>1st Year (Freshman - Batch 2026-30)</option>
                        <option>2nd Year (Sophomore - Batch 2025-29)</option>
                        <option>3rd Year (Pre-Final - Batch 2024-28)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Degree / Branch</label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      >
                        <option>Computer Science & Engineering (Core)</option>
                        <option>CSE (Artificial Intelligence & ML)</option>
                        <option>CSE (Data Science / Big Data)</option>
                        <option>Information Technology (IT)</option>
                        <option>Electronics & Communication (ECE)</option>
                        <option>Other Relevant Engineering Branch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Email Address (Campus / Personal) <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@domain.edu"
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                      {formErrors.email && <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        WhatsApp Contact Number <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                      {formErrors.phone && <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.phone}</span>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Domain Selections */}
                <div>
                  <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    02. Wing Preferences
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Primary Wing Choice</label>
                      <select
                        value={formData.primaryDomain}
                        onChange={(e) => setFormData({ ...formData, primaryDomain: e.target.value })}
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors font-medium"
                      >
                        {DOMAINS.map(d => (
                          <option key={d.id} value={d.title}>{d.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Secondary / Backup Wing Choice</label>
                      <select
                        value={formData.secondaryDomain}
                        onChange={(e) => setFormData({ ...formData, secondaryDomain: e.target.value })}
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors font-medium"
                      >
                        {DOMAINS.map(d => (
                          <option key={d.id} value={d.title}>{d.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Technical Links & Skills */}
                <div>
                  <h3 className="text-sm font-mono uppercase text-purple-400 font-bold tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    03. Repositories, Skills & Resume
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Profile Link</label>
                      <input 
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Portfolio / LinkedIn Link</label>
                      <input 
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="https://mywork.dev"
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Resume Link (Google Drive / Notion)</label>
                      <input 
                        type="url"
                        value={formData.resumeUrl}
                        onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Key Technologies, Languages or Interests <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. C++, React, Python, Docker, Figma, Linux or Competitive Programming"
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                      {formErrors.skills && <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.skills}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Why Extreme CSE? What sets you apart? <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.whyJoin}
                        onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                        placeholder="Tell us about your enthusiasm, what projects you wish to build, or your goals for hackathons in 2026-27..."
                        className="w-full bg-[#080d1a] border border-white/15 focus:border-cyan-400 rounded-xl p-4 text-sm text-white focus:outline-none transition-colors"
                      />
                      {formErrors.whyJoin && <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.whyJoin}</span>}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    All applications undergo blind assessment by Core Leads.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:opacity-95 text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm font-mono shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-black text-black" />
                        Submit Audition Application
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: LIVE SHEET & AUDITION DATABASE ADMIN HUB           */}
        {/* ========================================================= */}
        {activeTab === 'admin' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-fuchsia-950/60 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-mono">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  LIVE GOOGLE SHEETS & AUDITION DATABASE
                </div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mt-1">
                  Applicant Review Central (2026-27)
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Total Submissions Recorded: <span className="text-cyan-400 font-bold">{applications.length} candidates</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('webhookGuide')}
                  className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  <Settings className="w-4 h-4" />
                  Google Sheet Webhook Setup
                </button>

                <button
                  onClick={exportToCSV}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                >
                  <Download className="w-4 h-4 text-black" />
                  Download CSV (For Google Sheets)
                </button>
              </div>
            </div>

            {/* Quick Status of Webhook */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${googleScriptUrl ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <div>
                  <div className="text-xs font-mono font-bold text-white">
                    Google Sheets Webhook URL:
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate max-w-lg">
                    {googleScriptUrl ? googleScriptUrl : 'No Webhook configured yet (Responses stored in local portal memory). Click Setup to connect!'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('webhookGuide')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline shrink-0"
              >
                {googleScriptUrl ? 'Update Webhook Endpoint' : 'Connect Google Sheet Now →'}
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-4">
              
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Name, Roll No, Email or App ID..."
                  className="w-full bg-[#080d1a] border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Wing:</span>
                  <select
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value)}
                    className="bg-[#080d1a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="All">All Wings</option>
                    {DOMAINS.map(d => (
                      <option key={d.id} value={d.title}>{d.tag}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-[#080d1a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Round 2 Interview">Round 2 Interview</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Applications Table */}
            <div className="rounded-2xl border border-cyan-500/20 bg-[#070b16] overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/80 text-cyan-300 uppercase tracking-wider">
                    <th className="p-3.5">App ID</th>
                    <th className="p-3.5">Candidate Name</th>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Year / Branch</th>
                    <th className="p-3.5">Primary Wing</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((app) => (
                      <tr 
                        key={app.id}
                        className="hover:bg-cyan-950/20 transition-colors group cursor-pointer"
                        onClick={() => setSelectedApplicant(app)}
                      >
                        <td className="p-3.5 font-bold text-cyan-400">{app.id}</td>
                        <td className="p-3.5 text-white font-medium">
                          <div>{app.name}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{app.email}</div>
                        </td>
                        <td className="p-3.5 text-slate-300">{app.rollNo}</td>
                        <td className="p-3.5 text-slate-400">
                          <div>{app.year.split(' ')[0]}</div>
                          <div className="text-[10px] text-slate-500">{app.branch.split(' ')[0]}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px]">
                            {app.primaryDomain.split(' ')[0]}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300">{app.phone}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            app.status === 'Shortlisted' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' :
                            app.status === 'Round 2 Interview' ? 'bg-purple-950/60 border-purple-500 text-purple-300' :
                            app.status === 'Accepted' ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' :
                            'bg-slate-800 border-white/20 text-slate-400'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApplicant(app);
                            }}
                            className="p-1.5 rounded-lg border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500">
                        No candidates match your search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: GOOGLE APPS SCRIPT WEBHOOK SETUP GUIDE            */}
        {/* ========================================================= */}
        {activeTab === 'webhookGuide' && (
          <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/40">
                  Google Sheet Synchronization Setup
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mt-2">
                  Connect Extreme CSE to Google Sheets
                </h2>
              </div>

              <button
                onClick={() => setActiveTab('admin')}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                Back to Database <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Webhook Configuration Input Box */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-8 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Live Google Apps Script Web App URL
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste the Web App deployment link generated from your Google Sheet's Apps Script below. Once saved, every new audition submitted from the form will automatically create a new row in your Google Sheet in real-time!
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="url"
                  value={googleScriptUrl}
                  onChange={(e) => setGoogleScriptUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                  className="flex-1 bg-[#080d1a] border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none"
                />
                <button
                  onClick={() => {
                    localStorage.setItem('extreme_cse_webhook_url', googleScriptUrl);
                    playCyberSound('success');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  Save Webhook
                </button>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">How to Create Your Free Google Sheet Webhook (2 Minutes):</h3>
              
              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-white">Create a New Sheet:</strong> Go to <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">sheets.new</a> and name it <em>"Extreme CSE Auditions 2026-27"</em>.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-white">Open Script Editor:</strong> Click on <strong>Extensions</strong> in the top menu &gt; <strong>Apps Script</strong>.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-white">Paste the Code:</strong> Replace any code in <code className="text-cyan-300">Code.gs</code> with the snippet below and click Save (Floppy icon).
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">4</span>
                  <div>
                    <strong className="text-white">Deploy:</strong> Click <strong>Deploy</strong> &gt; <strong>New Deployment</strong> &gt; Gear icon &gt; Select <strong>Web App</strong>. Set <em>"Who has access"</em> to <strong>"Anyone"</strong>. Copy the URL and paste it in the box above!
                  </div>
                </div>
              </div>

              {/* Code Snippet Box with Copy Button */}
              <div className="relative rounded-2xl bg-[#070b16] border border-white/15 overflow-hidden font-mono text-xs">
                <div className="p-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Google Apps Script (Code.gs)</span>
                  <button
                    onClick={handleCopySnippet}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
                  </button>
                </div>
                <pre className="p-4 text-slate-300 overflow-x-auto max-h-72 leading-relaxed">
                  {GOOGLE_SCRIPT_SNIPPET}
                </pre>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* CANDIDATE INSPECTION MODAL                                */}
      {/* ========================================================= */}
      {}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-mono font-bold text-cyan-400 text-xl">
                {selectedApplicant.name.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">
                  {selectedApplicant.id}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedApplicant.name}</h3>
                <div className="text-xs text-slate-400 font-mono">
                  {selectedApplicant.rollNo} • {selectedApplicant.year} • {selectedApplicant.branch}
                </div>
              </div>
            </div>

            {/* Quick Status Setter */}
            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-300">Audition Review Status:</span>
              <div className="flex flex-wrap gap-2">
                {['Under Review', 'Shortlisted', 'Round 2 Interview', 'Accepted'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setApplications(prev => prev.map(a => a.id === selectedApplicant.id ? { ...a, status: st } : a));
                      setSelectedApplicant(prev => ({ ...prev, status: st }));
                      playCyberSound('beep');
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                      selectedApplicant.status === st
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Information Grid */}
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase">Primary Wing Choice</div>
                  <div className="text-cyan-300 font-bold mt-0.5">{selectedApplicant.primaryDomain}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase">Secondary Choice</div>
                  <div className="text-purple-300 font-bold mt-0.5">{selectedApplicant.secondaryDomain}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase">Email Contact</div>
                  <a href={`mailto:${selectedApplicant.email}`} className="text-white hover:underline mt-0.5 block truncate">
                    {selectedApplicant.email}
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase">WhatsApp Contact</div>
                  <a href={`https://wa.me/${selectedApplicant.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline mt-0.5 block">
                    {selectedApplicant.phone}
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-wrap gap-4">
                {selectedApplicant.github && (
                  <a href={selectedApplicant.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedApplicant.portfolio && (
                  <a href={selectedApplicant.portfolio} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                    Portfolio <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedApplicant.resumeUrl && (
                  <a href={selectedApplicant.resumeUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline flex items-center gap-1">
                    Resume Drive <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-slate-400 text-[10px] uppercase mb-1">Key Technologies & Skills</div>
                <div className="text-white font-medium">{selectedApplicant.skills}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-slate-400 text-[10px] uppercase mb-1">Why Extreme CSE? (Statement)</div>
                <div className="text-slate-300 italic font-sans text-xs leading-relaxed">{selectedApplicant.whyJoin}</div>
              </div>

              <div className="text-[10px] text-slate-500 pt-2">
                Timestamp: {selectedApplicant.timestamp}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      {}
      <footer className="py-12 border-t border-cyan-500/20 relative z-10 bg-[#05070e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold">EXTREME CSE • SESSION 2026-27</span>
          </div>
          <div>
            Built with industrial neon aesthetics for collegiate engineers and tech architects.
          </div>
          <div className="flex gap-4 text-cyan-400">
            <button onClick={() => setActiveTab('apply')} className="hover:underline">Audition Form</button>
            <button onClick={() => setActiveTab('admin')} className="hover:underline">Sheet Hub</button>
            <button onClick={() => setActiveTab('webhookGuide')} className="hover:underline">Webhook Docs</button>
          </div>
        </div>
      </footer>

    </div>
  );
}