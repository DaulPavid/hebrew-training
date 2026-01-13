<script setup lang="ts">
import { ref, watch } from 'vue'
import { useExerciseStore } from '@/stores/exerciseStore'
import AppLayout from '@/components/layout/AppLayout.vue'
import ExerciseView from '@/views/ExerciseView.vue'
import VocabDrillView from '@/views/VocabDrillView.vue'

const exerciseStore = useExerciseStore()

// Current mode
type AppMode = 'typing' | 'vocab'
const currentMode = ref<AppMode>('typing')

// Handle mode change from sidebar
function handleModeChange(mode: AppMode) {
  currentMode.value = mode
}

// Switch to typing mode when an exercise is selected
watch(
  () => exerciseStore.currentExercise,
  (exercise) => {
    if (exercise) {
      currentMode.value = 'typing'
    }
  }
)
</script>

<template>
  <AppLayout @mode-change="handleModeChange">
    <ExerciseView v-if="currentMode === 'typing'" />
    <VocabDrillView v-else-if="currentMode === 'vocab'" />
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
