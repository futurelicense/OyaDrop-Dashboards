import React from 'react';
import { ProductCard, Product } from './ProductCard';
interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}
export function ProductGrid({
  products,
  onAddToCart
}: ProductGridProps) {
  return <div className="px-5 pb-6">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product, index) => <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} index={index} />)}
      </div>
    </div>;
}