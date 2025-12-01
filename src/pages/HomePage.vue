<template>
  <div class="page home">
    <header class="topbar">
      <h1>Products</h1>
      <div class="controls">
        <DarkToggle />
        <div class="cart-info" @click="goCart">
          🛒 {{ cart.cartItems.length }}
        </div>
      </div>
    </header>

    <main>
      <div v-if="productStore.loading">Loading...</div>
      <div v-else-if="productStore.error">{{ productStore.error }}</div>
      <ProductList v-else :products="productStore.items" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ProductList from "@/components/ProductList.vue";
import DarkToggle from "@/components/DarkToggle.vue";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const cart = useCartStore();
const router = useRouter();

onMounted(() => {
  productStore.load();
});

function goCart() {
  router.push({ path: "/cart" }).catch(() => {});
}
</script>

<style lang="scss">
.page {
  padding: 1.2rem;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.controls {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}
.cart-info {
  cursor: pointer;
}
</style>
