import { Suite } from './types';

export const SUITES: Suite[] = [
  {
    id: 'lumiere',
    menuLabel: 'LUMIÈRE DUPLEX',
    heroImage: '/assets/images/elyse_house_hero_1779429540872.png',
    title1: 'HOLISTIC LUXURY',
    title2: 'IN PERFECT HARMONY',
    description: 'Welcome to Elyse Residence, where timeless design, wellness-focused living and cultural enrichment converge in order to create an unparalleled sanctuary of elegance and serenity.',
    location: 'LEVELS 04 – 05',
    orientation: 'NORTH-EAST SKYLINE',
    ceilingHeight: '6.4 METERS (DOUBLE HIGH)',
    specifications: [
      { label: 'RESIDENCE AREA', value: '7,450 SQ FT' },
      { label: 'BEDROOM SUITES', value: '4 CHAMBERS' },
      { label: 'OUTDOOR SPACE', value: 'PRIVATE COURTYARD' },
      { label: 'EXCLUSIVE ACCESS', value: 'WELLNESS CONCIERGE' },
    ],
    materials: [
      {
        name: 'French Oiled Oak',
        category: 'Flooring',
        description: 'Planked floorboards treated with bio-active oils for a highly tactile, raw velvet sensation underfoot.',
        colorHex: '#C5A880'
      },
      {
        name: 'Honed Crema Marfil',
        category: 'Bathrooms & Walls',
        description: 'Rare Spanish limestone chosen for its warm, eggshell reflection and subtle creamy golden veins.',
        colorHex: '#EDE5D9'
      },
      {
        name: 'Textured Bouclé Wool',
        category: 'Wall Furnishings',
        description: 'Acoustic wall linings hand-loomed from pure sheep wool to create an insulated, highly comforting interior shell.',
        colorHex: '#F0EFEB'
      },
      {
        name: 'Brushed Champagne Gold',
        category: 'Accents & Trim',
        description: 'Muted metal fixtures treated with fine micro-abrasive lines to disperse direct light reflections gently.',
        colorHex: '#D1C2A5'
      }
    ],
    amenities: [
      { name: 'Wellness Concierge', desc: 'On-demand wellness diagnostic advisors, massage therapists, and private health chefs.', iconName: 'Compass' },
      { name: 'Atrium Courtyard', desc: 'A double-story oxygen-rich internal botanical garden with visual water fountains.', iconName: 'Home' },
      { name: 'Filtered Oxygen Flow', desc: 'Closed-loop medical-grade air filtration regulating atmospheric air density and pure oxygen content.', iconName: 'Wind' },
      { name: 'Biometric Access', desc: 'Faceless recognition threshold security to guarantee seamless ingress without visual keypads.', iconName: 'ShieldCheck' }
    ]
  },
  {
    id: 'penthouse',
    menuLabel: 'CROWN PENTHOUSE',
    heroImage: '/assets/images/elyse_penthouse_1779429579656.png',
    title1: 'SKYLINE SANCTUARY',
    title2: 'ABOVE THE METROPOLIS',
    description: 'Elevate your horizons. The Crown Penthouse commands majestic 360-degree panoramic sights of the city skyline, complete with a private glass-rim infinity pool, lush terraces, and soaring vaulted gallery spaces designed for timeless curations.',
    location: 'LEVEL 18 (CROWN DECK)',
    orientation: '360° FULL HORIZON',
    ceilingHeight: '7.2 METERS',
    specifications: [
      { label: 'RESIDENCE AREA', value: '12,200 SQ FT' },
      { label: 'BEDROOM SUITES', value: '5 CHAMBERS' },
      { label: 'OUTDOOR SPACE', value: '360° SKY DECK' },
      { label: 'EXCLUSIVE ACCESS', value: 'PRIVATE INFINITY POOL' },
    ],
    materials: [
      {
        name: 'Oiled Charcoal Ash',
        category: 'Cabinetry & Columns',
        description: 'Flamed ashwood stained deeply with natural iron oxides to produce a luxurious, graphic charcoal finish.',
        colorHex: '#252525'
      },
      {
        name: 'Nero Marquina Marble',
        category: 'Cladding & Basins',
        description: 'Spanish black crystalline marble with dramatic lightning-white quartz veins, polished with fine diamond grain.',
        colorHex: '#121213'
      },
      {
        name: 'Brushed Titanium Steel',
        category: 'Structures',
        description: 'Industrial-grade aerospace titanium cladding representing extreme strength with a dark, velvet-matte sheen.',
        colorHex: '#606266'
      },
      {
        name: 'Pure Onyx Accents',
        category: 'Lighting Fixtures',
        description: 'Translucent back-lit onyx stones emitting a rich golden-amber organic glow on central corridors.',
        colorHex: '#E29B52'
      }
    ],
    amenities: [
      { name: 'Private Plunge Pool', desc: 'A spectacular cantilevered glass-edge heated infinity pool floating above the tree canopy.', iconName: 'Droplets' },
      { name: 'Sky Observatory', desc: 'A dedicated stargazing mezzanine equipped with high-aperture custom glass telescoping gear.', iconName: 'Compass' },
      { name: 'Private Lift Hub', desc: 'A secure high-speed single-access elevator terminating inside the private gallery foyer.', iconName: 'Layers' },
      { name: 'Thermal Bath & Spa', desc: 'An integrated wet-spa section with cold-plunge tub, steam rooms, and warm volcanic rock benches.', iconName: 'Award' }
    ]
  },
  {
    id: 'aurelia',
    menuLabel: 'AURELIA SUITES',
    heroImage: '/assets/images/elyse_suites_1779429601103.png',
    title1: 'QUIET GRANDEUR',
    title2: 'INTIMATE RETREAT COMFORT',
    description: 'A masterpiece of master-crafted materials, the Aurelia Suites are beautifully detailed with imported Arabescato marble, custom raw silk structural partitions, and majestic volcanic fireplaces, flowing seamlessly out to private landscaped Japanese gardens.',
    location: 'LEVELS 01 – 03',
    orientation: 'SOUTH-WEST SUNSET',
    ceilingHeight: '4.8 METERS',
    specifications: [
      { label: 'RESIDENCE AREA', value: '5,100 SQ FT' },
      { label: 'BEDROOM SUITES', value: '3 CHAMBERS' },
      { label: 'OUTDOOR SPACE', value: 'JAPANESE ZEN GARDEN' },
      { label: 'EXCLUSIVE ACCESS', value: '24/7 STEWARD COURIER' },
    ],
    materials: [
      {
        name: 'Arabescato Vagli Marble',
        category: 'Hearths & Countertops',
        description: 'Premium Italian marble with swirling dark gray and sage green breccia-like patterns over snowy backgrounds.',
        colorHex: '#EAEBEB'
      },
      {
        name: 'Hand-woven Raw Silk',
        category: 'Sliding Panels',
        description: 'Screens created from untreated organic silk fibers that soften and warm incoming sunlight beautifully.',
        colorHex: '#ECE3D5'
      },
      {
        name: 'Honed Basalt Slabs',
        category: 'Spa floors',
        description: 'Smooth volcanic stones that conduct underfloor radiant heating and emit a restorative mineral scent when wet.',
        colorHex: '#42454A'
      },
      {
        name: 'Oxidized Bronze Trim',
        category: 'Fixtures',
        description: 'Solid brass hand-treated to accelerate beautiful green-blue chemical patination for archival character.',
        colorHex: '#8C775D'
      }
    ],
    amenities: [
      { name: 'Japanese Gardens', desc: 'Fully landscaped private moss gardens featuring bespoke dry stone riverbeds and imported maples.', iconName: 'Home' },
      { name: 'Volcanic Fireplaces', desc: 'Suspended bio-ethanol steel-hood open fireplaces radiating safe, elegant warmth.', iconName: 'Sparkles' },
      { name: '24/7 Dedicated Butler', desc: 'A professional estate steward assigned exclusively to manage all your suite requirements.', iconName: 'Award' },
      { name: 'Private Wine Vault', desc: 'A climate and humidity stabilized solid-oak cabinet containing capacity for 144 bottles.', iconName: 'Layers' }
    ]
  }
];
