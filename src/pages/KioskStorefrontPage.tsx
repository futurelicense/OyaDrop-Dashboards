import React, { useState } from 'react';
import { KioskStorefrontHeader } from '../components/kiosk/KioskStorefrontHeader';
import { CategoryNavigationBar } from '../components/kiosk/CategoryNavigationBar';
import { KioskProductGrid } from '../components/kiosk/KioskProductGrid';
const mockVendor = {
  name: 'TechHub Nigeria',
  bio: 'Your one-stop shop for premium electronics and gadgets',
  logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=400&fit=crop',
  rating: 4.8,
  reviews: 1234,
  followers: 15600,
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#'
  }
};
export function KioskStorefrontPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      <KioskStorefrontHeader vendor={mockVendor} />
      <CategoryNavigationBar onFilterClick={() => setFilterOpen(true)} />
      <KioskProductGrid />
    </div>;
}