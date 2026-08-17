export type DestinationCategory = 'kenya' | 'international';
export type ExperienceType = 'Safari' | 'Beach' | 'Cultural' | 'City' | 'Nature';

export interface Destination {
  id: string;
  name: string;
  category: DestinationCategory;
  experienceType?: ExperienceType;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
  popularActivities: string[];
  startingPriceKES?: number;
  startingPriceUSD?: number;
  featured?: boolean;
  galleryImages?: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  category: DestinationCategory;
  duration: string; // e.g. "3 Days / 2 Nights"
  priceKES: number;
  priceUSD: number;
  image: string;
  badge?: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  featured?: boolean;
  galleryImages?: string[];
}

export interface TravelService {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  whatsappMessage: string;
}

export interface CustomQuoteRequest {
  destinationType: 'kenya' | 'international' | 'custom';
  selectedDestination: string;
  serviceType: string;
  travelersCount: number;
  travelDate: string;
  durationDays: number;
  budgetPreference: 'Economy' | 'Mid-Range' | 'Luxury' | 'Ultra-Luxury';
  customerName: string;
  customerPhone: string;
  specialRequests: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  userEmail?: string;
  rating: number;
  title: string;
  comment: string;
  packageName?: string;
  createdAt: string;
  helpfulCount: number;
  verifiedGoogle?: boolean;
}

