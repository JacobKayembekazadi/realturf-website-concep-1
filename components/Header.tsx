
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles, Phone, MapPin } from 'lucide-react';
import { Section } from '../App';

interface HeaderProps {
  onGetQuote: () => void;
  setActiveSection: (section: Section) => void;
  activeSection: Section;
}

export default function Header({ onGetQuote, setActiveSection, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Section }[] = [
    { label: 'Products', id: 'products' },
    { label: 'Dealers', id: 'dealers' },
    { label: 'Resources', id: 'resources' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveSection('home')}
        >
          <div className="w-10 h-10 bg-red-600 rounded-br-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
            <span className="text-white font-black text-xl">R</span>
          </div>
          <div className="hidden sm:block">
            <h1 className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              REALTURF<span className="text-red-600">USA</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">AI Intelligence</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative text-sm font-bold uppercase tracking-widest transition-colors hover:text-red-600 ${activeSection === item.id ? 'text-red-600' : 'text-gray-700'}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onGetQuote}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-black transition-all shadow-xl shadow-red-600/20 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Get AI Quote
          </button>
          <button 
            className="lg:hidden p-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        className="lg:hidden overflow-hidden bg-white border-b border-gray-100"
      >
        <div className="p-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-lg font-bold uppercase tracking-wider"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={onGetQuote}
            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest"
          >
            Get Quote
          </button>
        </div>
      </motion.div>
    </header>
  );
}
