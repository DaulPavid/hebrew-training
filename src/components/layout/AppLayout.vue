<script setup lang="ts">
import Sidebar from './Sidebar.vue'

defineProps<{
  /** Whether to show the sidebar */
  showSidebar?: boolean
}>()
</script>

<template>
  <div class="app-layout">
    <Sidebar v-if="showSidebar !== false" class="app-layout__sidebar" />
    <main class="app-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;

  &__sidebar {
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    overflow-y: auto;
  }
}
</style>
