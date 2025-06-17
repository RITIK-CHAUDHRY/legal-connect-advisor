
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Scale, Users, Shield, Phone, Mail, MapPin, Star, Clock, Award } from 'lucide-react';
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

  useEffect(() => {
    // Animate header on load
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
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
      <header ref={headerRef} className="bg-background/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Scale className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              LawyerConnect
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">About Us</a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Services</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </AnimatedButton>
            <AnimatedButton onClick={() => setShowAuthModal(true)}>
              Sign Up
            </AnimatedButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-blue-500/10 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
        <div ref={heroRef as any} className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to <span className="animate-pulse">LawyerConnect</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We connect you with your legal advisor. Get professional legal consultation and case management services from verified lawyers across the country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-blue-600 hover:shadow-xl hover:shadow-primary/25" onClick={() => setShowAuthModal(true)}>
              Find a Lawyer
            </AnimatedButton>
            <AnimatedButton size="lg" variant="outline" className="text-lg px-8 hover:bg-primary/5">
              Learn More
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">About LawyerConnect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              LawyerConnect is India's leading platform for legal consultation and case management. 
              We bridge the gap between clients seeking legal advice and experienced, verified lawyers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard className="text-center" glowColor="primary">
              <div className="p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-4">Verified Lawyers</h3>
                <p className="text-muted-foreground">
                  All our lawyers are verified professionals with valid enrollment numbers and proven expertise.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center" glowColor="secondary">
              <div className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-4">Easy Connection</h3>
                <p className="text-muted-foreground">
                  Connect with lawyers based on your specific legal needs, location, and language preferences.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="text-center" glowColor="accent">
              <div className="p-6">
                <Scale className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
                <p className="text-muted-foreground">
                  Transparent pricing for consultations and case management with secure payment processing.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-secondary/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">What We Offer</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive legal services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard glowColor="primary">
              <div className="p-6">
                <Phone className="h-8 w-8 text-primary mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-semibold mb-2">Legal Consultation</h3>
                <p className="text-muted-foreground mb-4">Video consultations with experienced lawyers</p>
                <ul className="space-y-2 text-muted-foreground">
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

            <AnimatedCard glowColor="secondary">
              <div className="p-6">
                <Award className="h-8 w-8 text-primary mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-semibold mb-2">Case Management</h3>
                <p className="text-muted-foreground mb-4">Full legal case handling and representation</p>
                <ul className="space-y-2 text-muted-foreground">
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
      <section id="contact" className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatedCard glowColor="primary">
              <div className="p-6">
                <ContactForm />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-xl font-bold">LawyerConnect</span>
              </div>
              <p className="text-primary-foreground/80">
                Connecting you with legal expertise across India.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#about" className="hover:text-primary-foreground transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
                <li><a href="#services" className="hover:text-primary-foreground transition-all duration-300 hover:translate-x-2 inline-block">Services</a></li>
                <li><a href="#contact" className="hover:text-primary-foreground transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@lawyerconnect.com</span>
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

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 LawyerConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
