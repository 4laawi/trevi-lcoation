import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
  }`;

  const textClass = isScrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white';

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <a href="#home" className="block">
                <img 
                    src="https://kawyqqnvckjfdchlteue.supabase.co/storage/v1/object/sign/resumes/Untitled%20(500%20x%20200%20px)%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZWMwZGE5Ni1hYTZhLTQwZWMtYjgwNC05MjJmM2MzODJkZWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWVzL1VudGl0bGVkICg1MDAgeCAyMDAgcHgpICgyKS5wbmciLCJpYXQiOjE3NjQ2ODE2NDcsImV4cCI6MTc5NjIxNzY0N30.tiXTyfVD9NOYXcFh7T4XT1vbHlyJsA8djCTU9_sD1UQ" 
                    alt="Trevi Rental Logo" 
                    className="h-14 w-auto object-contain"
                    // @ts-ignore - Fetch priority is a valid standard attribute but React types might lag
                    fetchPriority="high"
                    loading="eager"
                    width="140"
                    height="56"
                />
            </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>Accueil</a>
          <a href="#fleet" className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>Flotte</a>
          <a href="#reviews" className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>Avis</a>
          <a href="#contact" className={`${textClass} hover:text-gold-500 font-medium transition-colors`}>Contact</a>
          <a 
            href="https://wa.me/212616925572" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold-600 text-white px-5 py-2 rounded-full hover:bg-gold-700 transition-transform transform hover:scale-105"
          >
            <Phone size={18} />
            <span>Réserver via WhatsApp</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold-600">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-4 border-t border-gray-100">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-gold-600 text-lg font-medium">Accueil</a>
          <a href="#fleet" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-gold-600 text-lg font-medium">Flotte</a>
          <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-gold-600 text-lg font-medium">Avis</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:text-gold-600 text-lg font-medium">Contact</a>
          <a 
            href="https://wa.me/212616925572"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gold-600 text-white px-5 py-3 rounded-lg mt-2"
          >
            <Phone size={18} />
            <span>Contactez-nous</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;