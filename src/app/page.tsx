'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Clock, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  HelpCircle, 
  Star, 
  Activity, 
  Award,
  Settings,
  Users,
  Compass,
  MessageSquare,
  Menu,
  X
} from 'lucide-react'

// Staggered children variants for animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  }
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<'fitur' | 'solusi' | 'resources' | null>(null)
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const trustedLogos = [
    'Shopee', 'BNI', 'Mitsubishi', 'Amidis', 'J99 Corp', 
    'Ismaya', 'Shiseido', 'Ciputra', 'Hakuhodo', 'Midplaza'
  ]

  const bentoFeatures = [
    {
      title: 'Real-Time Selfie Attendance',
      description: 'Instant front-camera selfie verification. Light, privacy-centric, and secure from proxy manipulation.',
      icon: <Clock className="w-5 h-5 text-primary" />,
      badge: 'Real-Time',
      className: 'md:col-span-2'
    },
    {
      title: 'Automated Payroll Engine',
      description: 'Server-side automated PPh21 equivalent tax computations, insurance, and salary slips in one run.',
      icon: <CreditCard className="w-5 h-5 text-primary" />,
      badge: '99.9% Accurate',
      className: 'md:col-span-1'
    },
    {
      title: 'Operations Analytics',
      description: 'High-density charts and performance indicators tracking shift attendance, task progress, and low stocks.',
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      badge: 'Telemetry',
      className: 'md:col-span-1'
    },
    {
      title: 'Dynamic Roster & Workflow',
      description: 'Flexible morning/night shift allocation, custom approval policies, and online reimbursement logs.',
      icon: <Calendar className="w-5 h-5 text-primary" />,
      badge: 'Flexible',
      className: 'md:col-span-2'
    }
  ]

  const services = [
    {
      title: 'Enterprise Deployment',
      description: 'Large-scale deployment services featuring secure database migrations and on-site technical coordination.',
      icon: <Settings className="w-6 h-6 text-primary" />
    },
    {
      title: 'Custom Integration',
      description: 'Connect core operations with hardware biometric devices, legacy payroll bank networks, or custom REST APIs.',
      icon: <Compass className="w-6 h-6 text-primary" />
    },
    {
      title: '24/7 Dedicated Support',
      description: 'Instant issue resolution and technical support via WhatsApp with a Dedicated Account Manager.',
      icon: <MessageSquare className="w-6 h-6 text-primary" />
    }
  ]

  const stats = [
    { value: '93%', label: 'Payroll Processing Efficiency' },
    { value: '20 Mins', label: 'Average Payroll Reconciliation' },
    { value: '10,000+', label: 'Active Monitored Personnel' },
    { value: 'ISO 27001', label: 'Security & Integrity Standard' }
  ]

  const testimonials = [
    {
      quote: '“Our payroll cycle went from 2 days to 20 minutes with zero manual slip errors. The selfie-only verification has completely resolved audit gaps.”',
      author: 'Evelina Kusumawardhani',
      role: 'Director of HR, PT Wisma Kanta',
      verified: true
    },
    {
      quote: '“Extremely helpful for managing our retail operations across 15 branches. Shift scheduling and overtime calculations are now fully integrated.”',
      author: 'Risza Oki Pardira',
      role: 'HR Manager, Bintang Hartono',
      verified: true
    },
    {
      quote: '“The digital payslip and instant reimbursement tracker are highly appreciated by our staff. HR transparency has dramatically improved since migration.”',
      author: 'Jhony Andreas',
      role: 'CEO, Lankdev Operations',
      verified: true
    }
  ]

  const faqs = [
    {
      q: 'Is our attendance and payroll data secure?',
      a: 'Absolutely. All data is encrypted via SSL/TLS end-to-end and stored securely using Row Level Security policies. Daily automated backups are performed to guarantee zero data loss.'
    },
    {
      q: 'How do I start using the platform for free?',
      a: 'Simply click the Get Started button to register a new tenant space. You will instantly receive free-tier access supporting up to 15 team members forever.'
    },
    {
      q: 'Can it integrate with third-party software or biometric hardware?',
      a: 'Yes. We provide custom integration protocols and secure REST APIs to pull logic records from hardware devices or external payroll accounts directly to our cloud.'
    }
  ]

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background font-sans text-foreground overflow-x-hidden relative selection:bg-primary/20 selection:text-primary">
      
      {/* Top Header Banner */}
      <div className="bg-primary text-white py-2 z-50 overflow-hidden relative w-full border-b border-white/10">
        <div className="flex gap-x-12 w-max animate-marquee whitespace-nowrap text-[10px] font-mono font-bold uppercase tracking-wider select-none">
          {[1, 2, 3].map((_, idx) => (
            <span key={idx} className="flex items-center gap-x-12">
              <span>Apex Campaign 2026 // Upgrade the Speed and Accuracy of Your Enterprise Operations</span>
              <span className="text-white/40">//</span>
            </span>
          ))}
        </div>
      </div>

      {/* Floating Glass Navbar with Mega-Menu */}
      <header 
        className="sticky top-4 mx-auto w-[90%] max-w-6xl z-50 transition-all duration-300"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="liquid-glass px-6 py-4 flex justify-between items-center rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-5 h-5 border border-primary flex items-center justify-center rounded-[2px] font-mono text-[10px] font-bold text-primary">
                AP
              </div>
              <span className="font-mono tracking-widest text-xs font-semibold uppercase text-foreground">APEX</span>
            </Link>

            {/* Desktop Mega-Menu Nav triggers */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-gray-600">
              <button 
                onMouseEnter={() => setActiveMenu('fitur')}
                className={`hover:text-primary transition-colors cursor-pointer ${activeMenu === 'fitur' ? 'text-primary font-bold' : ''}`}
              >
                Fitur
              </button>
              <button 
                onMouseEnter={() => setActiveMenu('solusi')}
                className={`hover:text-primary transition-colors cursor-pointer ${activeMenu === 'solusi' ? 'text-primary font-bold' : ''}`}
              >
                Solusi
              </button>
              <button 
                onMouseEnter={() => setActiveMenu('resources')}
                className={`hover:text-primary transition-colors cursor-pointer ${activeMenu === 'resources' ? 'text-primary font-bold' : ''}`}
              >
                Resources
              </button>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-semibold text-gray-650 hover:text-foreground transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase rounded-[2px] transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Coba Gratis
            </Link>
          </div>

          {/* Mobile Hamburg Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-600 hover:text-foreground hover:bg-gray-100/50 rounded-md transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="md:hidden overflow-hidden bg-white border border-border rounded-lg shadow-lg mt-2 p-5 space-y-4"
            >
              <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-gray-600">
                <Link 
                  href="#fitur" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-primary py-2 border-b border-gray-100 font-bold"
                >
                  Fitur
                </Link>
                <Link 
                  href="#tentang-kami" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-primary py-2 border-b border-gray-100 font-bold"
                >
                  Solusi
                </Link>
                <Link 
                  href="#tentang-kami" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-primary py-2 border-b border-gray-100 font-bold"
                >
                  Tentang Kami
                </Link>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-gray-600 border border-border hover:bg-gray-50 rounded-[2px] font-mono uppercase"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase rounded-[2px] shadow-sm font-mono"
                >
                  Coba Gratis
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega-Menu Dropdown Panel */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white border border-border rounded-lg shadow-xl overflow-hidden z-40 p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {activeMenu === 'fitur' && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Core Features</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Payroll Engine</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Compute allowances, tax, and insurance automatically.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Payroll Reports</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Access high-fidelity records for fast audits.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Payouts & Slips</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Direct Deposit</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Automate bank transfers to thousands of employees in one click.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Digital Payslips</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Secure e-slips dispatched directly to the employee portal.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Claims & Expenses</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Reimbursement Logs</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Approve and disburse claims with single-action workflows.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Travel Allowance</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Request and log business trip travel expenses directly.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeMenu === 'solusi' && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">By Industry</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Hospitality</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Dynamic shifts and front-camera attendance logs.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Retail & Commerce</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Distributed staff monitoring and overtime loggers.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Business Scale</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Enterprise</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">ISO 27001 security standards and audit trails.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Startups & SMBs</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Flexible pricing tiers and rapid node activation.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">By Role</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">For HR Managers</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Automate payroll computations with zero stress.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">For Directors & CEOs</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">High-level manpower telemetry and real-time costs.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeMenu === 'resources' && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Calculation Tools</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Net Salary Calculator</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Estimate clean take-home pay structures for staff.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Bonus & THR Estimator</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Calculate annual bonus figures based on tenure.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Resources & Compliance</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">HR Dictionary</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">A comprehensive glossary of 100+ HR industry terms.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Blog & Insights</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Guides on compliance and labor standards.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest border-b border-border pb-1.5">Overtime Logic</h4>
                    <div className="space-y-3">
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Overtime Calculator</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Calculate legal overtime compensation rates easily.</p>
                        </Link>
                      </div>
                      <div className="group cursor-pointer">
                        <Link href="/register" className="block">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors uppercase">Guides & Ebooks</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 normal-case leading-snug">Best practices on managing remote field operations.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-20 z-10 flex flex-col gap-24 md:gap-32 overflow-x-hidden">
        
        {/* Section 1: Hero (Masthead) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-full overflow-hidden">
          <div className="lg:col-span-7 space-y-6 text-left w-full max-w-full">
            <div className="inline-block px-3 py-1 bg-orange-50 border border-primary/20 rounded-[2px] font-mono text-[10px] text-primary uppercase tracking-widest font-semibold max-w-full truncate">
              AUTOMATED WORKFLOWS, PAYROLL, & INVENTORY
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight max-w-full break-words">
              Scale your enterprise operations with lightning-fast automation.
            </h1>

            <p className="text-gray-500 text-sm md:text-base max-w-[55ch] leading-relaxed break-words">
              Empower your workforce. Simplify administration. Reconcile real-time attendance logs, process error-free payroll runs, and monitor inventory items from a single dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-full">
              <Link
                href="/register"
                className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-mono text-[11px] font-bold uppercase rounded-[2px] transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md shadow-primary/10 active:scale-[0.98] w-full sm:w-auto shrink-0"
              >
                Coba Gratis Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://wa.me/6282124153732?text=Halo%20Apex%2C%20saya%20tertarik%20dengan%20layanan%20demo%20sistem%20HRIS%20perusahaan."
                target="_blank"
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 border border-border font-mono text-[11px] font-bold uppercase rounded-[2px] transition-all text-center cursor-pointer active:scale-[0.98] w-full sm:w-auto shrink-0"
              >
                WhatsApp Sales
              </Link>
            </div>

            {/* Ratings Badge */}
            <div className="pt-6 border-t border-border flex flex-wrap gap-6 items-center w-full max-w-full">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 flex-wrap">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>4.8/5 di G2 Crowd & Capterra</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider break-all">
                ✓ Bank-grade Security Encryption
              </div>
            </div>
          </div>

          {/* Elevated Floating Dashboard Preview Image */}
          <div className="lg:col-span-5 relative flex justify-center w-full max-w-full overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="w-full max-w-md sm:max-w-full bg-white border border-border rounded-lg shadow-xl overflow-hidden p-2"
            >
              <img 
                src="/apex_dashboard_mockup.png" 
                alt="Apex Dashboard Mockup" 
                className="w-full h-auto rounded-md object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </section>

        {/* Section 2: Logo Marquee */}
        <section className="text-center space-y-6 overflow-hidden w-full relative">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">TRUSTED BY LEADING HIGH-GROWTH ENTERPRISES</p>
          
          <div className="relative w-full overflow-hidden py-4">
            {/* Subtle gradient fades on the sides for a premium look */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-x-24 w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer whitespace-nowrap opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300">
              {/* Triple render to make it continuous */}
              {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((logo, idx) => (
                <span key={idx} className="font-mono text-xs font-extrabold tracking-widest text-gray-500 uppercase select-none">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Core Features (Bento Grid) */}
        <section id="fitur" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">ENTERPRISE INTEGRATION</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">All-in-One Operations Control Center</h2>
            <p className="text-xs text-gray-500 leading-normal">A high-density Bento Grid interface consolidating real-time telemetry, automated calculations, and inventory monitoring.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {bentoFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className={`bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-60 relative group ${feat.className}`}
              >
                <div className="absolute top-4 right-4 bg-orange-50 border border-primary/20 text-primary text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] tracking-wide uppercase">
                  {feat.badge}
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-50 border border-primary/10 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide group-hover:text-primary transition-colors">{feat.title}</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed normal-case">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Section 4: About & Vision (Company Profile 2-Column) */}
        <section id="tentang-kami" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-border pt-24">
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">Our Vision & Mission</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Digitizing operations with absolute clarity.</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              We believe B2B execution stems from deterministic, audit-ready data. Our mission is to deliver clean, secure, and selfie-verified workflows that drive productivity.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">Apex Vision</h4>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">To be the standard workflow and operations panel for high-growth enterprises globally.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">Apex Mission</h4>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">To deliver transparent payroll computing, real-time SKU inventory logs, and rapid selfie verification.</p>
              </div>
            </div>
          </div>
          <div className="relative p-6 bg-gray-50 border border-border rounded-lg flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-4 left-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest">Enterprise Statistics</div>
            <div className="grid grid-cols-2 gap-6 p-6">
              {stats.map((st, idx) => (
                <div key={idx} className="space-y-1.5">
                  <p className="text-2xl font-extrabold text-primary tracking-tight">{st.value}</p>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider leading-snug">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Services Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">PREMIUM SERVICES</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Enterprise Implementation Support</h2>
            <p className="text-xs text-gray-500 leading-normal">Professional onboarding, data migration, and technical configuration designed for seamless setup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-orange-50 border border-primary/10 flex items-center justify-center mb-6">
                  {srv.icon}
                </div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{srv.title}</h3>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">{srv.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Security & Infrastructure */}
        <section className="bg-gray-55 bg-gray-50 border border-border rounded-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Data Privacy Guaranteed</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Bank-Grade Cryptographic Security</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              We prioritize the privacy of your workforce and financial records. All connections are secured via end-to-end SSL/TLS encryption, backed by Row Level Security (RLS) policies, and immutable audit trails.
            </p>
            <div className="flex flex-wrap gap-6 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              <span>✓ Database Isolation</span>
              <span>✓ Real-time Sync Backup</span>
              <span>✓ ISO/IEC 27001</span>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-2 bg-white border border-border rounded-lg shadow-sm w-full max-w-sm overflow-hidden">
              <img 
                src="/apex_payroll_illustration.png" 
                alt="Apex Payroll Security Illustration" 
                className="w-full h-auto rounded-md object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 7: Testimonials */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">PARTNER SUCCESS</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">What Business Leaders Say</h2>
            <p className="text-xs text-gray-500 leading-normal">Real stories from enterprise partners who migrated manual operations to Apex.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="bg-white border border-border rounded-lg p-6 shadow-sm flex flex-col justify-between min-h-52 hover:border-primary/20 transition-all"
              >
                <p className="text-xs text-gray-600 leading-relaxed italic">{test.quote}</p>
                <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase">{test.author}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">{test.role}</p>
                  </div>
                  {test.verified && (
                    <span className="px-2 py-0.5 text-[8px] font-mono font-bold bg-green-50 text-green-600 border border-green-200 rounded-[2px]">VERIFIED</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: FAQ Accordion */}
        <section className="max-w-3xl mx-auto space-y-12 border-t border-border pt-24">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = selectedFaq === idx
              return (
                <div key={idx} className="border border-border rounded-lg bg-white overflow-hidden transition-all">
                  <button
                    onClick={() => setSelectedFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-gray-950 uppercase tracking-wide">{faq.q}</span>
                    <span className="text-xs text-primary font-mono font-bold">{isOpen ? '[-]' : '[+]'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        <p className="px-6 py-4 text-xs text-gray-600 leading-relaxed border-t border-border">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 9: Global CTA */}
        <section className="bg-primary text-white rounded-lg p-8 md:p-16 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-50 -z-10" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold bg-white/10 px-3 py-1 border border-white/20 rounded-[2px]">Get Started</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Optimize Your Business Operations?
          </h2>
          <p className="text-white/80 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Get started with a 14-day free trial. Connect field logs, automate payroll pipelines, and centralize resource tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/register"
              className="px-6 py-3.5 bg-white text-primary font-mono text-[11px] font-bold uppercase rounded-[2px] transition-all hover:bg-gray-50 shadow-md cursor-pointer active:scale-[0.98]"
            >
              Mulai Coba Gratis
            </Link>
            <Link
              href="https://wa.me/6282124153732?text=Halo%20Apex%2C%20saya%20ingin%20jadwalkan%20layanan%20demo%20sistem%20Enterprise."
              target="_blank"
              className="px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono text-[11px] font-bold uppercase rounded-[2px] transition-all hover:bg-white/20 text-center cursor-pointer active:scale-[0.98]"
            >
              Jadwalkan Demo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-32">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border border-primary flex items-center justify-center rounded-[2px] font-mono text-[10px] font-bold text-primary">
                AP
              </div>
              <span className="font-mono tracking-widest text-xs font-semibold uppercase text-foreground">APEX</span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
              Unified SaaS Node for Operations, Attendance Logs, Task Boards, and Precision Inventories.
            </p>
          </div>
           <div>
            <h4 className="text-xs font-bold text-gray-950 uppercase tracking-widest mb-4">Core Solutions</h4>
            <ul className="text-xs text-gray-500 font-mono space-y-2">
              <li><Link href="#fitur" className="hover:text-primary transition-colors duration-200">Payroll Engine</Link></li>
              <li><Link href="#fitur" className="hover:text-primary transition-colors duration-200">Selfie Attendance</Link></li>
              <li><Link href="#fitur" className="hover:text-primary transition-colors duration-200">Task Board</Link></li>
              <li><Link href="#fitur" className="hover:text-primary transition-colors duration-200">Inventory Stock</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-950 uppercase tracking-widest mb-4">Company</h4>
            <ul className="text-xs text-gray-500 font-mono space-y-2">
              <li><Link href="#tentang-kami" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
              <li><Link href="https://wa.me/6282124153732?text=Halo%20Apex%2C%20saya%20tertarik%20dengan%20peluang%20karir%20di%20perusahaan." target="_blank" className="hover:text-primary transition-colors duration-200">Karir / Careers</Link></li>
              <li><Link href="https://wa.me/6282124153732?text=Halo%20Apex%2C%20saya%20ingin%20berbicara%20dengan%20tim%2520sales." target="_blank" className="hover:text-primary transition-colors duration-200">Contact Sales</Link></li>
              <li><Link href="https://wa.me/6282124153732?text=Halo%20Apex%2C%20saya%20tertarik%20bekerja%20sama%20sebagai%20mitra%20bisnis." target="_blank" className="hover:text-primary transition-colors duration-200">Partnerships</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-950 uppercase tracking-widest mb-4">Contact Us</h4>
            <p className="text-xs text-gray-500 font-mono leading-relaxed">
              PT Lankdev Operations Indonesia<br />
              Email: support@apex.local<br />
              Tel: +62 821-2415-3732
            </p>
          </div>
        </div>
        <div className="bg-gray-50 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider text-center sm:text-left">
            <span>© 2026 PT Lankdev Operations. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
              <span>/</span>
              <Link href="/" className="hover:text-primary transition-colors duration-200">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
