import { TourPackage } from '../types';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'mara-3days-safari',
    title: '3 Days / 2 Nights Maasai Mara Big Five Binocular Safari',
    destinationId: 'maasai-mara',
    destinationName: 'Maasai Mara',
    category: 'kenya',
    duration: '3 Days / 2 Nights',
    priceKES: 48000,
    priceUSD: 370,
    badge: 'Bestseller Safari',
    image: '/images/park_game_drive_binoculars.jpg',
    galleryImages: [
      '/images/park_game_drive_binoculars.jpg',
      '/images/park_safari_cruiser_wildlife.jpg'
    ],
    inclusions: [
      'Transport in 4x4 Safari Land Cruiser with pop-up roof',
      'High-powered binoculars provided for game viewing',
      '2 Nights accommodation in luxury tented safari camp',
      'Full board meals (Breakfast, Lunch, Dinner)',
      'Comprehensive game drives with professional driver guide',
      'Park entry fees for Maasai Mara',
      'Bottled drinking water in safari vehicle'
    ],
    exclusions: [
      'Hot air balloon ride (Optional - USD 450)',
      'Maasai Village cultural visit fee (KES 1,500 / USD 20)',
      'Personal expenses, tips and alcoholic drinks'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara & Afternoon Game Drive',
        description: 'Depart Nairobi early morning through the Great Rift Valley viewpoint. Arrive at Maasai Mara in time for lunch and check-in. Afternoon game drive in search of lions, elephants, and leopards until sunset.'
      },
      {
        day: 2,
        title: 'Full Day Maasai Mara Safari Adventure & Mara River',
        description: 'Full day exploring the vast reserve with packed picnic lunch. Visit Mara River to view hippos and crocodiles. Optional hot air balloon safari at dawn or Maasai village visit in the evening.'
      },
      {
        day: 3,
        title: 'Morning Game Drive & Return to Nairobi',
        description: 'Early morning game drive to catch predators on the hunt. Breakfast at camp, check out and drive back to Nairobi with drop-off at your hotel or airport.'
      }
    ],
    featured: true
  },
  {
    id: 'diani-5days-beach',
    title: '5 Days / 4 Nights Diani Beach Luxury Ocean Escape',
    destinationId: 'diani',
    destinationName: 'Diani Beach',
    category: 'kenya',
    duration: '5 Days / 4 Nights',
    priceKES: 55000,
    priceUSD: 420,
    badge: 'Beach Special',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70&auto=format',
    inclusions: [
      '4 Nights stay in beachfront 4-star resort',
      'Half board meal plan (Breakfast & Dinner)',
      'SGR Train / Flight airport transfers in Diani / Ukunda',
      'Dolphin spotting & Wasini Island glass bottom boat excursion',
      'Resort amenities & swimming pool access'
    ],
    exclusions: [
      'SGR / Air tickets (Can be booked upon request)',
      'Lunches, personal watersports and drinks'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Diani Beach & Check-in',
        description: 'Arrive via Ukunda Airstrip or SGR train at Miritini (transfer provided). Check into your beach resort, enjoy welcome cocktail and relax by the ocean.'
      },
      {
        day: 2,
        title: 'Kisite Mpunguti Marine Park & Dolphin Safari',
        description: 'Full day excursion to Shimoni and Kisite Marine Park. Ride a dhow, spot dolphins, snorkel coral reefs, and savor a seafood lunch on Wasini Island.'
      },
      {
        day: 3,
        title: 'Leisure & Water Sports at Diani Beach',
        description: 'Day at leisure to swim, enjoy kitesurfing, camel rides along the white sands, or indulge in a seaside spa treatment.'
      },
      {
        day: 4,
        title: 'Shimba Hills Reserve Day Trip (Optional)',
        description: 'Morning walk along the beach. Optional afternoon tour to Shimba Hills National Reserve to see sable antelopes and Sheldrick Falls.'
      },
      {
        day: 5,
        title: 'Breakfast & Departure Transfer',
        description: 'Relaxing morning breakfast overlooking the ocean. Transfer to Ukunda Airstrip or Miritini SGR station for your journey home.'
      }
    ],
    featured: true
  },
  {
    id: 'dubai-5days-luxury',
    title: '5 Days / 4 Nights Dubai Desert & Futuristic Marvels',
    destinationId: 'dubai',
    destinationName: 'Dubai',
    category: 'international',
    duration: '5 Days / 4 Nights',
    priceKES: 135000,
    priceUSD: 1040,
    badge: 'Top International',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=70&auto=format',
    inclusions: [
      '4 Nights in 4-star hotel in Dubai City Centre',
      'Daily breakfast buffet',
      'Dubai Tourist Visa processing',
      'Return Dubai Airport transfers',
      'Burj Khalifa At The Top entry ticket (124th floor)',
      'Desert Safari with 4x4 Dune Bashing, Camel Ride & BBQ Dinner',
      'Dubai Marina Dhow Dinner Cruise'
    ],
    exclusions: [
      'International flights (Ticketing available upon request)',
      'Tourism Dirham Tax payable directly at hotel (~USD 4/night)',
      'Personal shopping and meals not mentioned'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Dhow Cruise Dinner',
        description: 'Welcome to Dubai! Private airport transfer to hotel. In the evening, enjoy a romantic 2-hour Dhow Cruise along Dubai Marina with buffet dinner.'
      },
      {
        day: 2,
        title: 'Half Day Dubai City Tour & Burj Khalifa',
        description: 'Tour Dubai Gold Souk, Spice Souk, Jumeirah Mosque, and Atlantis The Palm. Afternoon visit to Dubai Mall and ascent to 124th Floor of Burj Khalifa.'
      },
      {
        day: 3,
        title: 'Desert Safari with Dune Bashing & BBQ',
        description: 'Morning free for shopping at Mall of the Emirates. 3:00 PM pick up for thrilling 4x4 desert dune bashing, camel riding, belly dance show, and BBQ dinner under the stars.'
      },
      {
        day: 4,
        title: 'Museum of the Future & Miracle Garden',
        description: 'Visit the architectural marvel Museum of the Future and Dubai Miracle Garden. Free evening to explore Global Village.'
      },
      {
        day: 5,
        title: 'Hotel Check-out & Return Airport Transfer',
        description: 'Buffet breakfast, last-minute souvenir shopping, hotel check-out and private transfer to Dubai International Airport.'
      }
    ],
    featured: true
  },
  {
    id: 'amboseli-naivasha-4days',
    title: '4 Days / 3 Nights Amboseli Elephants & Kibo Safari Lodge Combo',
    destinationId: 'amboseli',
    destinationName: 'Amboseli',
    category: 'kenya',
    duration: '4 Days / 3 Nights',
    priceKES: 52000,
    priceUSD: 400,
    badge: 'Popular Combo',
    image: '/images/amboseli_kibo_entrance.jpg',
    galleryImages: [
      '/images/amboseli_kibo_entrance.jpg',
      '/images/amboseli_kibo_lounge.jpg'
    ],
    inclusions: [
      '2 Nights at Kibo Safari Camp Amboseli + 1 Night in Lake Naivasha',
      'Transport in safari Land Cruiser with pop-up roof',
      'Welcome drinks and lounge relaxation at Karibu Bar',
      'Hell’s Gate National Park bicycle rental & gorge walk',
      'Lake Naivasha boat safari & hippo watching',
      'All meals on full board basis',
      'Park entrance fees'
    ],
    exclusions: [
      'Crescent Island walking safari entry fee',
      'Personal expenses & tipping'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli & Kibo Safari Camp Welcome',
        description: 'Drive south to Amboseli with Mount Kilimanjaro backdrop. Warm welcome at Kibo Safari Camp entrance with fresh juices. Afternoon game drive among elephant herds.'
      },
      {
        day: 2,
        title: 'Full Day Amboseli Safari & Karibu Bar Evening',
        description: 'Full day game drive with picnic lunch looking over Kilimanjaro peaks. Evening relaxation in the rustic Karibu Bar lounge.'
      },
      {
        day: 3,
        title: 'Amboseli to Lake Naivasha & Boat Safari',
        description: 'Morning game drive, then depart to Lake Naivasha. Afternoon boat ride among hippos and fish eagles.'
      },
      {
        day: 4,
        title: 'Hell’s Gate Biking & Return to Nairobi',
        description: 'Bicycle ride through Hell’s Gate gorge before returning to Nairobi in the late afternoon.'
      }
    ],
    featured: true
  },
  {
    id: 'amboseli-kibo-3days',
    title: '3 Days / 2 Nights Kibo Safari Camp Amboseli Luxury Retreat',
    destinationId: 'amboseli',
    destinationName: 'Amboseli',
    category: 'kenya',
    duration: '3 Days / 2 Nights',
    priceKES: 42000,
    priceUSD: 320,
    badge: 'Kibo Lodge Special',
    image: '/images/amboseli_kibo_lounge.jpg',
    galleryImages: [
      '/images/amboseli_kibo_entrance.jpg',
      '/images/amboseli_kibo_lounge.jpg'
    ],
    inclusions: [
      '2 Nights luxury tented stay at Kibo Safari Camp Amboseli',
      'Warm welcome hospitality with fresh juice on arrival',
      'Full board meals & Karibu Bar lounge access',
      'Unlimited game drives in 4x4 Land Cruiser with expert driver guide',
      'Observation Hill summit excursion & elephant swamp viewing',
      'Amboseli National Park entry fees'
    ],
    exclusions: [
      'Maasai Village cultural visit fee',
      'Personal bar bill, laundry & driver gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli & Kibo Camp Welcome',
        description: 'Morning drive across the Kapiti plains to Amboseli National Park. Warm welcome by staff at Kibo Safari Camp with fresh tropical fruit juices. Check into luxury tented suite and enjoy afternoon game drive watching elephants under Mt. Kilimanjaro.'
      },
      {
        day: 2,
        title: 'Observation Hill & Karibu Lounge Evening',
        description: 'Dawn game drive to spot Kilimanjaro peaks before clouds cover the snowcap. Visit Observation Hill for 360° swamp panorama. Afternoon swim and sunset drinks in the Karibu Bar lounge.'
      },
      {
        day: 3,
        title: 'Final Morning Game Drive & Nairobi Return',
        description: 'Early morning safari search for big cats and big tusked elephants. Hearty breakfast at Kibo Camp dining hall, check out and drive back to Nairobi.'
      }
    ],
    featured: true
  },
  {
    id: 'bali-6days-paradise',
    title: '6 Days / 5 Nights Bali Tropical Island & Ubud Swings',
    destinationId: 'bali',
    destinationName: 'Bali',
    category: 'international',
    duration: '6 Days / 5 Nights',
    priceKES: 165000,
    priceUSD: 1270,
    badge: 'Honeymoon Choice',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=70&auto=format',
    inclusions: [
      '3 Nights stay in Ubud Jungle Resort + 2 Nights in Seminyak Beach Resort',
      'Daily breakfast & 2 local lunch experiences',
      'Private air-conditioned airport and tour transfers',
      'Ubud Monkey Forest & Tegallalang Rice Terrace tour',
      'Famous Bali Swing & Alas Harum photography pass',
      'Kintamani Mount Batur volcano view tour',
      'Tanah Lot Temple sunset tour'
    ],
    exclusions: [
      'International flight tickets',
      'Indonesia Visa on Arrival (~USD 35 at airport)',
      'Personal spa treatments and dinners'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali & Ubud Check-In',
        description: 'Arrive at Ngurah Rai International Airport in Denpasar. Warm flower garland greeting, private transfer to Ubud jungle resort.'
      },
      {
        day: 2,
        title: 'Ubud Cultural Heart, Rice Terraces & Jungle Swing',
        description: 'Explore Sacred Monkey Forest, Tegallalang Rice Terraces, and take iconic photos on the famous Bali Jungle Swing.'
      },
      {
        day: 3,
        title: 'Kintamani Volcano & Coffee Plantation',
        description: 'Panoramas of Mount Batur active volcano, Lake Batur, and Luwak coffee tasting at a traditional coffee plantation.'
      },
      {
        day: 4,
        title: 'Transfer to Seminyak & Tanah Lot Sunset',
        description: 'Transfer to beach town Seminyak. Afternoon visit to Tanah Lot Sea Temple to witness magical ocean sunsets.'
      },
      {
        day: 5,
        title: 'Nusa Penida Island Day Tour (Optional)',
        description: 'Free day at Seminyak beach or optional speedboat trip to Nusa Penida to visit Kelingking T-Rex Beach & Broken Beach.'
      },
      {
        day: 6,
        title: 'Departure from Bali',
        description: 'Leisurely breakfast, souvenir shopping at Seminyak Market, and private transfer to airport for departure.'
      }
    ],
    featured: true
  },
  {
    id: 'zanzibar-4days-beach',
    title: '4 Days / 3 Nights Zanzibar Sea Turtle Sanctuary & Beach Paradise',
    destinationId: 'zanzibar',
    destinationName: 'Zanzibar',
    category: 'international',
    duration: '4 Days / 3 Nights',
    priceKES: 68000,
    priceUSD: 520,
    badge: 'Island & Turtle Sanctuary',
    image: '/images/zanzibar_turtle_sanctuary.jpg',
    galleryImages: [
      '/images/zanzibar_turtle_sanctuary.jpg',
      'https://images.unsplash.com/photo-1595872089523-69b6a9082a9e?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=70'
    ],
    inclusions: [
      '3 Nights in Kendwa beachfront resort',
      'Nungwi Baraka Natural Aquarium Sea Turtle swimming entry',
      'Daily breakfast & dinner (Half Board)',
      'Return Zanzibar Airport / Ferry transfers',
      'Stone Town UNESCO guided walking tour',
      'Tropical Spice Farm tour with fruit tasting'
    ],
    exclusions: [
      'Flight or Ferry tickets to Zanzibar',
      'Infrastructure Tax ($1-$5 per person/night at hotel)',
      'Safari Blue dhow excursion (Optional $50)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zanzibar & Beach Resort Check-in',
        description: 'Arrive at Abeid Amani Karume Airport or Stone Town Ferry Port. Transfer to Kendwa beach resort, enjoy white sands and sunset.'
      },
      {
        day: 2,
        title: 'Stone Town Cultural Tour & Spice Farm',
        description: 'Guided walk through Stone Town alleys, House of Wonders, Freddie Mercury house, followed by interactive spice plantation tour.'
      },
      {
        day: 3,
        title: 'Nungwi Sea Turtle Sanctuary Swimming & Dhow Sunset',
        description: 'Morning visit to Nungwi Baraka Natural Aquarium to swim alongside rescued sea turtles in clear lagoon waters. Afternoon dhow sailing cruise and ocean sunset.'
      },
      {
        day: 4,
        title: 'Beach Relaxation & Airport Transfer',
        description: 'Morning beach dip, check-out, and return transfer to airport for flight home.'
      }
    ],
    featured: true
  },
  {
    id: 'cape-town-5days-wonders',
    title: '5 Days / 4 Nights Cape Town Table Mountain & Coastal Wonders',
    destinationId: 'cape-town',
    destinationName: 'Cape Town',
    category: 'international',
    duration: '5 Days / 4 Nights',
    priceKES: 145000,
    priceUSD: 1100,
    badge: 'African Jewel',
    image: '/images/capetown_table_mountain.jpg',
    galleryImages: [
      '/images/capetown_table_mountain.jpg',
      '/images/capetown_table_mountain_summit.jpg'
    ],
    inclusions: [
      '4 Nights accommodation in 4-star Cape Town seafront hotel',
      'Daily buffet breakfast & Cape Winelands gourmet lunch',
      'Table Mountain Aerial Cableway ticket',
      'Full day Cape Peninsula tour (Cape Point, Boulders Beach Penguins & Camps Bay)',
      'Stellenbosch Wine Tasting & Cellar Tour',
      'Private airport transfers and guided sightseeing'
    ],
    exclusions: [
      'International flight tickets to Cape Town',
      'South Africa Tourist Visa fees (if applicable)',
      'Personal shopping, drinks & optional Robben Island tour'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & V&A Waterfront',
        description: 'Warm welcome at Cape Town International Airport. Private transfer to your seafront hotel. Afternoon at leisure exploring V&A Waterfront.'
      },
      {
        day: 2,
        title: 'Table Mountain Summit & City Panorama',
        description: 'Ascend Table Mountain via the rotating Cableway for spectacular 360° views over the Atlantic Ocean and city. Visit Bo-Kaap colorful neighborhood and Signal Hill.'
      },
      {
        day: 3,
        title: 'Cape Peninsula, Camps Bay & Boulders Beach Penguins',
        description: 'Coastal drive along Chapman’s Peak to Cape Point and the Cape of Good Hope. Meet African penguins at Boulders Beach and enjoy sunset views over Camps Bay.'
      },
      {
        day: 4,
        title: 'Stellenbosch & Franschhoek Winelands Tour',
        description: 'Explore South Africa’s world-famous wine region. Enjoy wine tasting, vineyard tours, and farm-to-table dining amidst picturesque mountain valleys.'
      },
      {
        day: 5,
        title: 'Check-out & Airport Transfer',
        description: 'Leisurely breakfast overlooking Table Bay. Souvenir shopping at Greenmarket Square before private transfer to airport.'
      }
    ],
    featured: true
  },
  {
    id: 'naivasha-2days-hippo-getaway',
    title: '2 Days / 1 Night Lake Naivasha Hippo Safari & Hell’s Gate Cycling',
    destinationId: 'naivasha',
    destinationName: 'Lake Naivasha',
    category: 'kenya',
    duration: '2 Days / 1 Night',
    priceKES: 24000,
    priceUSD: 180,
    badge: 'Weekend Special',
    image: '/images/naivasha_hippos_shore.jpg',
    galleryImages: [
      '/images/naivasha_hippos_shore.jpg',
      '/images/naivasha_boat_safari.jpg'
    ],
    inclusions: [
      '1 Night lakefront lodge stay at Lake Naivasha',
      'Motorboat Lake Naivasha safari & hippo shore watching',
      'Bicycle rental for Hell’s Gate National Park gorge walk',
      'Guided Crescent Island walking safari amongst zebras & giraffes',
      'Transport in 4x4 Safari vehicle from Nairobi and return',
      'Full board meals & park entry fees'
    ],
    exclusions: [
      'Personal bar drinks & laundry',
      'Driver guide tips & gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Lake Naivasha, Boat Cruise & Hippo Shore Visit',
        description: 'Scenic morning drive down the Great Rift Valley escarpment to Lake Naivasha. Check in at lakefront resort. Afternoon motorboat safari past hippo pods and watching grazing hippos along the shoreline.'
      },
      {
        day: 2,
        title: 'Hell’s Gate Cycling, Crescent Island & Nairobi Return',
        description: 'Morning cycling safari through Hell’s Gate National Park gorge among zebras and warthogs. Visit Crescent Island for a walking safari, lunch, and late afternoon drive back to Nairobi.'
      }
    ],
    featured: true
  },
  {
    id: 'nakuru-flamingos-2days-safari',
    title: '2 Days / 1 Night Lake Nakuru Flamingos & Rhino Sanctuary Safari',
    destinationId: 'nakuru',
    destinationName: 'Lake Nakuru',
    category: 'kenya',
    duration: '2 Days / 1 Night',
    priceKES: 26000,
    priceUSD: 195,
    badge: 'Flamingo Special',
    image: '/images/nakuru_flamingos_shore.jpg',
    galleryImages: [
      '/images/nakuru_flamingos_shore.jpg',
      '/images/nakuru_flamingos_lake.jpg',
      '/images/nakuru_flamingos_flock.jpg',
      '/images/nakuru_lesser_flamingo.jpg'
    ],
    inclusions: [
      '1 Night safari lodge / luxury tented stay at Lake Nakuru National Park',
      'Transport in 4x4 pop-up roof Safari Land Cruiser',
      'High-powered binoculars for flamingo & wildlife viewing',
      'Comprehensive morning & afternoon game drives in search of flamingos & rhinos',
      'Baboon Cliff & Makalia Falls scenic excursions',
      'Full board meals (Breakfast, Lunch & Dinner)',
      'Lake Nakuru National Park conservation entry fees'
    ],
    exclusions: [
      'Personal bar expenses & alcoholic drinks',
      'Driver guide tips and gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Lake Nakuru & Afternoon Flamingo Game Drive',
        description: 'Depart Nairobi early morning, stopping at Great Rift Valley viewpoint for photography. Arrive at Lake Nakuru in time for lunch and check-in. Afternoon game drive along the lake shores to witness thousands of pink flamingos and search for endangered white and black rhinos.'
      },
      {
        day: 2,
        title: 'Dawn Flamingo Photography, Baboon Cliff & Nairobi Return',
        description: 'Early morning game drive to catch flamingos feeding in early morning light and spot leopards lounging in acacia trees. Visit Baboon Cliff for panoramic aerial views of the entire lake. Breakfast at the lodge and scenic drive back to Nairobi.'
      }
    ],
    featured: true
  },
  {
    id: 'kisumu-lake-victoria-2days',
    title: '2 Days / 1 Night Kisumu Lake Victoria Sunset & Tilapia Cultural Getaway',
    destinationId: 'kisumu',
    destinationName: 'Kisumu',
    category: 'kenya',
    duration: '2 Days / 1 Night',
    priceKES: 22000,
    priceUSD: 170,
    badge: 'Lakeside Special',
    image: '/images/kisumu_lake_victoria_sunset.jpg',
    galleryImages: [
      '/images/kisumu_lake_victoria_sunset.jpg',
      '/images/kisumu_dunga_lake_view.jpg'
    ],
    inclusions: [
      '1 Night accommodation in lakeside resort in Kisumu',
      'Scenic sunset boat cruise on Lake Victoria',
      'Dunga Hill Camp boardwalk & bird watching experience',
      'Fresh Lake Victoria Tilapia culinary dinner experience',
      'Visit to Kisumu Impala Sanctuary & Kit Mikayi rock art site',
      'Return airport / SGR transfers in Kisumu'
    ],
    exclusions: [
      'Flight / SGR tickets to Kisumu',
      'Personal beverages and gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kisumu, Dunga Beach & Sunset Boat Cruise',
        description: 'Arrive at Kisumu International Airport or train station. Check in to your lakeside resort. Afternoon visit to Dunga Boardwalk followed by an unforgettable sunset boat cruise across Lake Victoria and fresh tilapia dinner.'
      },
      {
        day: 2,
        title: 'Impala Sanctuary, Kit Mikayi & Departure',
        description: 'Morning walking tour through Kisumu Impala Sanctuary observing impalas, zebras, and rare sitatunga antelopes on the lakeshore. Visit Kit Mikayi legendary rock formations before departure.'
      }
    ],
    featured: true
  }
];
