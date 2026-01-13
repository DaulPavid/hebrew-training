<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import ExerciseView from '@/views/ExerciseView.vue'
</script>

<template>
  <AppLayout>
    <ExerciseView />
  </AppLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Noto Sans Hebrew', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}
</style>
