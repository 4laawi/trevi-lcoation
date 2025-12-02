import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Fleet from './components/Fleet';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Phone } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const handleCarSelection = (carId: string) => {
    setSelectedCarId(carId);
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Fleet onSelectCar={handleCarSelection} />
      <BookingForm selectedCarId={selectedCarId} />
      <Testimonials />
      <Footer />

      {/* Floating WhatsApp Action Button (Mobile/Desktop) */}
      <a 
        href="https://wa.me/212616925572"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 animate-bounce-slow"
        aria-label="Contacter sur WhatsApp"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};

export default App;