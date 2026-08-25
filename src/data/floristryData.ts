export const FALLBACK_FLORAL_IMAGE = 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80';

export interface Arrangement {
  id: string;
  name: string;
  subtitle: string;
  category: 'Sculptural' | 'Acid & Neon' | 'Monochrome Raw' | 'Ceiling Suspensions' | 'Wearables';
  price: number;
  image: string;
  hoverImage: string;
  tag?: string;
  badgeColor?: string;
  dimensions: string;
  stems: string[];
  vibeDescription: string;
  careGuide: string;
  inStock: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  level: string;
  price: number;
  seatsLeft: number;
  instructor: string;
  description: string;
  image: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
  quote: string;
}

export const CATALOG_ARRANGEMENTS: Arrangement[] = [
  {
    id: 'bloom-01',
    name: 'NEON HYDRA 01',
    subtitle: 'Asymmetric Electric Cobalt & Protea',
    category: 'Acid & Neon',
    price: 210,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80',
    tag: 'STUDIO FAVOURITE',
    badgeColor: '#ff2a5f',
    dimensions: '90cm H × 55cm W',
    stems: ['King Protea (South Africa)', 'Electric Cobalt Delphinium', 'Acid Dyed Anthurium', 'Monstera Skeleton'],
    vibeDescription: 'A high-friction composition pairing velvety crimson proteas with hyper-pigmented cobalt stems. Architectural, defiant, and designed to dominate a room.',
    careGuide: 'Recut stems at a 45° angle every 48 hours. Keep away from direct heat. Vase life: 10-14 days.',
    inStock: true
  },
  {
    id: 'bloom-02',
    name: 'OBSIDIAN MONOLITH',
    subtitle: 'Sculptural Calla Lily & Black Lotus',
    category: 'Monochrome Raw',
    price: 280,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=1000&q=80',
    tag: 'LIMITED RUN',
    badgeColor: '#ccff00',
    dimensions: '110cm H × 40cm W',
    stems: ['Midnight Black Calla Lily', 'Burnished Palm Fronds', 'Smoked Eucalyptus', 'Charcoal Anthurium'],
    vibeDescription: 'Monochromatic gothic elegance reimagined through brutalist floral lines. Zero filler foliage—just pure structural silhouette.',
    careGuide: 'Prefers cool distilled water. Spritz fronds lightly. Vase life: 12 days.',
    inStock: true
  },
  {
    id: 'bloom-03',
    name: 'VENUS VOLCANO',
    subtitle: 'Crimson Amaranthus & Bird of Paradise',
    category: 'Sculptural',
    price: 340,
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    tag: 'EXHIBITION PIECE',
    badgeColor: '#ff6b00',
    dimensions: '120cm H × 75cm W',
    stems: ['Trailing Red Amaranthus', 'Strelitzia Bird of Paradise', 'Coral Anthurium', 'Copper Fan Palm'],
    vibeDescription: 'Explosive verticality with cascading tendrils that reach for the floor. Inspired by lava flows and volcanic flora.',
    careGuide: 'Change water daily due to dense trailing stems. Trim bottom tips as needed.',
    inStock: true
  },
  {
    id: 'bloom-04',
    name: 'ACID CYCLONE',
    subtitle: 'Chartreuse Orchid & Bleached Monstera',
    category: 'Acid & Neon',
    price: 195,
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    tag: 'FRESH DROP',
    badgeColor: '#3b82f6',
    dimensions: '75cm H × 50cm W',
    stems: ['Vanda Cymbidium Orchids', 'Bleached Fan Palm', 'Chartreuse Dianthus', 'Hyper-Green Allium'],
    vibeDescription: 'Hyper-saturated chartreuse tones colliding with stark sun-bleached botanicals. Crisp, electric, and unapologetic.',
    careGuide: 'Thrives in indirect sunlight. Mist orchids twice weekly. Vase life: 14 days.',
    inStock: true
  },
  {
    id: 'bloom-05',
    name: 'HANGING CLOUD 07',
    subtitle: 'Ceiling Rigging & Floating Protea Cluster',
    category: 'Ceiling Suspensions',
    price: 520,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1000&q=80',
    tag: 'INSTALLATION ONLY',
    badgeColor: '#ff2a5f',
    dimensions: '150cm W × 90cm D',
    stems: ['King Protea', 'Silver Dollar Eucalyptus', 'Dyed Pampas Waves', 'Structural Wire Framework'],
    vibeDescription: 'A custom ceiling suspension designed to float suspended above dining tables or gallery spaces. Shipped with invisible suspension gear.',
    careGuide: 'Air-dries naturally into a permanent sculptural installation over 3 weeks.',
    inStock: true
  },
  {
    id: 'bloom-06',
    name: 'SOLAR FLARE WEARABLE',
    subtitle: 'Corsage & Shoulder Harness Floristry',
    category: 'Wearables',
    price: 165,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80',
    tag: 'RUNWAY READY',
    badgeColor: '#ccff00',
    dimensions: 'Custom Fit Collar',
    stems: ['Miniature Vanda Orchids', 'Flexible Copper Webbing', 'Waxed Anthurium Petals', 'Preserved Fern'],
    vibeDescription: 'Body-adornment floristry for galas, red carpets, or unapologetic night outings. Hand-crafted on custom lightweight wire frames.',
    careGuide: 'Keep refrigerated until 30 minutes before wearing. Spray lightly with water mist.',
    inStock: true
  },
  {
    id: 'bloom-07',
    name: 'RAW CONCRETE TOWER',
    subtitle: 'Monstera & Tangerine Strelitzia in Cast Pot',
    category: 'Monochrome Raw',
    price: 310,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=80',
    dimensions: '100cm H × 65cm W',
    stems: ['Wild Split Monstera', 'Tangerine Strelitzia', 'Brutalist Cast Concrete Pot', 'Smoked Birch'],
    vibeDescription: 'Heavy-set brutalist aesthetic. Comes pre-potted in handcrafted raw concrete vessel stamped with our Studio seal.',
    careGuide: 'Water every 3 days. Sealed interior concrete pot retains optimal stem moisture.',
    inStock: true
  },
  {
    id: 'bloom-08',
    name: 'ULTRA VIOLET CRATER',
    subtitle: 'Deep Purple Allium & Iridescent Anthurium',
    category: 'Sculptural',
    price: 260,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1000&q=80',
    dimensions: '80cm H × 50cm W',
    stems: ['Giant Purple Allium Spheres', 'Iridescent Dyed Anthurium', 'Dark Violet Iris', 'Coated Steel Rods'],
    vibeDescription: 'Geometric perfection featuring massive spherical alliums suspended alongside lacquered violet leaves.',
    careGuide: 'Recut 1cm every 3 days. Top up water line daily.',
    inStock: true
  }
];

