import { create } from "zustand";
import { CartItemDto } from "../cart/dto/cartItem.dtos";

interface CartState {
    items: CartItemDto[];
    addItem: (item: CartItemDto) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateItem: (id: number, updatedProperties: Partial<CartItemDto>) => void;
    modifyQuantity: (id: number, quantity: number) => void;
}

const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    ),
                };
            }
            return { items: [...state.items, item] };
        }),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
    clearCart: () => set({ items: [] }),
    updateItem: (id, updatedProperties) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, ...updatedProperties } : item
            ),
        })),
    modifyQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        })),
}));

export default useCartStore;