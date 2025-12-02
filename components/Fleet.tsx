import React from 'react';
import { CARS } from '../constants';
import { 
  Fuel, 
  Settings, 
  Star, 
  ArrowRight, 
  Zap, 
  Crown, 
  Flame, 
  Sparkles,
  Check,
  CircleDot
} from 'lucide-react';

interface FleetProps {
  onSelectCar: (carId: string) => void;
}

const Fleet: React.FC<FleetProps> = ({ onSelectCar }) => {
  // Removed artificial loading state to ensure images load immediately
  
  // Helper to get the correct icon component
  const getBadgeIcon = (iconName?: string) => {
    switch(iconName) {
      case 'Fire': return <Flame size={14} className="fill-current" />;
      case 'Crown': return <Crown size={14} className="fill-current" />;
      case 'Zap': return <Zap size={14} className="fill-current" />;
      case 'Sparkles': return <Sparkles size={14} className="fill-current" />;
      default: return <Star size={14} className="fill-current" />;
    }
  };

  const buttonColor = '#2C7873'; // Warm Teal constant for all buttons

  return (
    <section id="fleet" className="py-24 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background Texture (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Notre Flotte</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Choisissez Votre <br/>Compagnon de Route
          </h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto font-light text-lg">
            Une sélection rigoureuse de véhicules récents, entretenus à la perfection pour votre confort et sécurité au Maroc.
          </p>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 animate-fade-in-up">
          {CARS.map((car, index) => (
            <div 
              key={car.id} 
              className={`group relative bg-white rounded-[24px] overflow-hidden transition-all duration-500 ease-out border border-black/5 ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
              style={{ 
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' 
              }}
            >
              {/* Hover Shadow Effect */}
              <div className="absolute inset-0 rounded-[24px] pointer-events-none transition-shadow duration-500 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"></div>

              {/* Top Accent Stripe */}
              <div 
                className="h-2 w-full" 
                style={{ backgroundColor: car.accentColor }}
              />

              {/* Image Section */}
              <div className="relative h-80 overflow-hidden bg-gray-100">
                <img 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`}
                  // Removed loading="lazy" to force eager loading
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                {/* Floating Badge */}
                {car.badge && (
                  <div 
                    className="absolute top-6 right-6 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wide flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ backgroundColor: `${car.accentColor}ee` }}
                  >
                    {getBadgeIcon(car.badgeIcon)}
                    {car.badge}
                  </div>
                )}

                {/* Rating Overlay */}
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-1.5 mb-1 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    <Star size={14} className="fill-gold-400 text-gold-400" />
                    <span className="font-bold text-base leading-none">{car.rating}</span>
                    <span className="text-gray-200 text-xs font-normal ml-1 border-l border-white/30 pl-2">{car.reviewCount} avis</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-9">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span 
                      className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-2 opacity-80"
                      style={{ color: car.accentColor }}
                    >
                      {car.type}
                    </span>
                    <h3 className="text-4xl font-serif text-gray-900 leading-none tracking-tight">
                      <span className="font-semibold text-gray-600 text-2xl block mb-1">{car.make}</span>
                      <span className="font-bold">{car.model}</span>
                    </h3>
                  </div>
                  
                  {/* Availability Pill */}
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                      <CircleDot size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                      {car.availableCount} dispo
                    </span>
                  </div>
                </div>

                {/* Features Grid - 2 Columns */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {/* Transmission */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                      <Settings size={16} className="text-gray-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{car.transmission}</span>
                  </div>
                  
                  {/* Fuel */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                      <Fuel size={16} className="text-gray-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{car.fuel}</span>
                  </div>

                  {/* Top 2 Custom Features */}
                  {car.features.slice(0, 2).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-opacity-10"
                        style={{ 
                          backgroundColor: `${car.accentColor}10`,
                          borderColor: car.accentColor 
                          }}
                      >
                        <Check size={16} style={{ color: car.accentColor }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <hr className="border-dashed border-gray-200 mb-8" />

                {/* Price & Action */}
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1 block">
                      À partir de
                    </span>
                    <div className="flex items-baseline gap-1.5" style={{ color: car.accentColor }}>
                      <span className="text-6xl font-black leading-none tracking-tighter shadow-gray-200 drop-shadow-sm">
                        {car.pricePerDay}
                      </span>
                      <span className="text-2xl font-bold opacity-80">MAD</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectCar(car.id)}
                    className="flex-grow max-w-[200px] h-[60px] rounded-xl text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group-hover:scale-[1.02]"
                    style={{ 
                      background: `linear-gradient(135deg, ${buttonColor}, #1f5f5b)`, // Consistent Warm Teal
                      boxShadow: `0 10px 25px -5px ${buttonColor}66`
                    }}
                  >
                    RÉSERVER
                    <ArrowRight size={20} className="opacity-80 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;