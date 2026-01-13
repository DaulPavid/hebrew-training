<script setup lang="ts">
import { computed } from 'vue'
import { useExerciseStore, type Exercise } from '@/stores/exerciseStore'
import { useProgressStore } from '@/stores/progressStore'
import { ExerciseType } from '@/data/letterSets'

const props = defineProps<{
  exercise: Exercise
}>()

const exerciseStore = useExerciseStore()
const progressStore = useProgressStore()

// Get WPM record for this exercise
const wpmRecord = computed(() => progressStore.getWPM(props.exercise.id))

// Check if this exercise is currently selected
const isSelected = computed(() => exerciseStore.currentExercise?.id === props.exercise.id)

// Is this a letter exercise?
const isLetterExercise = computed(
  () => props.exercise.type === ExerciseType.REVIEW || props.exercise.type === ExerciseType.PRACTICE
)

// Type label for letter exercises
const typeLabel = computed(() =>
  props.exercise.type === ExerciseType.PRACTICE ? 'תרגול' : 'שיעור'
)

// Select this exercise
function handleClick() {
  exerciseStore.selectExercise(props.exercise.id)
}
</script>

<template>
  <button
    class="exercise-menu-item"
    :class="{ 'exercise-menu-item--selected': isSelected }"
    @click="handleClick"
  >
    <div v-if="wpmRecord" class="exercise-menu-item__wpm">{{ wpmRecord }} WPM</div>

    <template v-if="isLetterExercise">
      <div class="exercise-menu-item__type">{{ typeLabel }}</div>
      <div class="exercise-menu-item__keycaps">
        <span
          v-for="letter in exercise.newLetters"
          :key="letter"
          class="exercise-menu-item__keycap"
        >
          {{ letter }}
        </span>
      </div>
    </template>

    <div v-if="exercise.type === ExerciseType.TEXT" class="exercise-menu-item__text-label">
      {{ exercise.label }}
    </div>

    <div class="exercise-menu-item__number">{{ exercise.index + 1 }}</div>
  </button>
</template>

<style scoped lang="scss">
.exercise-menu-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: repeat(2, auto);
  column-gap: 12px;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  align-items: center;
  justify-content: end;
  text-align: right;
  width: 100%;
  font-family: 'Noto Sans Hebrew', sans-serif;

  &:hover:not(&--selected) {
    background: #f3dece;
  }

  &:active {
    background: rgba(235, 200, 173, 1);
  }

  &--selected {
    background: #efd3bd;
  }

  &__wpm {
    font-family: monospace;
    font-size: 0.9em;
    color: #716054;
    grid-row: 1 / 3;
    grid-column: 3;
    align-self: center;
  }

  &__type {
    margin-bottom: 4px;
    justify-self: end;
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 2px 8px;
    background: #dec8b7;
    font-size: 0.7em;
    color: white;
    width: fit-content;
    grid-column: 2;
    grid-row: 1;
  }

  &__keycaps {
    grid-row: 2;
    grid-column: 2;
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    justify-self: end;
  }

  &__keycap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1.1em;
    box-shadow: 0 2px 0 #bbb;
  }

  &__text-label {
    font-size: 15px;
    grid-row: 1 / 3;
    grid-column: 2;
    text-align: right;
    color: #410b13;
    align-self: center;
  }

  &__number {
    background: #94dade;
    font-size: 0.75em;
    color: rgba(46, 143, 148, 1);
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    grid-row: 1 / 3; // Span both rows
    grid-column: 1;
    height: 24px;
    min-width: 24px;
    align-self: center;
  }
}
</style>
