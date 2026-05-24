export interface SpecItem {
  label: string;
  value: string;
}

export interface MaterialItem {
  name: string;
  category: string;
  description: string;
  colorHex: string;
}

export interface Suite {
  id: 'lumiere' | 'penthouse' | 'aurelia';
  menuLabel: string;
  heroImage: string;
  title1: string;
  title2: string;
  description: string;
  specifications: SpecItem[];
  location: string;
  orientation: string;
  ceilingHeight: string;
  materials: MaterialItem[];
  amenities: { name: string; desc: string; iconName: string }[];
}

export interface BookingSubmission {
  fullName: string;
  email: string;
  suiteId: 'lumiere' | 'penthouse' | 'aurelia';
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}