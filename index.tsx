import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Monitor, Server, RefreshCw, ArrowRight, Check, Mail, MessageSquare } from 'lucide-react';

// --- Animation Component ---

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div 
        ref={ref} 
        className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- UI Components ---

const BlockCard = ({ children, className = '', title, icon: Icon, color = 'bg-white' }) => {
  return (
    <div className={`${color} border-3 border-neo-black p-6 shadow-block transition-all duration-300 hover:shadow-block-hover hover:translate-x-[3px] hover:translate-y-[3px] h-full flex flex-col ${className}`}>
      {Icon && (
        <div className="mb-4 bg-neo-black text-white w-12 h-12 flex items-center justify-center border-2 border-transparent transition-transform duration-300 hover:rotate-12">
          <Icon size={24} />
        </div>
      )}
      {title && <h3 className="text-2xl font-bold mb-3 border-b-3 border-neo-black pb-2 inline-block w-full">{title}</h3>}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

const Badge = ({ text, color = 'bg-neo-blue' }) => (
    <span className={`${color} text-white text-xs font-mono py-1 px-2 border-2 border-neo-black font-bold uppercase tracking-wider inline-block`}>
        {text}
    </span>
);

// --- Sections ---

const Navbar = () => {
  return (
    <nav className="bg-white border-b-3 border-neo-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
              <Monitor size={32} strokeWidth={2.5} className="text-neo-black" />
              <span className="font-bold text-2xl tracking-tighter uppercase">Webconors</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Badge text="Simplifying The Web" color="bg-neo-purple" />
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-neo-black leading-tight tracking-tight">
              WE BUILD.<br/>
              <span className="bg-neo-yellow px-2 mr-2 inline-block hover:scale-105 transition-transform duration-300">YOU GROW.</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-6 text-xl text-gray-800 font-medium bg-white inline-block px-2 border-2 border-transparent shadow-sm">
              Complete website management for businesses. <br className="hidden md:block" />
              Design, Hosting, and Maintenance included.
            </p>
          </Reveal>
        </div>
      </div>
      
      {/* Decorative Blocks with smooth floating animations */}
      <div className="absolute top-20 left-10 w-16 h-16 border-3 border-neo-black bg-neo-blue shadow-block -z-0 animate-float hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-3 border-neo-black bg-neo-red shadow-block -z-0 animate-float-delayed hidden md:block"></div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white border-y-3 border-neo-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl font-extrabold uppercase mb-4">What You Get</h2>
            <div className="h-2 w-24 bg-neo-black mx-auto"></div>
          </Reveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={0} className="h-full">
            <BlockCard title="Creation" icon={Monitor} color="bg-neo-blue/10">
              <p className="font-medium mb-4">
                We design and build a professional website tailored to your brand identity. No templates, just results.
              </p>
              <ul className="space-y-2 font-mono text-sm">
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> Custom Design</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> Mobile Responsive</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> SEO Optimized</li>
              </ul>
            </BlockCard>
          </Reveal>

          <Reveal delay={200} className="h-full">
            <BlockCard title="Hosting" icon={Server} color="bg-neo-yellow/10">
              <p className="font-medium mb-4">
                Forget about server configurations. We handle the hosting on fast, secure servers.
              </p>
              <ul className="space-y-2 font-mono text-sm">
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> 99.9% Uptime</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> SSL Certificate</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> Fast Loading</li>
              </ul>
            </BlockCard>
          </Reveal>

          <Reveal delay={400} className="h-full">
            <BlockCard title="Updates" icon={RefreshCw} color="bg-neo-red/10">
              <p className="font-medium mb-4">
                Need to change a photo or update text? We include monthly updates so your site never gets stale.
              </p>
              <ul className="space-y-2 font-mono text-sm">
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> Content Changes</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> Security Patches</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-neo-green" /> Technical Support</li>
              </ul>
            </BlockCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-neo-green scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <Reveal>
            <div className="bg-white border-3 border-neo-black shadow-[10px_10px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 p-8 relative group">
               <div className="absolute -top-5 -right-5 bg-neo-red text-white border-3 border-neo-black px-4 py-2 font-bold rotate-12 shadow-sm group-hover:rotate-6 transition-transform duration-300">
                  BEST VALUE
               </div>
               
               <h2 className="text-3xl font-bold text-center mb-2">All-In-One Plan</h2>
               <p className="text-center text-gray-600 font-mono mb-8">Everything you need to succeed online.</p>
               
               <div className="text-center border-y-3 border-neo-black py-8 my-8 bg-gray-50 group-hover:bg-neo-yellow/10 transition-colors duration-300">
                  <span className="text-6xl font-extrabold block">₹1200</span>
                  <span className="text-gray-500 font-mono font-bold uppercase">Per Month</span>
               </div>
               
               <ul className="space-y-4 mb-8">
                  {[
                      "Custom Website Creation",
                      "Premium Hosting Included",
                      "Domain Configuration",
                      "Monthly Content Updates",
                      "24/7 Technical Maintenance",
                      "Mobile Optimization"
                  ].map((item, i) => (
                      <li key={i} className="flex items-center font-medium">
                          <div className="bg-neo-black text-white p-1 mr-3">
                              <Check size={14} />
                          </div>
                          {item}
                      </li>
                  ))}
               </ul>
               
               <div className="text-center bg-neo-blue/10 p-4 border-2 border-neo-blue border-dashed">
                  <p className="font-bold text-neo-blue">Ready? Scroll down to contact us.</p>
               </div>
            </div>
            <p className="text-center mt-6 font-mono font-bold opacity-75">
              No hidden fees. Cancel anytime.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white scroll-mt-24">
       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-3 border-neo-black p-8 md:p-16 shadow-block text-center relative overflow-hidden">
             {/* Decorative background element */}
             <div className="absolute top-0 left-0 w-full h-4 bg-neo-yellow border-b-3 border-neo-black"></div>
             
             <Reveal>
                <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6 mt-4">Get In Touch</h2>
                <p className="text-xl font-mono mb-12 max-w-2xl mx-auto text-gray-600">
                    Here is my contact information. Feel free to text or email me anytime.
                </p>
             </Reveal>

             <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* WhatsApp / Text Info Card */}
                <Reveal delay={200} className="h-full">
                    <div className="h-full border-3 border-neo-black p-8 bg-white relative transition-all duration-300 hover:shadow-block-hover hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-neo-green/5 shadow-block cursor-default">
                        <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center border-2 border-transparent mb-4 mx-auto transition-transform hover:rotate-12">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Text / WhatsApp</h3>
                        <p className="font-mono font-bold text-2xl text-neo-black">9704656422</p>
                    </div>
                </Reveal>

                {/* Email Info Card */}
                <Reveal delay={400} className="h-full">
                    <div className="h-full border-3 border-neo-black p-8 bg-white relative transition-all duration-300 hover:shadow-block-hover hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-neo-blue/5 shadow-block cursor-default">
                        <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center border-2 border-transparent mb-4 mx-auto transition-transform hover:rotate-12">
                            <Mail size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Email</h3>
                        <p className="font-mono font-bold text-xl md:text-2xl break-all text-neo-black">shivsanala@gmail.com</p>
                    </div>
                </Reveal>
             </div>
          </div>
       </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t-3 border-neo-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <Reveal className="flex items-center gap-2">
                <Monitor size={24} strokeWidth={2.5} className="text-neo-black" />
                <span className="font-bold text-xl tracking-tighter uppercase">Webconors</span>
            </Reveal>
            <Reveal delay={200} className="text-center md:text-right font-mono text-sm">
                <p>&copy; {new Date().getFullYear()} Webconors. All rights reserved.</p>
                <p className="mt-1 text-gray-500">Design that works.</p>
            </Reveal>
        </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen font-sans text-neo-black selection:bg-neo-yellow selection:text-neo-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);