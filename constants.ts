import { Car, Review } from './types';

export const CARS: Car[] = [
  {
    id: 'dacia-logan',
    make: 'Dacia',
    model: 'Logan',
    type: 'Berline Éco',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    pricePerDay: 250,
    features: ['Climatisation', 'Bluetooth', 'Faible Conso', 'Coffre XXL'],
    image: 'https://picsum.photos/id/111/800/600',
    accentColor: '#2C7873', // Deep Teal
    rating: 4.8,
    reviewCount: 124,
    availableCount: 5,
    badge: 'Meilleur Prix',
    badgeIcon: 'Sparkles'
  },
  {
    id: 'dacia-duster',
    make: 'Dacia',
    model: 'Duster',
    type: 'SUV Aventure',
    transmission: 'Manuelle',
    fuel: 'Diesel',
    pricePerDay: 400,
    features: ['GPS Intégré', 'Haute Garde', 'Spacieux', 'Mode Éco'],
    image: 'https://picsum.photos/id/183/800/600',
    accentColor: '#E27D60', // Terracotta Orange
    rating: 4.9,
    reviewCount: 89,
    availableCount: 3,
    badge: 'Populaire',
    badgeIcon: 'Fire'
  },
  {
    id: 'renault-clio',
    make: 'Renault',
    model: 'Clio 5',
    type: 'Citadine',
    transmission: 'Automatique',
    fuel: 'Essence',
    pricePerDay: 350,
    features: ['Écran Tactile', 'CarPlay', 'Led Pure Vision', 'Mode Sport'],
    image: 'https://picsum.photos/id/133/800/600',
    accentColor: '#1A3C5A', // Navy Blue
    rating: 4.7,
    reviewCount: 215,
    availableCount: 7,
    badge: 'Nouveau',
    badgeIcon: 'Zap'
  },
  {
    id: 'hyundai-accent',
    make: 'Hyundai',
    model: 'Accent',
    type: 'Berline Confort',
    transmission: 'Automatique',
    fuel: 'Diesel',
    pricePerDay: 450,
    features: ['Toit Ouvrant', 'Caméra Recul', 'Sièges Cuir', 'Smart Key'],
    image: 'https://picsum.photos/id/85/800/600',
    accentColor: '#E8B44A', // Warm Gold
    rating: 5.0,
    reviewCount: 64,
    availableCount: 2,
    badge: 'Luxe',
    badgeIcon: 'Crown'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Youssef El Amrani',
    rating: 5,
    text: 'Khdemt m3ahom chhar li fat, service nqi w tomobil jdida. Lah y3tikom saha.',
    language: 'darija',
    date: '2023-10-15'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    rating: 5,
    text: 'Service fantastique. La voiture a été livrée à mon hôtel à l\'heure et était impeccable. Simple et efficace.',
    language: 'fr',
    date: '2023-11-02'
  },
  {
    id: '3',
    name: 'Mehdi Benkirane',
    rating: 4,
    text: 'Prix raisonnable et personnel très professionnel. Je recommande vivement pour vos voyages au Maroc.',
    language: 'fr',
    date: '2023-12-10'
  },
  {
    id: '4',
    name: 'James Wilson',
    rating: 5,
    text: 'Finally a rental agency where "new car" actually means new. The Duster ran perfectly and the AC was a lifesaver. Quick drop-off at the airport!',
    language: 'en',
    date: '2024-01-15'
  },
  {
    id: '5',
    name: 'Amine Kabbaj',
    rating: 5,
    text: 'Client fidèle depuis 6 mois. C\'est rare de trouver ce sérieux à Casa. Voitures nickels et prix fixes, même en haute saison. Bravo !',
    language: 'fr',
    date: '2024-02-20'
  },
  {
    id: '6',
    name: 'Sophie Dubois',
    rating: 4,
    text: 'Très bon rapport qualité-prix. J\'avais un peu peur au début mais la caution a été rendue immédiatement après le retour. Sérieux.',
    language: 'fr',
    date: '2024-03-05'
  }
];

export const CITIES = [
  'Casablanca',
  'Marrakech',
  'Rabat',
  'Tanger',
  'Agadir',
  'Fès'
];