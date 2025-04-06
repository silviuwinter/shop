import { create } from "zustand";
import { CartItemDto } from "./dto/cartItem.dtos";

interface CartState {
    items: CartItemDto[]; // list of items in the cart
    addItem: (item: CartItemDto) => void; // adds an item to the cart
    removeItem: (id: number) => void; // removes an item by id
    clearCart: () => void; // clears all items in the cart
    updateItem: (id: number, updatedProperties: Partial<CartItemDto>) => void; // updates item properties
    modifyQuantity: (id: number, quantity: number) => void; // changes the quantity of an item
}

const useCartStore = create<CartState>((set) => ({
    items: [], // starts with an empty cart
    addItem: (item) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id); // check if item already in cart
            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + item.quantity } // increase quantity if item exists
                            : i
                    ),
                };
            }
            return { items: [...state.items, item] }; // add new item if not in cart
        }),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id), // remove item by id
        })),
    clearCart: () => set({ items: [] }), // empties the cart
    updateItem: (id, updatedProperties) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, ...updatedProperties } : item // update specific item properties
            ),
        })),
    modifyQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item // set new quantity for item
            ),
        })),
}));

export default useCartStore;