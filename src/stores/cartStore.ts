import { defineStore } from "pinia";
import type { IProduct } from "@/types/product";

interface CartItem extends IProduct {
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as CartItem[],
  }),

  getters: {
    total: (state) =>
      state.cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0),

    itemCount: (state) =>
      state.cartItems.reduce((count, p) => count + p.quantity, 0),
  },

  actions: {
    addToCart(product: IProduct) {
      const exist = this.cartItems.find((p) => p.id === product.id);
      if (exist) exist.quantity++;
      else this.cartItems.push({ ...product, quantity: 1 });
    },

    increaseQty(id: number) {
      const item = this.cartItems.find((p) => p.id === id);
      if (item) item.quantity++;
    },

    decreaseQty(id: number) {
      const item = this.cartItems.find((p) => p.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },

    removeItem(id: number) {
      this.cartItems = this.cartItems.filter((p) => p.id !== id);
    },
  },
});
