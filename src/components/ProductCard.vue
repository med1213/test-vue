<template>
  <div class="product-card">
    <router-link :to="`/product/${product.id}`">
      <div class="img-wrap">
        <img :src="product.image" :alt="product.name" />
      </div>
      <h3 class="name">{{ product.name }}</h3>
    </router-link>

    <p class="price">{{ formatPrice(product.price) }} LAK</p>

    <div class="actions">
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/product";

const props = defineProps<{ product: Product }>();
const cart = useCartStore();

function formatPrice(val: number) {
  return val.toLocaleString();
}

function addToCart() {
  cart.addToCart(props.product);
}
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: var(--card-shadow);
  transition: transform 0.18s ease;

  &:hover {
    transform: translateY(-6px);
  }

  .img-wrap {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .name {
    font-size: 1rem;
    margin: 0;
  }
  .price {
    font-weight: 700;
    color: var(--accent);
  }

  .actions {
    margin-top: auto;
    button {
      width: 100%;
      padding: 0.6rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
