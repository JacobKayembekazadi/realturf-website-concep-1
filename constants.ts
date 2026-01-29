
import { Product, RealTechFeature, Dealer, KnowledgeArticle } from './types';

export const landscapeProducts: Product[] = [
  { 
    name: 'Absolute', 
    category: 'Landscape', 
    description: 'Premium 2" pile turf for high-end commercial and residential projects.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/09/Absolute-artificial-turf-01-1.jpg', 
    pileHeight: '2"', 
    faceWeight: '107 oz/yd²', 
    fiber: 'C & Diamond', 
    apps: ['Commercial', 'Rooftop', 'Pool', 'Patio', 'Yard'], 
    features: ['Look & Feel', 'MaxDrain', 'LongLife', 'SoftMax', 'MaxRecover'],
    url: 'https://realturf.com/us/products/absolute/'
  },
  { 
    name: 'All Seasons', 
    category: 'Landscape', 
    description: 'A durable, eco-friendly option with a natural appearance.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/AllSeasons_Standard.jpg', 
    pileHeight: '1.56"', 
    faceWeight: '87 oz/yd²', 
    fiber: 'Wave + D + S', 
    apps: ['Commercial', 'Rooftop', 'Patio', 'Yard'], 
    features: ['LongLife', 'BodyShape', 'FiberFresh'],
    url: 'https://realturf.com/us/products/all-seasons/'
  },
  { 
    name: 'Altitude', 
    category: 'Landscape', 
    description: 'High-end residential turf with excellent recovery and softness.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Altitude-artificial-turf-01-1.jpg', 
    pileHeight: '1.75"', 
    faceWeight: '107 oz/yd²', 
    fiber: 'Wave + D + S', 
    apps: ['Commercial', 'Yard'], 
    features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'MaxRecover'],
    url: 'https://realturf.com/us/products/altitude/'
  },
  { 
    name: 'Comfort', 
    category: 'Landscape', 
    description: 'Exceptionally soft turf, perfect for areas with kids and pets.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/09/Comfort-artificial-turf-01.jpg', 
    pileHeight: '1.375"', 
    faceWeight: '117 oz/yd²', 
    fiber: 'Diamond', 
    apps: ['Commercial', 'Rooftop', 'Play', 'Pet', 'Pool', 'Yard'], 
    features: ['Look & Feel', 'LongLife', 'SoftMax'],
    url: 'https://realturf.com/us/products/comfort/'
  },
  { 
    name: 'Deluxe', 
    category: 'Landscape', 
    description: 'A mid-tier premium turf offering a great look and feel.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/09/Deluxe-artificial-turf-01.jpg', 
    pileHeight: '1.56"', 
    faceWeight: '97 oz/yd²', 
    fiber: 'Wave', 
    apps: ['Commercial', 'Rooftop', 'Play', 'Pet', 'Pool', 'Yard'], 
    features: ['Look & Feel', 'LongLife', 'BodyShape'],
    url: 'https://realturf.com/us/products/deluxe/'
  }
];

export const sportsProducts: Product[] = [
  { 
    name: 'Golf Putt', 
    category: 'Sports', 
    description: 'Professional-grade putting greens for a realistic ball roll.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Golf-Putt-Pro-Product-Photo.jpg', 
    features: ['LongLife', 'MaxRecover'], 
    apps: ['Putting Greens'],
    url: 'https://realturf.com/us/products/sports/golf-putt-artificial-turf/'
  },
  { 
    name: 'Golf Pro', 
    category: 'Sports', 
    description: 'Top-tier putting green surface for professional-level play.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Golf-Putt-Pro-Product-Photo.jpg', 
    features: ['LongLife', 'MaxRecover', 'SoftMax'], 
    apps: ['Professional Putting'],
    url: 'https://realturf.com/us/products/sports/golf-pro-artificial-turf/'
  },
  { 
    name: 'Soccer Turf', 
    category: 'Sports', 
    description: 'FIFA certified turf designed for the high demands of soccer.', 
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Soccer-Pro-Product-Photo.jpg', 
    features: ['LongLife', 'MaxRecover', 'SoftLand'], 
    apps: ['Soccer'],
    url: 'https://realturf.com/us/artificial-grass/sport/soccer/'
  }
];

export const allProducts: Product[] = [...landscapeProducts, ...sportsProducts];

export const realTechFeatures: RealTechFeature[] = [
  { name: 'MaxDrain', description: 'Superior drainage (up to 1200+ inches/hour).' },
  { name: 'PetFriendly', description: 'Antimicrobial protection and odor control for pet-friendly areas.' },
  { name: 'SoftMax', description: 'Enhanced comfort and safety underfoot.' },
  { name: 'LongLife', description: '15+ year durability for long-lasting beauty.' },
  { name: 'BodyShape', description: 'Natural grass appearance with varied fiber heights.' },
  { name: 'MaxRecover', description: 'Quick fiber bounce-back from foot traffic.' }
];

export const dealers: Dealer[] = [
  { name: 'Houston, TX (HQ)', type: 'Physical Center', address: '123 Main St, Houston, TX 77002' },
  { name: 'Dallas, TX', type: 'Physical Center', address: '456 Commerce St, Dallas, TX 75201' },
  { name: 'Las Vegas, NV', type: 'Physical Center', address: '789 Strip Blvd, Las Vegas, NV 89101' },
  { name: 'West Palm Beach, FL', type: 'Physical Center', address: '321 Ocean Ave, West Palm Beach, FL 33401' }
];

export const knowledgeBase: KnowledgeArticle[] = [
    {
        title: "Installation Guides",
        content: [
            "**Installing on Soil:** Remove 3-4\" vegetation, install compacted sub-base (crushed rock 90%+ compaction), geotextile fabric, lay turf, seam with adhesive tape.",
            "**Tools Required:** Power broom, seaming iron, turf cutter, 100lb roller, infill spreader."
        ]
    },
    {
        title: "Maintenance",
        content: [
            "**Weekly:** Remove debris, rinse with hose.",
            "**Monthly:** Power broom to lift fibers, redistribute infill."
        ]
    }
];

const knowledgeBaseText = `
LANDSCAPE PRODUCTS:
${landscapeProducts.map(p => `- ${p.name}: ${p.description} Used for: ${p.apps?.join(', ')}.`).join('\n')}

SPORTS PRODUCTS:
${sportsProducts.map(p => `- ${p.name}: ${p.description} Used for: ${p.apps?.join(', ')}.`).join('\n')}

REALTECH FEATURES:
${realTechFeatures.map(f => `- ${f.name}: ${f.description}`).join('\n')}

KNOWLEDGE BASE:
${knowledgeBase.map(a => `Topic: ${a.title}\n${a.content.join('\n')}`).join('\n')}
`;

export const KNOWLEDGE_BASE_CONTEXT = knowledgeBaseText;
