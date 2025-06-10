import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Code, Palette, Smartphone, Award, User, Briefcase, MessageCircle } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Account for navbar height
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack React application with payment integration and real-time inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      link: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking solution with biometric authentication and real-time transactions.",
      tech: ["React Native", "Firebase", "Node.js"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      link: "#"
    },
    {
      title: "AI Dashboard",
      description: "Analytics dashboard with machine learning insights and data visualization.",
      tech: ["React", "Python", "TensorFlow", "D3.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      link: "#"
    }
  ];

  const skills = [
    { name: "Frontend Development", icon: Code, level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "UI/UX Design", icon: Palette, level: 88, color: "from-purple-500 to-pink-500" },
    { name: "Mobile Development", icon: Smartphone, level: 82, color: "from-green-500 to-emerald-500" },
    { name: "Project Management", icon: Award, level: 90, color: "from-orange-500 to-red-500" }
  ];

  const ScrollIndicator = () => (
    <div className="absolute bottom-13 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-6 h-6 text-white" />
    </div>
  );

  const FloatingCursor = () => (
    <div 
      className="fixed w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
        transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
      }}
    />
  );

  const NavBar = () => (
    <nav className="fixed top-0 w-full bg-black/10 backdrop-blur-md z-[100] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`transition-all duration-300 hover:text-blue-400 ${
                  activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156,146,172,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="text-center z-10 px-6">
        <div className="mb-8 relative z-10">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-600 p-1 hero-pulse mt-16">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent hero-fade-in-up">
          DomDev
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 hero-fade-in-up hero-delay-200">
          Full Stack Developer & Creative Designer
        </p>
        
        <div className="flex justify-center space-x-6 mb-12 hero-fade-in-up hero-delay-400">
          <button 
            onClick={() => scrollToSection('projects')}
            className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="flex items-center space-x-2">
              <span>View My Work</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="border-2 border-white/20 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
        
        <div className="flex justify-center space-x-6 hero-fade-in-up hero-delay-600">
          {[Github, Linkedin, Mail].map((Icon, index) => (
            <button key={index} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:text-blue-400 hover:scale-110">
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
      
      <ScrollIndicator />
    </section>
  );

  const AboutSection = () => (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with 5+ years of experience creating digital experiences that combine beautiful design with powerful functionality.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My expertise spans across modern web technologies, mobile development, and user experience design. I love turning complex problems into simple, elegant solutions.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "5+", label: "Years Experience" },
                { number: "30+", label: "Happy Clients" },
                { number: "15+", label: "Awards Won" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-slate-700/50 rounded-lg backdrop-blur-sm hover:bg-slate-700 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                <p className="text-xl text-gray-300">Always learning, always growing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const SkillsSection = () => (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="group bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                    <p className="text-gray-400">{skill.level}% Proficiency</p>
                  </div>
                </div>
                
                <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out group-hover:animate-pulse`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const ProjectsSection = () => (
    <section id="projects" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-slate-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500">
                  <ExternalLink className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Let's Work Together
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Have a project in mind? I'd love to hear about it. Let's create something amazing together.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Mail, title: "Email", value: "john@example.com", color: "from-red-500 to-pink-500" },
            { icon: MessageCircle, title: "Phone", value: "+1 (555) 123-4567", color: "from-green-500 to-emerald-500" },
            { icon: Github, title: "GitHub", value: "@johndoe", color: "from-purple-500 to-blue-500" }
          ].map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className="group bg-slate-800/50 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${contact.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                <p className="text-gray-400">{contact.value}</p>
              </div>
            );
          })}
        </div>
        
        <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
          <span className="flex items-center justify-center space-x-2">
            <span>Start a Project</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );

  return (
    <div className="bg-slate-900 text-white min-h-screen overflow-x-hidden">
      <FloatingCursor />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
 <style jsx>{`
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }
`}</style>

    </div>
  );
};

export default Portfolio;