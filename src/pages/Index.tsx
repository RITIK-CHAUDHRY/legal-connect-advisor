
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Scale, Users, Shield, Phone, Mail, MapPin, Star, Clock, Award, Gavel, BookOpen, FileText, Eye } from 'lucide-react';
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
      <header ref={headerRef} className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl sticky top-0 z-50 dark:bg-gray-900/95 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div ref={logoRef} className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Scale className="h-10 w-10 text-gray-800 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 drop-shadow-lg dark:text-white" />
              <div className="absolute inset-0 bg-gray-800/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 dark:bg-white/20"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-gray-900 bg-gradient-to-r from-gray-800 via-slate-700 to-gray-900 bg-clip-text text-transparent tracking-tight leading-none dark:from-white dark:via-gray-100 dark:to-white">
                LawConnect
              </span>
              <span className="text-xs text-gray-600 font-medium tracking-wide uppercase dark:text-gray-300">
                Legal Excellence Platform
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-all duration-500 hover:scale-110 relative group font-semibold dark:text-gray-300 dark:hover:text-white">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-800 to-slate-600 transition-all duration-500 group-hover:w-full dark:from-white dark:to-gray-200"></span>
            </a>
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-all duration-500 hover:scale-110 relative group font-semibold dark:text-gray-300 dark:hover:text-white">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-800 to-slate-600 transition-all duration-500 group-hover:w-full dark:from-white dark:to-gray-200"></span>
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-all duration-500 hover:scale-110 relative group font-semibold dark:text-gray-300 dark:hover:text-white">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-800 to-slate-600 transition-all duration-500 group-hover:w-full dark:from-white dark:to-gray-200"></span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-3 border-2 hover:border-gray-800 border-gray-300 dark:border-gray-600 dark:hover:border-white"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </AnimatedButton>
            <AnimatedButton 
              onClick={() => setShowAuthModal(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 shadow-2xl transition-all duration-300 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <Eye className="h-4 w-4 mr-2" />
              Get Started
            </AnimatedButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-24 relative overflow-hidden dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/30 to-transparent animate-pulse dark:via-gray-700/20"></div>
        <div className="absolute top-20 left-10 floating-element">
          <Gavel className="h-16 w-16 text-gray-300 dark:text-gray-600" />
        </div>
        <div className="absolute top-40 right-20 floating-element">
          <BookOpen className="h-12 w-12 text-slate-400 dark:text-gray-500" />
        </div>
        <div className="absolute bottom-20 left-1/4 floating-element">
          <FileText className="h-14 w-14 text-gray-400 dark:text-gray-600" />
        </div>
        
        <div ref={heroRef as any} className="container mx-auto px-4 text-center relative z-10">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight dark:text-white">
            <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent drop-shadow-2xl dark:from-white dark:via-gray-100 dark:to-white">
              LawConnect
            </span>
            <br />
            <span className="text-4xl md:text-5xl bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-100">
              Legal Excellence Redefined
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium dark:text-gray-300">
            Experience the future of legal consultation. Connect with elite lawyers, manage cases with AI precision, 
            and access justice like never before through our revolutionary platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AnimatedButton 
              size="lg" 
              className="text-xl px-12 py-6 bg-gray-900 hover:bg-gray-800 text-white font-bold shadow-2xl hover:shadow-gray-500/30 transition-all duration-300 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100" 
              onClick={() => setShowAuthModal(true)}
            >
              <Scale className="h-6 w-6 mr-3" />
              Find Your Lawyer
            </AnimatedButton>
            <AnimatedButton 
              size="lg" 
              variant="outline" 
              className="text-xl px-12 py-6 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-800 font-bold text-gray-800 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-white dark:text-white"
            >
              <Award className="h-6 w-6 mr-3" />
              Explore Platform
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-200">
              Revolutionary Legal Platform
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed dark:text-gray-300">
              LawConnect transforms legal consultation through cutting-edge technology, 
              connecting clients with India's most accomplished legal professionals in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <AnimatedCard className="text-center group hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" glowColor="primary">
              <div className="p-8">
                <div className="relative mb-6">
                  <Shield className="h-16 w-16 text-gray-800 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 dark:text-white" />
                  <div className="absolute inset-0 bg-gray-800/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 dark:bg-white/10"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Elite Verification System</h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                  Every lawyer undergoes rigorous verification with AI-powered background checks, 
                  ensuring only the most qualified professionals join our network.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center group hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" glowColor="secondary">
              <div className="p-8">
                <div className="relative mb-6">
                  <Users className="h-16 w-16 text-gray-800 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 dark:text-white" />
                  <div className="absolute inset-0 bg-gray-800/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 dark:bg-white/10"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">AI-Powered Matching</h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                  Advanced algorithms analyze your case details and match you with specialists 
                  who have the exact expertise for your specific legal needs.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center group hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" glowColor="accent">
              <div className="p-8">
                <div className="relative mb-6">
                  <Scale className="h-16 w-16 text-gray-800 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 dark:text-white" />
                  <div className="absolute inset-0 bg-gray-800/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 dark:bg-white/10"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Transparent Justice</h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                  Revolutionary pricing model with real-time cost tracking, 
                  blockchain-secured payments, and complete transparency throughout your legal journey.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50/80 backdrop-blur-sm dark:bg-gray-800/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-200">What We Offer</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive legal services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard glowColor="primary" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <Phone className="h-8 w-8 text-gray-800 mb-4 transition-transform duration-300 hover:scale-110 dark:text-white" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Legal Consultation</h3>
                <p className="text-gray-600 mb-4 dark:text-gray-300">Video consultations with experienced lawyers</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Clock className="h-4 w-4 mr-2" />Per-minute billing
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Star className="h-4 w-4 mr-2" />Expert advice
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Shield className="h-4 w-4 mr-2" />Secure video calls
                  </li>
                </ul>
              </div>
            </AnimatedCard>

            <AnimatedCard glowColor="secondary" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <Award className="h-8 w-8 text-gray-800 mb-4 transition-transform duration-300 hover:scale-110 dark:text-white" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Case Management</h3>
                <p className="text-gray-600 mb-4 dark:text-gray-300">Full legal case handling and representation</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Users className="h-4 w-4 mr-2" />Dedicated lawyer
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Clock className="h-4 w-4 mr-2" />Case tracking
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Mail className="h-4 w-4 mr-2" />Regular updates
                  </li>
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-200">Get in Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatedCard glowColor="primary" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <ContactForm />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden dark:bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/20 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-xl font-bold">LawConnect</span>
              </div>
              <p className="text-gray-300">
                Connecting you with legal expertise across India.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@lawconnect.com</span>
                </div>
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LawConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
