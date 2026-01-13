<script setup lang="ts">
import { useExerciseStore } from '@/stores/exerciseStore'
import { useProgressStore } from '@/stores/progressStore'
import ExerciseList from '@/components/exercises/ExerciseList.vue'

const exerciseStore = useExerciseStore()
const progressStore = useProgressStore()
</script>

<template>
  <aside class="sidebar">
    <h1>הקלדה עיוורת</h1>

    <div class="sidebar__stats" v-if="progressStore.completedCount > 0">
      <div class="sidebar__stat">
        <span class="sidebar__stat-value">{{ progressStore.streak }}</span>
        <span class="sidebar__stat-label">רצף</span>
      </div>
      <div class="sidebar__stat">
        <span class="sidebar__stat-value">{{ progressStore.bestWPM }}</span>
        <span class="sidebar__stat-label">WPM מקסימום</span>
      </div>
    </div>

    <ExerciseList
      class="sidebar__list"
      title="שיעורי אותיות"
      emoji="⌨️"
      :exercises="exerciseStore.letterExercises"
    />

    <ExerciseList
      title="טקסטים"
      emoji="📖"
      :exercises="exerciseStore.textExercises"
    />
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  min-width: 360px;
  max-width: 20vw;
  height: 100vh;
  padding: 40px 36px;
  background: #ffe8d6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-y: auto;
  direction: rtl;

  h1 {
    font-size: 36px;
    font-family: 'Noto Sans Hebrew', sans-serif;
    font-weight: bold;
    margin: 0 0 24px 0;
  }

  &__stats {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    width: 100%;
    justify-content: flex-end;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    padding: 8px 16px;
    border-radius: 8px;
  }

  &__stat-value {
    font-size: 1.5em;
    font-weight: bold;
    color: #2e8f94;
  }

  &__stat-label {
    font-size: 0.8em;
    color: #666;
  }

  &__list {
    margin-bottom: 16px;
  }
}
</style>
