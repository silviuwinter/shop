// shopping cart state -> zustand

import { create } from 'zustand';

interface CartState {
  items: { id: string; quantity: number }[]; // list of items in the cart
  addItem: (item: { id: string; quantity: number }) => void; // adds an item to the cart
  removeItem: (id: string) => void; // removes an item by its id
  clearCart: () => void; // clears all items from the cart
}

export const useCartStore = create<CartState>((set) => ({
  items: [], // starts with an empty cart
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item], // adds the new item to the existing list
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id), // keeps only items that don't match the id
    })),
  clearCart: () => set({ items: [] }), // resets the cart to empty
}));