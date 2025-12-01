<template>
<button class="dark-toggle" @click="toggle" :aria-pressed="ui.dark">
{{ ui.dark ? '🌙 Dark' : '☀️ Light' }}
</button>
</template>


<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
const ui = useUiStore()
function toggle() { ui.toggle() }
</script>


<style scoped lang="scss">
.dark-toggle { padding:0.4rem 0.8rem; border-radius:8px; border:1px solid rgba(0,0,0,0.06) }
</style>