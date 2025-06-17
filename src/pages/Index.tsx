
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Scale, Users, Shield, Phone, Mail, MapPin, Star, Clock, Award, Gavel, BookOpen, FileText, Eye, UserCheck, Briefcase, Building } from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';
import { ContactForm } from '@/components/ContactForm';
import { ThreeBackground } from '@/components/ThreeBackground';
import { AnimatedCard } from '@/components/AnimatedCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { gsap } from 'gsap';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const heroRef = useGSAPAnimations();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Advanced header animation with legal theme
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0, rotationX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.2
        }
      );
    }

    // Logo animation with scale effect
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1,
          duration: 1.5, 
          ease: "elastic.out(1, 0.5)",
          delay: 0.8
        }
      );
    }

    // Enhanced title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          rotationY: -45
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1.8, 
          ease: "power4.out",
          delay: 1.2
        }
      );
    }

    // Staggered section animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { 
          opacity: 0, 
          y: 120,
          rotationX: 30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          scale: 1,
          duration: 1.2, 
          delay: index * 0.15 + 1.5,
          ease: "power3.out"
        }
      );
    });

    // Floating animation for hero elements
    gsap.to(".floating-element", {
      y: -15,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });

  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <ThreeBackground />
      
      {/* Header */}
      <header ref={headerRef} className="bg-slate-900/95 backdrop-blur-xl border-b-2 border-amber-500/30 shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div ref={logoRef} className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <Scale className="h-12 w-12 text-amber-400 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 drop-shadow-2xl filter drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
              <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white tracking-tight leading-none">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                  LawyerConnect
                </span>
              </span>
              <span className="text-sm text-amber-200/80 font-semibold tracking-wider uppercase border-l-2 border-amber-400 pl-2">
                Elite Legal Network
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-slate-300 hover:text-amber-400 transition-all duration-500 hover:scale-110 relative group font-semibold">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 group-hover:w-full"></span>
            </a>
            <a href="#services" className="text-slate-300 hover:text-amber-400 transition-all duration-500 hover:scale-110 relative group font-semibold">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-slate-300 hover:text-amber-400 transition-all duration-500 hover:scale-110 relative group font-semibold">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 group-hover:w-full"></span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-3 border-2 border-amber-400/50 hover:border-amber-400 text-amber-400"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </AnimatedButton>
            <AnimatedButton 
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-700 text-slate-900 font-bold px-6 py-3 shadow-2xl hover:shadow-amber-500/30"
            >
              <Eye className="h-4 w-4 mr-2" />
              Get Started
            </AnimatedButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-pulse"></div>
        <div className="absolute top-20 left-10 floating-element">
          <Gavel className="h-16 w-16 text-amber-400/30" />
        </div>
        <div className="absolute top-40 right-20 floating-element">
          <BookOpen className="h-12 w-12 text-blue-400/30" />
        </div>
        <div className="absolute bottom-20 left-1/4 floating-element">
          <FileText className="h-14 w-14 text-slate-400/30" />
        </div>
        
        <div ref={heroRef as any} className="container mx-auto px-4 text-center relative z-10">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl filter drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]">
              LawyerConnect
            </span>
            <br />
            <span className="text-4xl md:text-5xl bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">
              Legal Excellence Redefined
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the future of legal consultation. Connect with elite lawyers, manage cases with AI precision, 
            and access justice like never before through our revolutionary platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AnimatedButton 
              size="lg" 
              className="text-xl px-12 py-6 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-700 text-slate-900 font-bold shadow-2xl hover:shadow-amber-500/40" 
              onClick={() => setShowAuthModal(true)}
            >
              <Scale className="h-6 w-6 mr-3" />
              Find Your Lawyer
            </AnimatedButton>
            <AnimatedButton 
              size="lg" 
              variant="outline" 
              className="text-xl px-12 py-6 border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 hover:border-amber-300 font-bold"
            >
              <Award className="h-6 w-6 mr-3" />
              Explore Platform
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-24 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Choose Your Path
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Tailored experiences for every legal professional and client
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <AnimatedCard className="text-center group hover:scale-105 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-blue-500/30" glowColor="primary">
              <div className="p-8">
                <div className="relative mb-6">
                  <Users className="h-20 w-20 text-blue-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-[0_0_20px_rgba(96,165,250,0.6)]" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-blue-400">For Clients</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Find verified lawyers instantly, book consultations, and manage your legal cases with complete transparency and security.
                </p>
                <ul className="text-slate-400 space-y-3 mb-6">
                  <li className="flex items-center justify-center"><UserCheck className="h-4 w-4 mr-2 text-blue-400" />Instant lawyer matching</li>
                  <li className="flex items-center justify-center"><Clock className="h-4 w-4 mr-2 text-blue-400" />24/7 consultation booking</li>
                  <li className="flex items-center justify-center"><Shield className="h-4 w-4 mr-2 text-blue-400" />Secure case management</li>
                </ul>
                <AnimatedButton className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3">
                  Join as Client
                </AnimatedButton>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center group hover:scale-105 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-amber-500/30" glowColor="secondary">
              <div className="p-8">
                <div className="relative mb-6">
                  <Briefcase className="h-20 w-20 text-amber-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-amber-400">For Lawyers</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Expand your practice, connect with quality clients, and streamline your workflow with our advanced legal platform.
                </p>
                <ul className="text-slate-400 space-y-3 mb-6">
                  <li className="flex items-center justify-center"><Star className="h-4 w-4 mr-2 text-amber-400" />Premium client connections</li>
                  <li className="flex items-center justify-center"><Award className="h-4 w-4 mr-2 text-amber-400" />Practice management tools</li>
                  <li className="flex items-center justify-center"><Mail className="h-4 w-4 mr-2 text-amber-400" />Automated billing & reports</li>
                </ul>
                <AnimatedButton className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-700 text-slate-900 font-bold px-6 py-3">
                  Join as Lawyer
                </AnimatedButton>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center group hover:scale-105 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-purple-500/30" glowColor="accent">
              <div className="p-8">
                <div className="relative mb-6">
                  <Building className="h-20 w-20 text-purple-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-purple-400">Admin Portal</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Comprehensive platform management with advanced analytics, user verification, and system oversight capabilities.
                </p>
                <ul className="text-slate-400 space-y-3 mb-6">
                  <li className="flex items-center justify-center"><Shield className="h-4 w-4 mr-2 text-purple-400" />User verification system</li>
                  <li className="flex items-center justify-center"><FileText className="h-4 w-4 mr-2 text-purple-400" />Advanced analytics</li>
                  <li className="flex items-center justify-center"><Scale className="h-4 w-4 mr-2 text-purple-400" />Platform oversight</li>
                </ul>
                <AnimatedButton className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold px-6 py-3">
                  Admin Access
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Revolutionary Legal Platform
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              LawyerConnect transforms legal consultation through cutting-edge technology, 
              connecting clients with India's most accomplished legal professionals in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <AnimatedCard className="text-center group hover:scale-105 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/20" glowColor="primary">
              <div className="p-8">
                <div className="relative mb-6">
                  <Shield className="h-16 w-16 text-amber-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-amber-400">Elite Verification System</h3>
                <p className="text-slate-300 leading-relaxed">
                  Every lawyer undergoes rigorous verification with AI-powered background checks, 
                  ensuring only the most qualified professionals join our network.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center group hover:scale-105 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/20" glowColor="secondary">
              <div className="p-8">
                <div className="relative mb-6">
                  <Users className="h-16 w-16 text-blue-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">AI-Powered Matching</h3>
                <p className="text-slate-300 leading-relaxed">
                  Advanced algorithms analyze your case details and match you with specialists 
                  who have the exact expertise for your specific legal needs.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center group hover:scale-105 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/20" glowColor="accent">
              <div className="p-8">
                <div className="relative mb-6">
                  <Scale className="h-16 w-16 text-purple-400 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-purple-400">Transparent Justice</h3>
                <p className="text-slate-300 leading-relaxed">
                  Revolutionary pricing model with real-time cost tracking, 
                  blockchain-secured payments, and complete transparency throughout your legal journey.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">What We Offer</h2>
            <p className="text-xl text-slate-300">
              Comprehensive legal services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard glowColor="primary" className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-amber-500/20">
              <div className="p-6">
                <Phone className="h-8 w-8 text-amber-400 mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-semibold mb-2 text-amber-400">Legal Consultation</h3>
                <p className="text-slate-300 mb-4">Video consultations with experienced lawyers</p>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Clock className="h-4 w-4 mr-2 text-amber-400" />Per-minute billing
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Star className="h-4 w-4 mr-2 text-amber-400" />Expert advice
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Shield className="h-4 w-4 mr-2 text-amber-400" />Secure video calls
                  </li>
                </ul>
              </div>
            </AnimatedCard>

            <AnimatedCard glowColor="secondary" className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-blue-500/20">
              <div className="p-6">
                <Award className="h-8 w-8 text-blue-400 mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-semibold mb-2 text-blue-400">Case Management</h3>
                <p className="text-slate-300 mb-4">Full legal case handling and representation</p>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Users className="h-4 w-4 mr-2 text-blue-400" />Dedicated lawyer
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Clock className="h-4 w-4 mr-2 text-blue-400" />Case tracking
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Mail className="h-4 w-4 mr-2 text-blue-400" />Regular updates
                  </li>
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Get in Touch</h2>
            <p className="text-xl text-slate-300">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatedCard glowColor="primary" className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/20">
              <div className="p-6">
                <ContactForm />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden border-t-2 border-amber-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="h-8 w-8 text-amber-400 transition-transform duration-300 group-hover:rotate-12 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">LawyerConnect</span>
              </div>
              <p className="text-slate-300">
                Connecting you with legal expertise across India through cutting-edge technology and unwavering commitment to justice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#about" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">Services</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Info</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Mail className="h-4 w-4 mr-2 text-amber-400" />
                  <span>support@lawyerconnect.com</span>
                </div>
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Phone className="h-4 w-4 mr-2 text-amber-400" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <MapPin className="h-4 w-4 mr-2 text-amber-400" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-500/20 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 LawyerConnect. All rights reserved. | Powered by Advanced Legal Technology</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
