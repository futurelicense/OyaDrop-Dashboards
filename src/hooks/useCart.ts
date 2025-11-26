import { useState, useCallback } from 'react';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  storeName: string;
}
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? {
          ...i,
          quantity: i.quantity + 1
        } : i);
      }
      return [...prev, {
        ...item,
        quantity: 1
      }];
    });
  }, []);
  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => item.id === id ? {
      ...item,
      quantity
    } : item));
  }, [removeItem]);
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    items,
    itemCount,
    total,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
}