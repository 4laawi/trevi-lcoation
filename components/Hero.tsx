import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed navbar (approx 80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-80"
          // Add a background color while video loads
          style={{ backgroundColor: '#000000' }}
        >
            <source src="https://www.pexels.com/download/video/18984288/" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <h2 className="text-gold-400 font-medium tracking-[0.2em] text-sm md:text-base mb-4 uppercase animate-fade-in-up">
          Bienvenue chez Trevi Car Rental
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif font-bold mb-6 leading-tight drop-shadow-lg">
          Découvrez le Maroc <br />
          <span className="italic text-gold-500">Avec Confort et Confiance</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Flotte de véhicules neufs, tarifs transparents et service client disponible 24/7. 
          À Casablanca et ses environs, louez en toute sérénité.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href="#booking"
            onClick={(e) => scrollToSection(e, 'booking')}
            className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3.5 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-gold-500/30 min-w-[200px] cursor-pointer"
          >
            Réserver
          </a>
          <a 
            href="#fleet"
            onClick={(e) => scrollToSection(e, 'fleet')}
            className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3.5 rounded-full text-lg font-medium transition-all min-w-[200px] cursor-pointer"
          >
            Voir la Flotte
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a 
          href="#fleet" 
          onClick={(e) => scrollToSection(e, 'fleet')}
          className="text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;