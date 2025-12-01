<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss">
:root {
  --bg: #f6f7fb;
  --text: #111;
  --card-bg: #fff;
  --card-shadow: 0 8px 18px rgba(12, 12, 12, 0.06);
  --accent: #00c6a9;
}

:root[data-theme="dark"] {
  --bg: #0f1724;
  --text: #e6eef8;
  --card-bg: #0b1220;
  --card-shadow: 0 6px 14px rgba(0, 0, 0, 0.6);
  --accent: #2dd4bf;
}

#app {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}
</style>
