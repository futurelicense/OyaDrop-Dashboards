import React from 'react';
import { MarketplaceHeader } from '../components/marketplace/MarketplaceHeader';
import { LiveActivityTicker } from '../components/marketplace/LiveActivityTicker';
import { HeroBannerCarousel } from '../components/marketplace/HeroBannerCarousel';
import { CategoryNav } from '../components/marketplace/CategoryNav';
import { VerifiedKiosks } from '../components/marketplace/VerifiedKiosks';
import { PersonalizedSection } from '../components/marketplace/PersonalizedSection';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { CartDrawer } from '../components/marketplace/CartDrawer';
import { FloatingActions } from '../components/marketplace/FloatingActions';
import { useCart } from '../hooks/useCart';
import { Product } from '../components/marketplace/ProductCard';
import { Store } from '../components/marketplace/StoreCard';
interface MarketplacePageProps {
  onMenuClick: () => void;
}
// Mock data
const mockStores: Store[] = [{
  id: '1',
  name: "Julie's Vintage",
  logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
  rating: 4.8,
  reviews: 234,
  products: 156,
  verified: true,
  category: 'Fashion'
}, {
  id: '2',
  name: 'Bake Empire',
  logo: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=200&h=200&fit=crop',
  rating: 4.9,
  reviews: 567,
  products: 89,
  verified: true,
  category: 'Food'
}, {
  id: '3',
  name: 'Gadgetgram',
  logo: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&h=200&fit=crop',
  rating: 4.7,
  reviews: 892,
  products: 234,
  verified: true,
  category: 'Electronics'
}, {
  id: '4',
  name: 'Otswigro Store',
  logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
  rating: 4.6,
  reviews: 445,
  products: 178,
  verified: true,
  category: 'General'
}];
const recommendedProducts: Product[] = [{
  id: 'r1',
  name: 'Premium Noise Cancelling Headphones',
  price: 18900,
  originalPrice: 25000,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  rating: 4.9,
  reviews: 456,
  storeName: 'Gadgetgram',
  stock: 3,
  fastDelivery: true,
  trending: true
}, {
  id: 'r2',
  name: 'Smart Fitness Watch Pro',
  price: 32500,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  rating: 4.8,
  reviews: 789,
  storeName: 'Gadgetgram',
  fastDelivery: true
}];
const nearbyProducts: Product[] = [{
  id: 'n1',
  name: 'Artisan Coffee Beans 500g',
  price: 4500,
  image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
  rating: 4.9,
  reviews: 234,
  storeName: 'Bake Empire',
  fastDelivery: true
}, {
  id: 'n2',
  name: 'Fresh Baked Croissants (6pc)',
  price: 2800,
  image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
  rating: 4.8,
  reviews: 156,
  storeName: 'Bake Empire',
  stock: 5,
  fastDelivery: true
}];
const trendingProducts: Product[] = [{
  id: 't1',
  name: 'Wireless Gaming Mouse RGB',
  price: 9800,
  originalPrice: 14500,
  image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
  rating: 4.8,
  reviews: 523,
  storeName: 'Gadgetgram',
  trending: true
}, {
  id: 't2',
  name: 'Designer Sunglasses UV400',
  price: 6700,
  image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  rating: 4.7,
  reviews: 289,
  storeName: "Julie's Vintage",
  trending: true
}, {
  id: 't3',
  name: 'Portable Bluetooth Speaker',
  price: 8900,
  originalPrice: 12000,
  image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
  rating: 4.6,
  reviews: 412,
  storeName: 'Gadgetgram',
  stock: 4,
  trending: true
}, {
  id: 't4',
  name: 'Leather Wallet Premium',
  price: 5400,
  image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
  rating: 4.7,
  reviews: 234,
  storeName: "Julie's Vintage",
  trending: true
}];
export function MarketplacePage({
  onMenuClick
}: MarketplacePageProps) {
  const cart = useCart();
  const handleAddToCart = (product: Product) => {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      storeName: product.storeName
    });
  };
  return <div className="min-h-screen bg-[#0a0a0f]">
      <MarketplaceHeader onMenuClick={onMenuClick} onCartClick={() => cart.setIsOpen(true)} cartItemCount={cart.itemCount} />

      <LiveActivityTicker />

      <main className="max-w-md mx-auto">
        {/* Hero Banner */}
        <div className="px-5 mt-6 mb-4">
          <HeroBannerCarousel />
        </div>

        <CategoryNav />
        <VerifiedKiosks stores={mockStores} />

        {/* Recommended for You */}
        <PersonalizedSection title="Recommended for You" subtitle="Based on your preferences" icon="ai">
          <ProductGrid products={recommendedProducts} onAddToCart={handleAddToCart} />
        </PersonalizedSection>

        {/* Nearby Stores */}
        <PersonalizedSection title="Nearby Stores" subtitle="Within 2km from you" icon="location">
          <ProductGrid products={nearbyProducts} onAddToCart={handleAddToCart} />
        </PersonalizedSection>

        {/* Trending Now */}
        <PersonalizedSection title="Trending Now" subtitle="Popular in your area" icon="time">
          <ProductGrid products={trendingProducts} onAddToCart={handleAddToCart} />
        </PersonalizedSection>
      </main>

      <CartDrawer isOpen={cart.isOpen} onClose={() => cart.setIsOpen(false)} items={cart.items} total={cart.total} onUpdateQuantity={cart.updateQuantity} onRemoveItem={cart.removeItem} />

      <FloatingActions />
    </div>;
}