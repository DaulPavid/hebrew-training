<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise } from '@/stores/exerciseStore'
import ExerciseMenuItem from './ExerciseMenuItem.vue'

defineProps<{
  title: string
  emoji: string
  exercises: Exercise[]
}>()

const isExpanded = ref(true)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="exercise-list">
    <button class="exercise-list__header" @click="toggleExpanded">
      <svg
        class="exercise-list__icon"
        :class="{ 'exercise-list__icon--collapsed': !isExpanded }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <h3>{{ title }}</h3>
      <span>{{ emoji }}</span>
    </button>

    <div v-if="isExpanded" class="exercise-list__exercises">
      <ExerciseMenuItem
        v-for="exercise in exercises"
        :key="exercise.id"
        :exercise="exercise"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.exercise-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;

  &__header {
    display: flex;
    flex-direction: row-reverse;
    gap: 12px;
    font-family: 'Noto Sans Hebrew', sans-serif;
    font-weight: bold;
    padding: 8px 10px;
    border-radius: 4px;
    align-items: center;
    background: transparent;
    cursor: pointer;
    border: none;
    font-size: 1em;

    &:hover {
      background: #f3dece;
    }

    &:active {
      background: #efd3bd;
    }

    h3 {
      margin: 0;
      font-size: 1em;
    }
  }

  &__icon {
    transition: transform 0.2s ease-out;

    &--collapsed {
      transform: rotate(-90deg);
    }
  }

  &__exercises {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    padding-right: 28px;
    margin-right: 14px;
    max-height: 40vh;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(255, 209, 173, 0.66);
    }
  }
}
</style>
