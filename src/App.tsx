import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, TrendingUp, Users, Award, CheckCircle, ArrowRight, Calculator, Phone, Mail, MapPin, Clock, Star, ChevronDown, ChevronUp, Play, Pause, ChevronLeft, ChevronRight, Plus, Minus, Target, Eye, Zap, Lightbulb, BarChart3, Building, User, AlertTriangle, Send, ExternalLink, Building2, PieChart, LineChart, DollarSign } from 'lucide-react';
import ContactForm from './components/ContactForm';
import BusinessResults from './components/BusinessResults';
import ValuationCalculator from './components/ValuationCalculator';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    businessName: '',
    email: '',
    phone: '',
    employees: '',
    turnover: '',
    stressFactors: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your submission! We\'ll be in touch within 24 hours.');
      setFormData({
        name: '',
        position: '',
        businessName: '',
        email: '',
        phone: '',
        employees: '',
        turnover: '',
        stressFactors: ''
      });
    }, 2000);
  };

  const metrics = [
    {
      value: "£250M+",
      label: "Business Valuation Added",
      description: "Across all client engagements",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      value: "8.5x",
      label: "Average EBITDA Multiple",
      description: "Achieved in successful exits",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      value: "95%",
      label: "Client Retention Rate*",
      description: "*Retention rate measured after 6 months of engagement",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const vipiStages = [
    {
      stage: "Stage 1",
      title: "Vision",
      subtitle: "Strategic Foundation & Direction Setting",
      description: "Define direction and understand options through a 1–3 month deep dive with owners to shape goals and reaffirm core values.",
      topics: ["Business valuation", "Freeing up owner time", "Sale readiness", "Succession management", "Financial planning"],
      deliverables: ["Business Valuation Assessment", "Owner Liberation Plan", "Exit Readiness Framework"],
      icon: <Target className="w-12 h-12" />,
      color: "from-purple-600 to-purple-800"
    },
    {
      stage: "Stage 2",
      title: "Insight",
      subtitle: "Data-Driven Intelligence & Market Analysis",
      description: "Turn data into useful information for better decisions over 6–12 months to deliver growth impact.",
      topics: ["Understanding accounts", "KPIs", "Taxes", "Cashflow", "Working capital"],
      deliverables: ["Financial Intelligence Dashboard", "Tax Optimisation Strategy", "Working Capital Management System"],
      icon: <Eye className="w-12 h-12" />,
      color: "from-purple-700 to-purple-900"
    },
    {
      stage: "Stage 3",
      title: "Productivity",
      subtitle: "Operational Excellence & System Optimisation",
      description: "Use insight to optimise processes and people, driving growth after 12–18 months.",
      topics: ["Sales processes", "Team incentives", "People power", "Process power"],
      deliverables: ["Sales Process Optimisation", "Team Incentive Framework", "Process & People Power Plan"],
      icon: <Zap className="w-12 h-12" />,
      color: "from-purple-800 to-indigo-900"
    },
    {
      stage: "Stage 4",
      title: "Innovation",
      subtitle: "Creative Solutions & Market Differentiation",
      description: "Build innovation on strong foundation for profitability and sustainable growth.",
      topics: ["New products", "New markets", "Overseas expansion", "Workforce expansion"],
      deliverables: ["New Product/Service Development", "Market Expansion Strategy", "Workforce Scaling Plan"],
      icon: <Lightbulb className="w-12 h-12" />,
      color: "from-indigo-800 to-purple-900"
    }
  ];

  const partnerships = [
    {
      name: "MooreMentum",
      description: "Market-leading business growth advisers with an accredited, proven VIPI system for owner-managed businesses.",
      url: "https://mooreks.co.uk/"
    },
    {
      name: "Allica Bank",
      description: "The UK's fastest-growing bank, specialising in SMEs with deep understanding of challenges facing established businesses.",
      url: "https://www.allica.bank/"
    }
  ];
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const caseStudies = [
    {
      company: "Eden Facades",
      metric: "Net Assets Growth",
      before: "£291K",
      after: "£2.54M",
      growth: "+773%",
      period: "2019–2024",
      quote: "The VIPI Growth Programme is extremely progressive and transformative. The profit growth results are outstanding. We would highly recommend it to every entrepreneurial owner-manager.",
      author: "Tony Hill, Managing Director",
      chartData: [291, 338, 832, 419, 1420, 2540]
    },
    {
      company: "Pump Street Chocolate",
      metric: "Net Assets Growth",
      before: "£19K",
      after: "£926K",
      growth: "+4,774%",
      period: "2019–2024",
      quote: "The process helped us implement changes on time and in full, reducing day-to-day stress while focusing on strategic growth. Our monthly meetings are thought-provoking, constructive and beneficial. We really feel the MooreMentum team know our business well – they are the best we have worked with in the advisory world.",
      author: "Chris Brennan, Director",
      chartData: [19, 3, 275, 1280, 1100, 926]
    },
    {
      company: "London Vision Clinic Partners",
      metric: "EBIT Growth & Exit",
      before: "£94K",
      after: "£2.19M",
      growth: "+2,230%",
      exitValue: "£30.9M",
      period: "2020–2021",
      quote: "The unique IPI processes, which promote aligned goals and give the management team a clear view of our own business, helped guide us to achieve an exit event value materially beyond anything achievable at the start of the process. We would thoroughly recommend the IPI Growth Programme and the MooreMentum team.",
      author: "Craig Engelfried, Managing Director",
      chartData: [94, 2190],
      hasNasdaqLink: true
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-black/20 backdrop-blur-sm'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://images2.imgbox.com/5f/42/iA7HFXwy_o.png"
                alt="Kelvin Growth Logo"
                className="h-32 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#vipi" className={`transition-all duration-300 font-bold text-lg tracking-wide ${
                isScrolled ? 'text-gray-800 hover:text-purple-800 hover:scale-110' : 'text-white hover:text-purple-200 drop-shadow-lg hover:scale-110'
              }`}>VIPI Programme</a>
              <a href="#partnerships" className={`transition-all duration-300 font-bold text-lg tracking-wide ${
                isScrolled ? 'text-gray-800 hover:text-purple-800 hover:scale-110' : 'text-white hover:text-purple-200 drop-shadow-lg hover:scale-110'
              }`}>Partnerships</a>
              <a href="#success-stories" className={`transition-all duration-300 font-bold text-lg tracking-wide ${
                isScrolled ? 'text-gray-800 hover:text-purple-800 hover:scale-110' : 'text-white hover:text-purple-200 drop-shadow-lg hover:scale-110'
              }`}>Success Stories</a>
              <a href="#contact" className={`transition-all duration-300 font-bold text-lg tracking-wide ${
                isScrolled ? 'text-gray-800 hover:text-purple-800 hover:scale-110' : 'text-white hover:text-purple-200 drop-shadow-lg hover:scale-110'
              }`}>Contact</a>
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="bg-purple-800 hover:bg-purple-900 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Valuation Calculator
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'hover:bg-gray-100 text-gray-800' : 'hover:bg-white/10 text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className={`md:hidden transition-all duration-300 overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mx-4 ${
            isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-3 px-4">
              <a href="#vipi" className="block text-gray-600 hover:text-purple-800 transition-colors duration-300 py-2">VIPI Programme</a>
              <a href="#partnerships" className="block text-gray-600 hover:text-purple-800 transition-colors duration-300 py-2">Partnerships</a>
              <a href="#success-stories" className="block text-gray-600 hover:text-purple-800 transition-colors duration-300 py-2">Results</a>
              <a href="#contact" className="block text-gray-600 hover:text-purple-800 transition-colors duration-300 py-2">Contact</a>
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full bg-purple-800 hover:bg-purple-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Valuation Calculator
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {
              console.log('Video autoplay blocked');
            });
          }}
          onError={(e) => {
            console.error('Video failed to load');
          }}
        >
          <source src="https://xfxgavqdippgfoawsavh.supabase.co/storage/v1/object/public/Video%20BAckground/Untitled%20design%20(1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
       <div className="absolute inset-0 bg-black/40 z-10"></div>

<div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-16 sm:py-20">
  <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 sm:p-12 lg:p-16 shadow-2xl transform hover:scale-105 transition-all duration-500">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 lg:mb-8 px-1 sm:px-2">
      <span className="text-black">Growth starts with one question:</span>
      <span className="block text-purple-800 mt-2">What is possible?</span>
    </h1>

    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8 lg:mb-10 leading-relaxed px-2 sm:px-4">
      Discover how our proven VIPI framework can unlock your business potential and transform your vision into measurable results.
    </p>

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
      
      {/* Start Conversation */}
      <a
        href="#contact"
        className="btn-primary"
      >
        <span>Start a Conversation</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>

      {/* Explore VIPI */}
      <button
        onClick={() => {
          document.getElementById('vipi-programme')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="btn-secondary"
      >
        <span>Explore the VIPI Programme</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Calculator */}
      <button
        onClick={() => setIsCalculatorOpen(true)}
        className="btn-primary"
      >
        <span>Try Our Valuation Calculator</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  </div>
</div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Who We Work With
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              We partner with ambitious UK business owners who share three key characteristics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Characteristics */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Real Aspiration for Growth</h3>
                    <p className="text-purple-100 leading-relaxed">
                      You're not just maintaining the status quo. You have genuine ambitions to scale your business, 
                      increase profitability, and create lasting value. Growth isn't just a nice-to-have—it's essential 
                      to your vision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Willing to Engage & Be Honest</h3>
                    <p className="text-purple-100 leading-relaxed">
                      Success requires transparency. You're ready to have open conversations about your challenges, 
                      share your financial realities, and work collaboratively with our team. No hidden agendas—just 
                      honest partnership.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-purple-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Any Sector, UK-Based</h3>
                    <p className="text-purple-100 leading-relaxed">
                      Whether you're in technology, manufacturing, retail, professional services, or any other sector, 
                      our VIPI framework adapts to your industry. We work with UK businesses of all types who are 
                      serious about growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual & CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm p-12 rounded-3xl border border-white/20 shadow-2xl">
                <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Building className="w-12 h-12 text-purple-800" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform?</h3>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center justify-center space-x-3 text-purple-100">
                    <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                    <span>Growth-focused mindset</span>
                  </li>
                  <li className="flex items-center justify-center space-x-3 text-purple-100">
                    <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                    <span>Open to collaboration</span>
                  </li>
                  <li className="flex items-center justify-center space-x-3 text-purple-100">
                    <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                    <span>UK-based business</span>
                  </li>
                  <li className="flex items-center justify-center space-x-3 text-purple-100">
                    <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                    <span>Any sector welcome</span>
                  </li>
                </ul>
                
                <div className="space-y-4">
                  <a 
                    href="#contact" 
                    className="block bg-white text-purple-800 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Start the Conversation
                  </a>
                  <button 
                    onClick={() => setIsCalculatorOpen(true)}
                    className="block w-full border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  >
                    Calculate Your Potential
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Not Right For */}
          <div className="mt-20 pt-16 border-t border-white/20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">We're Not Right For Everyone</h3>
              <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                If any of these describe you, we might not be the best fit:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Status Quo Mindset</h4>
                <p className="text-purple-200 text-sm">
                  If you're comfortable with current performance and not genuinely interested in growth.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Closed Communication</h4>
                <p className="text-purple-200 text-sm">
                  If you're not willing to share financial details or discuss challenges openly.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Quick Fix Seekers</h4>
                <p className="text-purple-200 text-sm">
                  If you're looking for overnight solutions rather than sustainable transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIPI Programme Metrics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
                We Own the Outcome
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Anyone can give advice; we make commitments. With a pricing model tied to your success, we become true stakeholders in your outcomes. This has thus far helped numerous business owners realize incredible amounts of hidden value and achieve their vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="group relative bg-white p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-purple-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3 group-hover:text-purple-800 transition-colors duration-300">
                  {metric.value}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {metric.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {metric.description}
                </p>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIPI Programme Overview */}
      <section id="vipi" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-300 rounded-full -translate-y-32 animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/3 w-40 h-40 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-indigo-900/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              The <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">VIPI</span> Programme
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-12">
             A proven, systematic approach to business transformation that has delivered exceptional results for businesses across the UK.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-500">
                <div className="text-3xl font-bold text-white mb-2">V</div>
                <div className="text-sm font-semibold text-purple-100">Vision</div>
              </div>
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-500">
                <div className="text-3xl font-bold text-white mb-2">I</div>
                <div className="text-sm font-semibold text-purple-100">Insight</div>
              </div>
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-500">
                <div className="text-3xl font-bold text-white mb-2">P</div>
                <div className="text-sm font-semibold text-purple-100">Productivity</div>
              </div>
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-500">
                <div className="text-3xl font-bold text-white mb-2">I</div>
                <div className="text-sm font-semibold text-purple-100">Innovation</div>
              </div>
            </div>
          </div>

          {/* VIPI Stages */}
          <div className="space-y-16 relative z-10">
            {vipiStages.map((stage, index) => (
              <div key={index} className="relative">

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="mb-6 bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl">
                      <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
                        {stage.stage}
                      </span>
                      <h3 className="text-4xl font-bold text-gray-800 mb-3">{stage.title}</h3>
                      <p className="text-xl text-purple-600 font-medium mb-6">{stage.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed text-lg mb-8">{stage.description}</p>
                    </div>

                    {/* Topics */}
                    <div className="mb-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Focus Areas:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {stage.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Deliverables:</h4>
                      <div className="space-y-3">
                        {stage.deliverables.map((deliverable, deliverableIndex) => (
                          <div key={deliverableIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Visual */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    {/* Quote for Vision stage only - placed above the visual card on right side */}
                    {index === 0 && (
                      <div className="mb-8 bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200 shadow-lg relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-200 rounded-full translate-y-6 -translate-x-6 opacity-30"></div>
                        
                        {/* Quote icon */}
                        <div className="relative z-10">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          {/* Quote text */}
                          <blockquote className="text-base font-medium text-gray-800 leading-relaxed mb-4 italic relative z-10">
                            "This process has been life-changing. The vision we created has helped us deliver incredible growth beyond our expectations."
                          </blockquote>
                          
                          {/* Attribution */}
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                              <Building className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">Construction Business Owner</div>
                              <div className="text-purple-600 text-xs font-medium">VIPI Programme Client</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quote for Productivity stage - placed above the visual card on right side */}
                    {index === 2 && (
                      <div className="mb-8 bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-200 shadow-lg relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-green-200 rounded-full translate-y-6 -translate-x-6 opacity-30"></div>
                        
                        {/* Quote icon */}
                        <div className="relative z-10">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          {/* Quote text */}
                          <blockquote className="text-base font-medium text-gray-800 leading-relaxed mb-4 italic relative z-10">
                            "The team supported us through challenging times. Their insight had a dramatic effect on improving our margins and profit."
                          </blockquote>
                          
                          {/* Attribution */}
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                              <Building className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">Agricultural Business Owner</div>
                              <div className="text-green-600 text-xs font-medium">VIPI Programme Client</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quote for Insight stage - placed above the visual card on right side */}
                    {index === 1 && (
                      <div className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 shadow-lg relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-blue-200 rounded-full translate-y-6 -translate-x-6 opacity-30"></div>
                        
                        {/* Quote icon */}
                        <div className="relative z-10">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          {/* Quote text */}
                          <blockquote className="text-base font-medium text-gray-800 leading-relaxed mb-4 italic relative z-10">
                            "The VIPI programme gave us the support and insight needed to make better business decisions. We're now more confident than ever about our future after working with MooreMentum."
                          </blockquote>
                          
                          {/* Attribution */}
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                              <Building className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">Agricultural Business Owner</div>
                              <div className="text-blue-600 text-xs font-medium">VIPI Programme Client</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quote for Innovation stage - placed above the visual card on right side */}
                    {index === 3 && (
                      <div className="mb-8 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200 shadow-lg relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-indigo-200 rounded-full translate-y-6 -translate-x-6 opacity-30"></div>
                        
                        {/* Quote icon */}
                        <div className="relative z-10">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          {/* Quote text */}
                          <blockquote className="text-base font-medium text-gray-800 leading-relaxed mb-4 italic relative z-10">
                            "The VIPI Growth Programme is transformative with outstanding results. We'd highly recommend it to every entrepreneurial owner-manager."
                          </blockquote>
                          
                          {/* Attribution */}
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center">
                              <Building className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">Tony Hill, Eden Facades</div>
                              <div className="text-indigo-600 text-xs font-medium">VIPI Programme Client</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={`relative p-12 rounded-3xl bg-gradient-to-br ${stage.color} text-white shadow-2xl transform hover:scale-105 transition-all duration-500`}>
                      <div className="text-center">
                        <div className="mb-8 text-white/90">
                          {stage.icon}
                        </div>
                        <h4 className="text-3xl font-bold mb-4">{stage.title}</h4>
                        <p className="text-white/90 text-lg leading-relaxed">{stage.subtitle}</p>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
                      <div className="absolute top-1/2 left-4 w-8 h-8 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Connection Line (except for last item) */}
                {index < vipiStages.length - 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="w-px h-16 bg-gradient-to-b from-purple-300 to-purple-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 relative z-10">
            <div className="bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/30">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Your VIPI Journey?</h3>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  Each stage builds on the previous one, creating a comprehensive transformation that delivers lasting results.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-900 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  Start with Stage 1: Vision
                </a>
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="border-2 border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                >
                  Calculate Your Potential
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section id="partnerships" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-300 rounded-full -translate-y-32 animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-indigo-900/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              In Partnership With
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Creating the prosperity of tomorrow alongside the most effective SME advocates in the UK.
            </p>
          </div>

          {/* Partnership Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10">
            {/* MooreMentum Card */}
            <a 
              href="https://mooreks.co.uk/services/business-growth-services/owner-managed-businesses/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30 hover:shadow-2xl hover:bg-white hover:border-purple-200 transition-all duration-500 hover:scale-105 cursor-pointer group"
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <img 
                  src="https://i.imgur.com/LNOOR4O.png" 
                  alt="MooreMentum Logo" 
                  className="w-50 h-auto mx-auto object-contain"
                />
              </div>
              
              {/* Company Name */}

              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                MooreMentum
              </h3>
               
              {/* Description */}
              <p className="text-gray-600 text-center leading-relaxed mb-8">
                Market-leading business growth advisers with a proven VIPI system for growing owner-managed businesses.
              </p>
              
              {/* Call to Action */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-900 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:shadow-purple-500/50">
                  Learn More
                </button>
              </div>
            </a>

            {/* Allica Bank Card */}
            <a 
              href="https://www.allica.bank/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30 hover:shadow-2xl hover:bg-white hover:border-indigo-200 transition-all duration-500 hover:scale-105 cursor-pointer group"
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <img 
                  src="https://i.imgur.com/vG6pbtw.png" 
                  alt="Allica Bank Logo" 
                  className="w-50 h-auto mx-auto object-contain"
                />
              </div>
              
              {/* Company Name */}
           
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Allica Bank
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-center leading-relaxed mb-8">
                The UK's fastest-growing bank, specialising in SMEs with deep understanding of challenges facing established businesses.
              </p>
              
              {/* Call to Action */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-indigo-800 to-indigo-600 hover:from-indigo-900 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:shadow-indigo-500/50">
                  Learn More
                </button>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="success-stories">
        <BusinessResults />
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Valuation Calculator Modal */}
      {isCalculatorOpen && (
        <ValuationCalculator 
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />
      )}
    </div>
  );
}

export default App;