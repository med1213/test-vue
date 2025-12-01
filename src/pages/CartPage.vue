<template>
  <div class="cart-page">
    <h2>Your Cart</h2>

    <div v-if="cartItems.length === 0" class="empty">Your cart is empty.</div>

    <div v-else class="cart-list">
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" alt="product" />

        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.price }} LAK</p>

          <div class="qty">
            <button @click="decrease(item.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increase(item.id)">+</button>
          </div>
        </div>

        <button class="remove" @click="remove(item.id)">Remove</button>
      </div>

      <div class="summary">
        <h3>Total: {{ total }} LAK</h3>
        <button class="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const { cartItems, total } = storeToRefs(cartStore);
const {
  increaseQty: increase,
  decreaseQty: decrease,
  removeItem: remove,
} = cartStore;
</script>

<style scoped lang="scss">
.cart-page {
  padding: 2rem;

  .empty {
    text-align: center;
    font-size: 1.2rem;
    opacity: 0.7;
  }

  .cart-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #fff;
    color: #000;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      object-fit: cover;
    }

    .info {
      flex: 1;
      margin-left: 1rem;

      .qty {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        button {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
