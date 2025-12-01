<template>
<div class="product-detail">
<button @click="$router.back()">← Back</button>


<div v-if="loading">Loading...</div>
<div v-else-if="product">
<div class="content">
<img :src="product.image" alt="" />
<div class="meta">
<h2>{{ product.name }}</h2>
<p class="price">{{ product.price.toLocaleString() }} LAK</p>
<p class="desc">{{ product.description }}</p>


<div class="actions">
<button @click="addToCart">Add to cart</button>
</div>
</div>
</div>
</div>
</div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'


const route = useRoute()
const id = Number(route.params.id)
const productStore = useProductStore()
const cart = useCartStore()
const product = ref(null)
const loading = ref(false)


onMounted(async () => {
loading.value = true
product.value = await productStore.findById(id)
loading.value = false
})


function addToCart() { if (product.value) cart.add(product.value, 1) }
</script>


<style lang="scss">
.product-detail .content { display:flex; gap:1.2rem; align-items:flex-start }
.product-detail img { width:320px; border-radius:8px }
.meta { flex:1 }
.price { font-weight:800 }
</style>