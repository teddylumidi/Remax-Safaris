export interface UaeCityImage {
  id: string;
  city: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  highlights: string[];
}

export const UAE_CITIES_COLLECTION: UaeCityImage[] = [
  {
    id: 'dubai-burj-khalifa',
    city: 'Dubai',
    title: 'Downtown Dubai & Burj Khalifa',
    category: 'Modern Wonder & Skylines',
    image: '/images/uae_dubai_burj_khalifa.jpg',
    caption: 'The pinnacle of modern human engineering, soaring 828 meters into the Arabian sky with panoramic sky-deck views and choreographed fountain spectacles.',
    highlights: ['At The Top 148th Sky Lounge', 'Dubai Fountain Lake Rides', 'Dubai Mall Luxury Promenade', 'Atmosphere Fine Dining']
  },
  {
    id: 'abu-dhabi-grand-mosque',
    city: 'Abu Dhabi',
    title: 'Sheikh Zayed Grand Mosque',
    category: 'Architectural Heritage',
    image: '/images/uae_abu_dhabi_grand_mosque.jpg',
    caption: 'One of the world’s largest and most majestic mosques featuring 82 white Macedonian marble domes, 24-carat gold chandeliers, and hand-knotted Persian carpets.',
    highlights: ['Pure Macedonian White Marble', 'Reflective Water Courtyards', 'Hand-Knotted Artisan Carpets', 'Louvre Abu Dhabi Companion Tour']
  },
  {
    id: 'dubai-marina',
    city: 'Dubai',
    title: 'Dubai Marina & JBR Waterfront',
    category: 'Coastal Luxury & Yachting',
    image: '/images/uae_dubai_marina_night.jpg',
    caption: 'A spectacular illuminated canal city lined with superyachts, Michelin-starred waterfront dining, and lively evening boardwalks.',
    highlights: ['Private Sunset Yacht Charters', 'The Beach at JBR Promenade', 'Ain Dubai Observation Wheel', 'Skyline Rooftop Lounges']
  },
  {
    id: 'palm-jumeirah',
    city: 'Dubai',
    title: 'Palm Jumeirah & Atlantis Archipelagos',
    category: 'Island Living & Opulence',
    image: '/images/uae_palm_jumeirah.jpg',
    caption: 'The world-famous tree-shaped artificial archipelago hosting ultra-luxury private villas, Atlantis The Royal, and pristine turquoise Arabian Gulf beaches.',
    highlights: ['Atlantis The Palm & Aquaventure', 'The View at The Palm (52nd Floor)', 'Private Beach Club Cabanas', 'Helicopter Aerial Tours']
  },
  {
    id: 'dubai-skyline-downtown',
    city: 'Dubai',
    title: 'Dubai Financial Skyline & Sheikh Zayed Road',
    category: 'Cosmopolitan Capital',
    image: '/images/uae_dubai_skyline_downtown.jpg',
    caption: 'Gleaming futuristic towers along Sheikh Zayed Road forming one of the most iconic urban skylines in the global travel landscape.',
    highlights: ['Museum of the Future Access', 'DIFC Art Galleries & Dining', 'Dubai Frame Sunset Overlook', 'Bespoke Chauffeur Transfers']
  }
];