export const WORKSHOPS_LIST: Workshop[] = [
  {
    id: 'ws-01',
    title: 'ASYMMETRICAL STEM ARCHITECTURE',
    date: 'SEP 14, 2026',
    time: '14:00 – 17:30',
    level: 'ALL LEVELS',
    price: 185,
    seatsLeft: 3,
    instructor: 'MAIA ROTH (HEAD FLORAL ARCHITECT)',
    description: 'Deconstruct traditional balance. Learn to build high-tension, asymmetrical focal points using heavy protea stems and flexible copper wire matrices.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ws-02',
    title: 'NEON BOTANICALS & CHROMATIC DYING',
    date: 'SEP 28, 2026',
    time: '18:00 – 21:00',
    level: 'INTERMEDIATE',
    price: 210,
    seatsLeft: 5,
    instructor: 'KAI VALENTINE (COLOR DESIGNER)',
    description: 'Master non-toxic pigment absorption, stem lacquering, and UV-reactive floral treatments for nightlife & editorial shoots.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ws-03',
    title: 'LARGE SCALE CEILING RIGGING',
    date: 'OCT 12, 2026',
    time: '11:00 – 16:00',
    level: 'ADVANCED / DESIGNERS',
    price: 340,
    seatsLeft: 2,
    instructor: 'STUDIO BLOOM TEAM',
    description: 'Hands-on construction of suspended 3-meter floral clouds, truss rigging, water tube concealment, and weight distribution safety.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
  }
];

export const LOOKBOOK_INSTALLATIONS: LookbookItem[] = [
  {
    id: 'lb-01',
    title: 'PARIS FASHION WEEK — HYPER-BLOOM RUNWAY',
    location: 'PALAIS DE TOKYO, PARIS',
    year: '2026',
    category: 'Runway Installation',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    quote: 'A 40-meter monolithic floral spine of electric cobalt and deep proteas that vibrated under runway spotlights.'
  },
  {
    id: 'lb-02',
    title: 'BOILER ROOM X BLOOM — INDUSTRIAL BOTANIKA',
    location: 'PRINTWORKS, LONDON',
    year: '2025',
    category: 'Nightlife & Event Rigging',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=80',
    quote: 'Suspended 8 meters above 4,000 ravers, incorporating neon light tubing directly inside live moisture-sealed moss beds.'
  },
  {
    id: 'lb-03',
    title: 'TATE MODERN ATRIUM — ORGANIC SPIKE',
    location: 'BANKWIDE, LONDON',
    year: '2025',
    category: 'Museum Exhibition',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80',
    quote: 'A brutalist confrontation between raw concrete columns and hyper-vibrant tropical flora.'
  }
];

export interface StemOption {
  id: string;
  name: string;
  colorHex: string;
  category: string;
  pricePerStem: number;
  image: string;
}

export const STEM_LIBRARY: StemOption[] = [
  { id: 'stem-1', name: 'King Protea (Electric Pink)', colorHex: '#ff2a5f', category: 'Focal', pricePerStem: 24, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=300&q=80' },
  { id: 'stem-2', name: 'Acid Anthurium (Chartreuse)', colorHex: '#ccff00', category: 'Sculptural Leaf', pricePerStem: 18, image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=300&q=80' },
  { id: 'stem-3', name: 'Cobalt Blue Delphinium', colorHex: '#3b82f6', category: 'Spike', pricePerStem: 14, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=300&q=80' },
  { id: 'stem-4', name: 'Trailing Crimson Amaranthus', colorHex: '#990026', category: 'Cascading', pricePerStem: 16, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=300&q=80' },
  { id: 'stem-5', name: 'Midnight Calla Lily', colorHex: '#1b1224', category: 'Sleek Line', pricePerStem: 19, image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=300&q=80' },
  { id: 'stem-6', name: 'Sunburst Strelitzia Palm', colorHex: '#ff6b00', category: 'Architectural Frond', pricePerStem: 22, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80' }
];

export const WRAPPING_OPTIONS = [
  { id: 'wrap-1', name: 'Raw Heavy Unbleached Linen', price: 15, texture: 'text-stone-300' },
  { id: 'wrap-2', name: 'Matte Obsidian Craft Paper', price: 12, texture: 'text-neutral-900' },
  { id: 'wrap-3', name: 'Crinkled Metallic Foil', price: 20, texture: 'text-amber-400' },
  { id: 'wrap-4', name: 'Industrial Raw Denim', price: 25, texture: 'text-indigo-900' }
];

