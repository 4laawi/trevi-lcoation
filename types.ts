export interface Car {
  id: string;
  make: string;
  model: string;
  type: string; // Acts as the category (Berline, SUV, etc.)
  transmission: 'Manuelle' | 'Automatique';
  fuel: 'Diesel' | 'Essence' | 'Hybride';
  pricePerDay: number; // in MAD
  features: string[];
  image: string;
  // New Design Props
  accentColor: string;
  rating: number;
  reviewCount: number;
  availableCount: number;
  badge?: string;
  badgeIcon?: string; // name of icon to resolve
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  language: 'en' | 'fr' | 'darija';
  date: string;
}

export interface BookingRequest {
  fullName: string;
  phone: string;
  carId: string;
  pickupDate: string;
  dropoffDate: string;
  city: string;
}