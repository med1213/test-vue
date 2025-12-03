import { defineStore } from "pinia";
import { ref } from "vue";
import type { IProduct } from "@/types/product";
import { fetchProducts, fetchProductById } from "@/services/api";

export const useProductStore = defineStore("product", () => {
  const items = ref<IProduct[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      items.value = await fetchProducts();
    } catch (e: any) {
      error.value = e.message || "Failed to load products";
    } finally {
      loading.value = false;
    }
  }

  async function findById(id: number) {
    return await fetchProductById(id);
  }

  return { items, loading, error, load, findById };
});
