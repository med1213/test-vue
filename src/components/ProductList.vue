<template>
<div class="product-list">
<transition-group name="list" tag="div" class="grid">
<ProductCard v-for="p in products" :key="p.id" :product="p" />
</transition-group>
</div>
</template>


<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/types/product'


const props = defineProps<{ products: Product[] }>()
</script>


<style scoped lang="scss">
.grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap:1.2rem }
.list-enter-active, .list-leave-active { transition: all .3s ease }
.list-enter-from { opacity:0; transform: translateY(8px) }
.list-enter-to { opacity:1; transform: translateY(0) }
.list-leave-to { opacity:0; transform: translateY(8px) }
</style>