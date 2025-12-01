import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useUiStore = defineStore("ui", () => {
  const dark = ref<boolean>(localStorage.getItem("dark") === "true");

  watch(
    dark,
    (v) => {
      document.documentElement.dataset.theme = v ? "dark" : "light";
      localStorage.setItem("dark", String(v));
    },
    { immediate: true }
  );

  function toggle() {
    dark.value = !dark.value;
  }

  return { dark, toggle };
});
