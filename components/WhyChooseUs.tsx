import React from 'react';
import { Wallet, Car, Headphones, Plane, ShieldCheck, Eye } from 'lucide-react';

const features = [
  {
    icon: <Wallet size={28} />,
    title: "Prix Compétitifs",
    description: "Le confort accessible. Nous garantissons les meilleurs tarifs du marché pour cette gamme de véhicules."
  },
  {
    icon: <Car size={28} />,
    title: "Véhicules Récents",
    description: "Une flotte de moins de 12 mois, rigoureusement entretenue pour une fiabilité absolue."
  },
  {
    icon: <Headphones size={28} />,
    title: "Service Client 24/7",
    description: "Une assistance dévouée jour et nuit. En cas de besoin, nous sommes juste au bout du fil."
  },
  {
    icon: <Plane size={28} />,
    title: "Livraison Aéroport",
    description: "Votre voiture vous attend dès l'atterrissage. Livraison gratuite à l'aéroport de Casablanca."
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Assurance Complète",
    description: "Roulez l'esprit tranquille. Notre couverture tous risques est incluse pour votre sérénité."
  },
  {
    icon: <Eye size={28} />,
    title: "Transparence Totale",
    description: "Pas de frais cachés, pas de surprises. Le prix affiché est le prix exact que vous payez."
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block animate-fade-in">Pourquoi Nous Choisir ?</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            L'Excellence <span className="text-gold-500">Trevi</span> Rental
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-[2rem] bg-gray-50 border border-transparent hover:border-gold-100 hover:bg-white transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.15)] relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 transition-all duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-gold-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;